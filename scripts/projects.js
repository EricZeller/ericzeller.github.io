

const projects = [
  {
    name: "World Clock v2",
    githubRepo: "EricZeller/flutter-world-clock-v2",
    languages: "Dart, Flutter as framework",
    description: "Flutter app that displays the current time and weather for various cities. With Material 3 support like Randy v2",
    links: [
      { text: 'Try it out on the web', url: 'https://ericzeller.github.io/world-clock-v2-web/' },
      { text: 'Go to downloads', url: './downloads.html' },
    ],
    logo: "flutter.png"
  },
  {
    name: "Randy v2",
    githubRepo: "EricZeller/flutter_randy",
    languages: "Dart, Flutter as framework",
    description: "Same principle as Randy, written with the Flutter framework for more devices instead of only Android with Kotlin, Material You design integrated and currently working on Android 12 and later and Windows",
    links: [
      { text: 'Try it out on the web', url: 'https://ericzeller.github.io/flutter_randy_web/' },
      { text: 'Go to downloads', url: './downloads.html' },
    ],
    logo: "flutter.png"
  },
  {
    name: "Randy",
    githubRepo: "EricZeller/randy",
    languages: "Kotlin",
    description: "Simple random number generator, written in Kotlin for Android",
    links: [
      { text: 'Go to downloads', url: './downloads.html' }
    ],
    logo: "kotlin.png"
  },
  {
    name: "Snake",
    githubRepo: "EricZeller/snake",
    languages: "JavaScript, HTML",
    description: "Snake game with keyboard and touch controls, written in JavaScript",
    links: [
      { text: 'Play it', url: 'https://ericzeller.github.io/snake' }
    ],
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
    links: [
      { text: 'Original repository from Sybit', url: 'https://github.com/Sybit-Education/Coding-Camp-2022' }
    ],
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
    links: [
      { text: 'Play it', url: 'https://ericzeller.github.io/tictactoe' }
    ],
    logo: "javascript.png"
  },
  {
    name: "Rock Paper Scissor",
    githubRepo: "EricZeller/rockpaperscissor",
    languages: "JavaScript, CSS, HTML",
    description: "A Rock Paper Scissor game, also in the browser written in JavaScript against a random bot",
    links: [
      { text: 'Play it', url: 'https://ericzeller.github.io/rockpaperscissor' }
    ],
    logo: "javascript.png"
  },
  // projects to add here
];

const projectContainer = document.querySelector('.projectcontainer');


projects.forEach(project => {
  const githubLink = `https://github.com/${project.githubRepo}`;

  const projectElement = document.createElement('div');
  projectElement.classList.add('project');

  const projectElementTop = document.createElement('div');
  projectElementTop.classList.add('project-top');

  const projectTitleLink = document.createElement('a');
  projectTitleLink.href = githubLink;
  projectTitleLink.innerHTML = `<h2>${project.name}</h2>`;

  const projectLanguages = document.createElement('p');
  projectLanguages.textContent = `Languages: ${project.languages}`;

  const projectDescription = document.createElement('p');
  projectDescription.innerHTML = project.description;

  projectElementTop.appendChild(projectTitleLink);
  const projectLogo = document.createElement('img');
  projectLogo.src = `./icons/${project.logo}`;
  projectElementTop.appendChild(projectLogo);

  projectElement.appendChild(projectElementTop);


  if (project.links) {
    project.links.forEach(link => {
      const additionalLinkElement = document.createElement('a');
      additionalLinkElement.textContent = `${link.text} `;
      additionalLinkElement.href = link.url;
      additionalLinkElement.target = '_blank';
      projectElement.appendChild(additionalLinkElement);
    });
  }

  projectElement.appendChild(projectLanguages);
  projectElement.appendChild(projectDescription);

  projectContainer.appendChild(projectElement);
})