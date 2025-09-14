// in .eleventy.js

module.exports = function(eleventyConfig) {
  
  // Kopieer de 'assets' map.
  eleventyConfig.addPassthroughCopy("src/assets");

  // VOEG DEZE REGEL TOE: Kopieer de 'admin' map van de root naar de output.
  eleventyConfig.addPassthroughCopy("admin");

  return {
    // ... de rest van je config ...
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};