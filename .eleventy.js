module.exports = function(eleventyConfig) {
  
  // Kopieer de 'assets' en 'admin' mappen naar de uiteindelijke site.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

eleventyConfig.addFilter("onlyFutureDates", function(dates) {
        // Krijg de datum van vandaag, maar dan vastgezet op middernacht UTC.
        // Dit voorkomt tijdzoneproblemen en zorgt dat de vergadering van vandaag wordt meegenomen.
        const now = new Date();
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

        return dates.filter(item => {
            // Controleer of de datum een geldige string is
            if (!item.datum || typeof item.datum !== 'string') {
                return false;
            }
            
            // Splits de datumstring (YYYY-MM-DD) op in delen
            const dateParts = item.datum.split('-');
            if (dateParts.length !== 3) {
                // Sla ongeldige formaten over
                return false;
            }
            
            // Maak een datumobject aan in UTC.
            // De maand is 0-geïndexeerd in JavaScript, dus we doen -1.
            const itemDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
            
            // Behoud de vergadering als de datum op of na vandaag (middernacht UTC) is.
            return itemDate >= today;
        });
    });
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