module.exports = function(eleventyConfig) {
  // We voegen alleen de assets toe, verder geen configuratie die kan storen.
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    // Deze regels zijn cruciaal om .html als template te zien.
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};