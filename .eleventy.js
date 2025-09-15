module.exports = function(eleventyConfig) {
  
  // Kopieer de 'assets' en 'admin' mappen naar de uiteindelijke site.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

  // --- Custom Collection voor Leden ---
  // Dit maakt een nieuwe lijst 'ledenGesorteerd' aan die we in de templates kunnen gebruiken.
  // De lijst is gesorteerd op basis van het 'volgorde'-veld in de front matter van elk lid.
  eleventyConfig.addCollection("ledenGesorteerd", function(collectionApi) {
    return collectionApi.getFilteredByTag("leden").sort(function(a, b) {
      // Sorteer van laag naar hoog. Als 'volgorde' niet bestaat, zet het item achteraan.
      return (a.data.volgorde || 999) - (b.data.volgorde || 999);
    });
  });

  // --- Algemene Configuratie ---
  return {
    // Vertel Eleventy om de Nunjucks engine te gebruiken voor alle HTML en Markdown bestanden.
    // Dit zorgt ervoor dat filters zoals `| safe` en loops overal werken.
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

    // Definieer de mappenstructuur van het project.
    dir: {
      input: "src",       // De broncode van de website staat in de 'src' map.
      output: "_site",      // Eleventy bouwt de uiteindelijke website in de '_site' map.
      includes: "_includes" // Herbruikbare templates (zoals layouts) staan in 'src/_includes'.
    }
  };
};