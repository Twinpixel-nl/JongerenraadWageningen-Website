const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

module.exports = function(eleventyConfig) {
  // --- Passthrough ---
  eleventyConfig.addPassthroughCopy("src/assets"); // afbeeldingen, css, etc.
  eleventyConfig.addPassthroughCopy("admin");      // Netlify CMS admin-dashboard
  eleventyConfig.addPassthroughCopy("robots.txt"); // robots.txt in root

  // --- Filters ---
  // Houd alleen items met datum >= vandaag, sorteer oplopend
  eleventyConfig.addFilter("onlyFutureDates", function(items, field = "date") {
    if (!Array.isArray(items)) return [];
    const today = new Date();
    today.setHours(0,0,0,0);

    const toDate = (it) => {
      const v = (it?.data?.[field]) ?? it?.[field] ?? it?.date;
      const d = new Date(v);
      return isNaN(d) ? null : d;
    };

    return items
      .map(it => ({ it, d: toDate(it) }))
      .filter(x => x.d && x.d >= today)
      .sort((a,b) => a.d - b.d)
      .map(x => x.it);
  });

  // Formatteer datum NL
  eleventyConfig.addFilter("formatDateNL", function(value, opts = {}) {
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric", ...opts });
  });

  // --- Custom Collection voor Leden ---
  eleventyConfig.addCollection("ledenGesorteerd", (c) =>
    c.getFilteredByTag("leden").sort((a,b) => (a.data.volgorde || 999) - (b.data.volgorde || 999))
  );

  // --- Sitemap genereren na build ---
  eleventyConfig.on("afterBuild", async () => {
    const sitemap = new SitemapStream({ hostname: "https://jrwageningen.nl" });
    const writeStream = createWriteStream("_site/sitemap.xml");

    const allUrls = eleventyConfig.javascriptFunctions.collections.all || [];
    for (const page of allUrls) {
      if (!page.url || page.url.includes("404")) continue;
      sitemap.write({ url: page.url, changefreq: "monthly", priority: page.url === "/" ? 1.0 : 0.7 });
    }
    sitemap.end();
    const xml = await streamToPromise(sitemap);
    writeStream.write(xml.toString());
    writeStream.end();
    console.log("✅ Sitemap generated at _site/sitemap.xml");
  });

  // --- Config ---
  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
