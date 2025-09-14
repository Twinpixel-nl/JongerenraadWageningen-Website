module.exports = function(eleventyConfig) {
  
  // Deze regel is de belangrijkste:
  // Kopieer de volledige 'assets' map naar de uiteindelijke website.
  eleventyConfig.addPassthroughCopy("src/assets");

  // Vertel Eleventy dat .html-bestanden ook Nunjucks-code kunnen bevatten.
  // Dit geeft je HTML-bestanden "superkrachten".
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

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