// leden-loader.js
document.addEventListener('DOMContentLoaded', () => {
    const ledenContainer = document.getElementById('leden-lijst');

    async function laadLeden() {
        try {
            // Fetch het JSON-bestand met alle leden
            const response = await fetch('/_data/leden.json');
            if (!response.ok) {
                throw new Error(`Netwerkfout: ${response.statusText}`);
            }
            const data = await response.json();

            // Leeg de container
            ledenContainer.innerHTML = '';

            if (data.ledenlijst && data.ledenlijst.length > 0) {
                data.ledenlijst.forEach(lid => {
                    // Maak voor elk lid een HTML-kaart
                    const lidKaart = document.createElement('article');
                    lidKaart.className = 'member-card fade-in';

                    // Converteer markdown bio naar HTML (simpele versie)
                    const bioHtml = lid.bio ? lid.bio.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') : '';

                    lidKaart.innerHTML = `
                        <img src="${lid.foto}" alt="Profielfoto van ${lid.naam}">
                        <h3>${lid.naam}</h3>
                        <p>${lid.functie}</p>
                        <div class="member-bio">${bioHtml}</div>
                    `;
                    ledenContainer.appendChild(lidKaart);
                });

                // Trigger de fade-in animatie opnieuw voor de nieuwe elementen
                // (Deze code is optioneel maar zorgt voor een mooie animatie)
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, { threshold: 0.1 });

                document.querySelectorAll('.member-card.fade-in').forEach(card => observer.observe(card));

            } else {
                ledenContainer.innerHTML = '<p>Er zijn op dit moment geen leden om weer te geven.</p>';
            }

        } catch (error) {
            console.error('Fout bij het laden van de leden:', error);
            ledenContainer.innerHTML = '<p>Oeps, er ging iets mis bij het ophalen van de leden. Probeer het later opnieuw.</p>';
        }
    }

    laadLeden();
});