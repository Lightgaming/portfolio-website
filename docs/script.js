document.addEventListener('DOMContentLoaded', () => {
    const username = 'Lightgaming';
    const repoList = document.getElementById('repo-list');

    const languageIcons = {
        'JavaScript': 'fab fa-js',
        'Python': 'fab fa-python',
        'Java': 'fab fa-java',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'C++': 'fab fa-cuttlefish',
        'C#': 'fab fa-cuttlefish',
        'PHP': 'fab fa-php',
        'Ruby': 'fas fa-gem',
        'Go': 'fab fa-golang',
        'TypeScript': 'fab fa-js-square',
        'Shell': 'fas fa-terminal',
        'Swift': 'fab fa-swift',
        'Kotlin': 'fab fa-korvue',
        'Rust': 'fab fa-rust',
        'Dart': 'fab fa-dart'
    };

    fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=6`)
        .then(response => response.json())
        .then(data => {
            data.forEach(repo => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <a href="${repo.html_url}" target="_blank">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'No description available'}</p>
                        <div class="badges" id="badges-${repo.id}"></div>
                    </a>
                `;
                repoList.appendChild(listItem);

                fetch(repo.languages_url)
                    .then(response => response.json())
                    .then(languages => {
                        const badgesContainer = document.getElementById(`badges-${repo.id}`);
                        for (const [language] of Object.entries(languages)) {
                            const badge = document.createElement('span');
                            badge.className = 'badge';
                            badge.innerHTML = `<i class="${languageIcons[language] || 'fas fa-code'}"></i> ${language}`;
                            badgesContainer.appendChild(badge);
                        }
                    })
                    .catch(error => console.error('Error fetching languages:', error));
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
});
