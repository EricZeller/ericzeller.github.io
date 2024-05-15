

const projects = [
  {
    name: "Randy in Flutter",
    githubRepo: "EricZeller/flutter_randy",
    languages: "Dart, Flutter as framework",
    description: "Same principle as Randy, written with the Flutter framework for more devices instead of only Android with Kotlin",
    links: [
      { text: 'Go to downdloads', url: '../downloads' },
      { text: 'Feedback', url: 'https://example.com/feedback1' }
    ],
    logo: "flutter.png"
  },
  {
    name: "Randy",
    githubRepo: "EricZeller/randy",
    languages: "Kotlin",
    description: "Simple random number generator, written in Kotlin for Android",
    logo: "kotlin.png"
  },
  {
    name: "Snake",
    githubRepo: "EricZeller/snake",
    languages: "JavaScript, HTML",
    description: "Snake game with keyboard and touch controls, written in JavaScript",
    logo: "javascript.png"
  },
  {
    name: "Towers of Hanoi",
    githubRepo: "EricZeller/TowersOfHanoi",
    languages: "Java",
    description: "Towers of Hanoi algorithm, with variable number of plates and visual states of the progress on the terminal",
    logo: "java.png"
  },
  {
    name: "Coding Camp 2022",
    githubRepo: "EricZeller/Coding-Camp-2022",
    languages: "Vue, JavaScript, HTML",
    description: "Sybit Coding Camp from 2022, where we made a web app built with Vue.js, for a leisure activity program",
    logo: "vue.png"
  },
  {
    name: "k-Means algorithm",
    githubRepo: "EricZeller/python-kmeans",
    languages: "Python",
    description: "A algorithm with libraries in Python for a k-Means clustering",
    logo: "python.png"
  },
  {
    name: "Serial clock for Nucleo",
    githubRepo: "EricZeller/serialPythonUSBClock",
    languages: "C++, Python",
    description: "A mbed program in C++ for a Nucleo with a 7-segment display for showing the current time, updated via a Python script over serial USB",
    logo: "cpp.png"
  },
  {
    name: "This website",
    githubRepo: "EricZeller/ericzeller.github.io",
    languages: "JavaScript, CSS, HTML",
    description: "Personal portfolio website with responsive design and API calls from the GitHub API",
    logo: "html.png"
  },
  {
    name: "Tic Tac Toe",
    githubRepo: "EricZeller/tictactoe",
    languages: "JavaScript, CSS, HTML",
    description: "A Tic Tac Toe game in the browser for two players, written JavaScript",
    logo: "javascript.png"
  },
  {
    name: "Rock Paper Scissor",
    githubRepo: "EricZeller/rockpaperscissor",
    languages: "JavaScript, CSS, HTML",
    description: "A Rock Paper Scissor game, also in the browser written in JavaScript against a random bot",
    logo: "javascript.png"
  },
  // projects to add here
];

const projectContainer = document.querySelector('.projectcontainer');


projects.forEach(project => {
  const githubLink = `https://github.com/${project.githubRepo}`;

  const projectElement = document.createElement('div');
  projectElement.classList.add('project');

  const projectElementLeft = document.createElement('div');
  projectElementLeft.classList.add('project-left');

  const projectTitleLink = document.createElement('a');
  projectTitleLink.href = githubLink;
  projectTitleLink.innerHTML = `<h2>${project.name}</h2>`;

  const projectLanguages = document.createElement('p');
  projectLanguages.textContent = `Languages: ${project.languages}`;

  const projectDescription = document.createElement('p');
  projectDescription.innerHTML = project.description;

  projectElementLeft.appendChild(projectTitleLink);
  projectElementLeft.appendChild(projectLanguages);
  projectElementLeft.appendChild(projectDescription);

  projectElement.appendChild(projectElementLeft);


  const projectLogo = document.createElement('img');
  projectLogo.src = `../icons/${project.logo}`;
  projectElement.appendChild(projectLogo);

  projectContainer.appendChild(projectElement);
})


/*

// GitHub Benutzername
const username = 'EricZeller';

// API-URL für die Repositories eines Benutzers
const apiUrl = `https://api.github.com/users/${username}/repos`;

// Funktion zum Abrufen der Repositories und Anzeigen
async function fetchAndDisplayRepos() {
  try {
    const response = await fetch(apiUrl);
    const repos = await response.json();

    // Durchlaufen der Repositories und Erstellen der Projekt-Divs
    repos.forEach(async repo => {
      // Container für das Projekt
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project');

      // Link zum Repository
      const repoLink = document.createElement('a');
      repoLink.href = repo.html_url;
      repoLink.innerHTML = `<h2>${repo.name}</h2>`;

      // Beschreibung des Repositorys
      const description = document.createElement('p');
      description.textContent = repo.description || 'No description';

      // Letzter Commit
      const lastCommit = await getLastCommit(repo);
      const lastCommitText = document.createElement('p');
      lastCommitText.textContent = `Last edit: ${lastCommit}`;

      // Überwiegende Sprache des Repositorys
      const primaryLanguage = await getPrimaryLanguage(repo);
      const languageElement = document.createElement('p');
      languageElement.textContent = `Main language: ${primaryLanguage}`;

      // Projekt-Elemente hinzufügen
      const projectLeftDiv = document.createElement('div');
      projectLeftDiv.classList.add('project-left');
      projectLeftDiv.appendChild(repoLink);
      projectLeftDiv.appendChild(description);
      projectLeftDiv.appendChild(lastCommitText);
      projectLeftDiv.appendChild(languageElement);

      const logoImg = document.createElement('img');
      let logoSrc = `${repo.html_url}/raw/main/logo.png`; // Hauptbranch
      try {
        const response = await fetch(logoSrc);
        if (!response.ok) {
          throw new Error('Not found');
        }
      } catch {
        logoSrc = `${repo.html_url}/raw/master/logo.png`; // Master-Branch als Fallback
      }
      logoImg.src = logoSrc;
      logoImg.alt = 'logo';

      // Projekt-Div zusammenfügen
      projectDiv.appendChild(projectLeftDiv);
      projectDiv.appendChild(logoImg);

      // Projekt-Div zum vorhandenen Container hinzufügen
      const projectContainer = document.querySelector('.projectcontainer');
      projectContainer.appendChild(projectDiv);
    });
  } catch (error) {
    console.error('Failed to get repos', error);
  }
}

// Funktion zum Abrufen des letzten Commits eines Repositories
async function getLastCommit(repo) {
  const commitsUrl = `${repo.url}/commits`;
  const commitsResponse = await fetch(commitsUrl);
  const commitsData = await commitsResponse.json();
  const lastCommitDate = new Date(commitsData[0].commit.author.date);
  return lastCommitDate.toLocaleDateString();
}

// Funktion zum Abrufen der überwiegenden Sprache eines Repositories
async function getPrimaryLanguage(repo) {
  const languagesUrl = repo.languages_url;
  const languagesResponse = await fetch(languagesUrl);
  const languagesData = await languagesResponse.json();
  console.log(languagesData);
  const primaryLanguage = Object.keys(languagesData)[0];
  return primaryLanguage;
}

// Repos abrufen und anzeigen, wenn die Seite geladen ist
window.onload = fetchAndDisplayRepos;
*/