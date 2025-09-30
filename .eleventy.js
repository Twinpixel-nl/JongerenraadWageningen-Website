// .eleventy.js

module.exports = function(eleventyConfig) {
  
  // Kopieer de 'assets' en 'admin' mappen naar de uiteindelijke site.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

  // --- VOEG DIT BLOK TOE ---
  // Filtert de datums zodat alleen vergaderingen van vandaag en in de toekomst worden getoond.
  eleventyConfig.addFilter("onlyFutureDates", function(dates) {
      // Stap 1: Krijg de datum van vandaag en zet de tijd op middernacht.
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 'today' is nu precies middernacht, in de lokale tijdzone.

      return dates.filter(item => {
          // Controleer of er een geldige datum is
          if (!item.datum || typeof item.datum !== 'string') {
              return false;
          }

          // Stap 2: Splits de 'YYYY-MM-DD' datum en maak een nieuw datumobject.
          // Dit dwingt JavaScript om de datum als 'lokaal' te zien, net als 'today'.
          const parts = item.datum.split('-');
          if (parts.length !== 3) {
            return false;
          }
          // Let op: maand is 0-gebaseerd in JS (0=jan), dus -1.
          const itemDate = new Date(parts[0], parts[1] - 1, parts[2]);

          // Stap 3: Vergelijk de twee datums.
          // Behoud het item als de vergaderdatum op of na vandaag is.
          return itemDate >= today;
      });
  });
  // --- EINDE VAN HET TOEGEVOEGDE BLOK ---

  // --- Custom Collection voor Leden ---
  eleventyConfig.addCollection("ledenGesorteerd", function(collectionApi) {
    return collectionApi.getFilteredByTag("leden").sort(function(a, b) {
      return (a.data.volgorde || 999) - (b.data.volgorde || 999);
    });
  });

  // --- Algemene Configuratie ---
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