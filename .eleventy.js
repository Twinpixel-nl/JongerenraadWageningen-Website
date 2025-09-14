module.exports = function(eleventyConfig) {
  
  // Kopieer alleen de assets map vanuit src.
  eleventyConfig.addPassthroughCopy("src/assets");

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