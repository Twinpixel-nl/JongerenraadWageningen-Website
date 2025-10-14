const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
  // --- Plugins ---
  eleventyConfig.addPlugin(pluginSitemap, {
    sitemap: {
      hostname: "https://jrwageningen.nl", // basis-URL van je site
    },
  });

  // --- Bestanden die direct meegaan naar de uiteindelijke site ---
  eleventyConfig.addPassthroughCopy("src/assets"); // afbeeldingen, css, etc.
  eleventyConfig.addPassthroughCopy("admin");      // Netlify CMS admin-dashboard
  eleventyConfig.addPassthroughCopy("robots.txt"); // robots.txt staat in de root

  // --- Custom Collection voor Leden ---
  eleventyConfig.addCollection("ledenGesorteerd", function(collectionApi) {
    return collectionApi.getFilteredByTag("leden").sort(function(a, b) {
      // Sorteer op 'volgorde' uit front matter
      return (a.data.volgorde || 999) - (b.data.volgorde || 999);
    });
  });

  // --- Algemene configuratie ---
  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",         // bronbestanden
      output: "_site",      // uiteindelijke buildmap
      includes: "_includes" // herbruikbare layouts en partials
    }
  };
};
