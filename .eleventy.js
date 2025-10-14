const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
  // --- Plugins ---
  eleventyConfig.addPlugin(pluginSitemap, {
    sitemap: { hostname: "https://jrwageningen.nl" },
  });

  // --- Passthrough ---
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // --- Filters ---
  // Houd alleen items met datum >= vandaag, sorteer oplopend
  eleventyConfig.addFilter("onlyFutureDates", function(items, field = "date") {
    if (!Array.isArray(items)) return [];
    const today = new Date();
    // strip tijd van "vandaag"
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

  // (optioneel) NL opmaak: 14 juni 2025
  eleventyConfig.addFilter("formatDateNL", function(value, opts = {}) {
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric", ...opts });
  });

  // --- Custom Collection voor Leden ---
  eleventyConfig.addCollection("ledenGesorteerd", (c) =>
    c.getFilteredByTag("leden").sort((a,b) => (a.data.volgorde || 999) - (b.data.volgorde || 999))
  );

  // --- Config ---
  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: { input: "src", output: "_site", includes: "_includes" }
  };
};
