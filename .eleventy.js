module.exports = function(eleventyConfig) {
  
  // Kopieer de 'assets' en 'admin' mappen.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

  return {
    // DEZE REGELS ZIJN DE OPLOSSING:
    // Vertel Eleventy om de Nunjucks engine te gebruiken voor alle HTML en Markdown bestanden.
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};