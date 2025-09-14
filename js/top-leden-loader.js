document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('home-members-container');

    // Als de container niet op deze pagina bestaat, stop dan de functie.
    if (!container) {
        return;
    }

    fetch('/_data/members.yml')
        .then(response => response.text())
        .then(yamlText => {
            const data = jsyaml.load(yamlText);
            const allMembers = data.leden;

            if (allMembers && allMembers.length > 0) {
                // HET BELANGRIJKSTE DEEL: Pak alleen de eerste 3 leden!
                const topMembers = allMembers.slice(0, 3);

                container.innerHTML = ''; // Leegmaken voor de zekerheid

                topMembers.forEach(member => {
                    // We maken geen bio, want het is een preview
                    const memberCardHTML = `
                        <article class="member-card fade-in">
                            <img src="${member.foto}" alt="Profielfoto van ${member.naam}">
                            <h3>${member.naam}</h3>
                            <p>${member.functie}</p>
                        </article>
                    `;
                    container.innerHTML += memberCardHTML;
                });
                
                // Activeer de fade-in animatie voor de nieuw toegevoegde kaarten
                // Deze functie moet mogelijk in je hoofd script.js bestand staan
                // of je kunt de IntersectionObserver hier opnieuw initialiseren.
                // Voor nu: we gaan ervan uit dat de CSS class voldoende is.

            } else {
                // Als er geen leden zijn, verberg de hele sectie.
                container.closest('.members-section').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Fout bij het laden van de top 3 leden:', error);
            // Verberg de sectie ook als er een fout is.
            container.closest('.members-section').style.display = 'none';
        });
});