const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
  // ============
  // Plugins
  // ============
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://jrwageningen.nl",
    },
  });

  // ============
  // Passthroughs
  // ============
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy({ "src/rooster.json": "rooster.json" });
  
  eleventyConfig.addWatchTarget("src/rooster.json");

  // ============
  // Shortcodes
  // ============
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // =================
  // Date util/helpers
  // =================
  function parseDate(value) {
    if (!value) return null;
    const s = String(value).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return new Date(s.length === 10 ? s + "T00:00:00" : s);
    const m = s.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (m) return new Date(`${m[3]}-${m[2]}-${m[1]}T00:00:00`);
    const d = new Date(s);
    return isNaN(d) ? null : d;
  }

  // =============
  // Datumfilters
  // =============
  eleventyConfig.addFilter("dateISO", (value) => {
    const d = parseDate(value);
    return d ? d.toISOString().slice(0, 10) : "";
  });

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

  eleventyConfig.addFilter("onlyFutureDates", function(items, field = "datum") {
    if (!Array.isArray(items)) return [];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const getDateFromItem = (it) => {
      const raw = (it && it.data && it.data[field]) ?? (it && it[field]) ?? (it && it.date);
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