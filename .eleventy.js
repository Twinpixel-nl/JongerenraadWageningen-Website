module.exports = function(eleventyConfig) {
  // Passthrough
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("robots.txt"); // staat in projectroot

  // Filters
  eleventyConfig.addFilter("onlyFutureDates", function(items, field = "date") {
    if (!Array.isArray(items)) return [];
    const today = new Date(); today.setHours(0,0,0,0);
    const toDate = it => {
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

  eleventyConfig.addFilter("formatDateNL", function(value, opts = {}) {
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric", ...opts });
  });

  // Collections
  eleventyConfig.addCollection("ledenGesorteerd", (c) =>
    c.getFilteredByTag("leden").sort((a,b) => (a.data.volgorde || 999) - (b.data.volgorde || 999))
  );

  // Config
  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: { input: "src", output: "_site", includes: "_includes" }
  };
};
