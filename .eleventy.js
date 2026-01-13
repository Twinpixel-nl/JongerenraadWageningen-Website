// .eleventy.js
module.exports = function(eleventyConfig) {
  // ============
  // Passthroughs
  // ============
  eleventyConfig.addPassthroughCopy("src/assets");   // /assets/ -> /assets/
  eleventyConfig.addPassthroughCopy("admin");        // /admin/  -> /admin/
  eleventyConfig.addPassthroughCopy("robots.txt");   // /robots.txt

  // Belangrijk: kopieer rooster.json uit /src naar de root van de output
  eleventyConfig.addPassthroughCopy({ "src/rooster.json": "rooster.json" });
  // Watch, zodat wijzigingen in rooster.json direct rebuilden
  eleventyConfig.addWatchTarget("src/rooster.json");
eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  // =================
  // Date util/helpers
  // =================
  function parseDate(value) {
    if (!value) return null;
    const s = String(value).trim();

    // ISO yyyy-mm-dd(THH:mm)
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return new Date(s.length === 10 ? s + "T00:00:00" : s);

    // NL dd-mm-jjjj
    const m = s.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (m) return new Date(`${m[3]}-${m[2]}-${m[1]}T00:00:00`);

    // Laatste redmiddel
    const d = new Date(s);
    return isNaN(d) ? null : d;
  }

  // =============
  // Datumfilters
  // =============
  // ISO-datum (voor sitemap <lastmod>), geeft "" als ongeldige datum
  eleventyConfig.addFilter("dateISO", (value) => {
    const d = parseDate(value);
    return d ? d.toISOString().slice(0, 10) : "";
  });

  // NL-weergave (bijv. "30 juni 2025")
  eleventyConfig.addFilter("formatDateNL", (value, opts = {}) => {
    const d = parseDate(value);
    if (!d) return value;
    return d.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...opts,
    });
  });

  // Alleen toekomstige items (>= vandaag), sorteren oplopend
  // 'field' is de property met de datum; default 'datum' (NL data)
  eleventyConfig.addFilter("onlyFutureDates", function(items, field = "datum") {
    if (!Array.isArray(items)) return [];
    const today = new Date(); today.setHours(0, 0, 0, 0);

    const getDateFromItem = (it) => {
      // Ondersteunt data in it.data[field], it[field] of it.date
      const raw =
        (it && it.data && it.data[field]) ??
        (it && it[field]) ??
        (it && it.date);
      return parseDate(raw);
    };

    return items
      .map(it => ({ it, d: getDateFromItem(it) }))
      .filter(x => x.d && x.d >= today)
      .sort((a, b) => a.d - b.d)
      .map(x => x.it);
  });

  // ==========
  // Collecties
  // ==========
  eleventyConfig.addCollection("ledenGesorteerd", (c) =>
    c.getFilteredByTag("leden").sort(
      (a, b) => (a.data.volgorde || 999) - (b.data.volgorde || 999)
    )
  );

  // ======
  // Config
  // ======
  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
