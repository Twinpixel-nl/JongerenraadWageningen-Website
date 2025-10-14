// .eleventy.js

module.exports = function(eleventyConfig) {
  
  // Kopieer de 'assets' en 'admin' mappen naar de uiteindelijke site.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

  // --- FILTER VOOR TOEKOMSTIGE DATUMS (MET DE JUISTE DATUM-VOLGORDE) ---
  eleventyConfig.addFilter("onlyFutureDates", function(dates) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return dates.filter(item => {
          if (!item.datum || typeof item.datum !== 'string') {
              return false;
          }

          // Splits de datum "DD-MM-YYYY" in ["DD", "MM", "YYYY"]
          const parts = item.datum.split('-');
          if (parts.length !== 3) {
            return false;
          }
          
          // --- DEZE REGEL IS DE OPLOSSING ---
          // We bouwen de datum nu op in de juiste volgorde: Jaar, Maand, Dag
          // parts[2] = Jaar, parts[1] = Maand, parts[0] = Dag
          const itemDate = new Date(parts[2], parts[1] - 1, parts[0]);

          return itemDate >= today;
      });
  });
  // --- EINDE FILTER ---

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

const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSitemap, {
    sitemap: {
      hostname: "https://jrwageningen.nl",
    },
  });
};
