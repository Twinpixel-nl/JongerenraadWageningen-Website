# 🌐 Jongerenraad Wageningen Website

Dit is de officiële repository voor de nieuwe website van de **Jongereraad Wageningen (JRW)**.  
De website is ontwikkeld om jongeren in Wageningen te informeren, te betrekken en een stem te geven richting de gemeentepolitiek.  

De site wordt onderhouden door het bestuur van de Jongereraad, met ondersteuning vanuit de community via deze open source repository.

---

## 🎯 Doel
De site biedt:
- Informatie over missie, visie en leden van de Jongereraad.
- Transparantie over vergaderingen en thema’s.
- Een laagdrempelige manier voor jongeren om contact op te nemen met de raad.
- Een open en overdraagbare codebase die toekomstbestendig is voor bestuurswissels.

---

## ⚙️ Technische keuzes
- **Framework**: [Eleventy (11ty)](https://www.11ty.dev/) Static Site Generator.
- **Templating**: [Nunjucks](https://mozilla.github.io/nunjucks/).
- **Styling**: HTML5, CSS3 (Grid, Flexbox, media queries, CSS-variabelen).
- **Interactiviteit**: Vanilla JavaScript (mobiel menu, fade-in animaties).
- **Hosting**: [Netlify](https://www.netlify.com/) (CDN, automatische builds, HTTPS).
- **Contentbeheer**: [Netlify CMS (Decap CMS)](https://decapcms.org/).
- **Versiebeheer**: Git & GitHub (open source repository met commitgeschiedenis).
- **Continuous Deployment**: elke push naar `main` triggert automatisch een nieuwe build via Netlify.

---

## 📂 Structuur
```plaintext
/public             → statische assets (afbeeldingen, icoontjes)
/src                → broncode van de website
  /_includes        → layouts, partials en herbruikbare componenten
  /_data            → JSON/YAML data (bijv. ledenlijst)
  index.njk         → homepage template
/admin/config.yml   → configuratiebestand voor Netlify CMS
README.md           → documentatie voor gebruik en beheer
🚀 Installatie en lokaal gebruik
Clone de repository:

bash
Copy code
git clone https://github.com/<jouw-gebruikersnaam>/jrwageningen.git
cd jrwageningen
Installeer dependencies:

bash
Copy code
npm install
Start de lokale server:

bash
Copy code
npm start
De site draait nu lokaal op http://localhost:8080.

Build de productieversie:

bash
Copy code
npm run build
Output staat in de map /_site.

🔑 Beheer via Netlify CMS
Bezoek /admin op de live website.

Log in met Netlify Identity.

Beheer de volgende collecties:

Pages: statische pagina’s (“Over ons”, “Contact”).

Members: dynamische ledenlijst (naam, functie, foto, bio).

Vergaderingen: beschrijving van thema’s en agenda.

Elke wijziging wordt automatisch als commit naar GitHub gepusht → Netlify bouwt en publiceert de nieuwe site.

🤝 Open source & bijdragen
Dit project is open source en transparant ontwikkeld. Bijdragen zijn welkom via:

Issues → bugs of verbeterpunten melden.

Pull requests → eigen aanpassingen indienen.

Discussions → vragen of suggesties bespreken.

Zie het bestand CONTRIBUTING.md (TBM) voor richtlijnen.

🛡️ Veiligheid & beperkingen
Geen gevoelige gegevens in de repository.

Bij bestuurswissels worden toegang tot GitHub/Netlify aangepast.

Back-ups zijn automatisch beschikbaar via versiebeheer (GitHub commits).

📜 Licentie
Deze repository valt onder de MIT-licentie, zodat hergebruik en aanpassing zijn toegestaan mits met bronvermelding.

👥 Credits
Ontwikkeling: Twan Meurs (CHE HBO-ICT, 2025).

Opdrachtgever: Jongereraad Wageningen.

Beheer: huidig bestuur van de Jongereraad.

