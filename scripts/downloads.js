
const projects = [
    {
        name: "World Clock v2",
        githubRepo: "EricZeller/flutter-world-clock-v2",
        icon: "flutter.png",
        links: [
            { image: '../img/IzzyOnDroidButton_nofont.svg', url: 'https://apt.izzysoft.de/fdroid/index/apk/de.ericz.worldclockv2/' },
        ],
    },
    {
        name: "Randy v2",
        githubRepo: "EricZeller/flutter_randy",
        icon: "flutter.png"
    },
    {
        name: "Randy",
        githubRepo: "EricZeller/randy",
        icon: "android.png"
    },
    // projects to add here
];
const projectContainer = document.querySelector('.projectcontainer');

projects.forEach(project => {
    const ownerAndRepo = project.githubRepo.split('/');
    const owner = ownerAndRepo[0];
    const repo = ownerAndRepo[1];

    fetch(`https://api.github.com/repos/${owner}/${repo}`)
        .then(response => response.json())
        .then(repoInfo => {
            const description = repoInfo.description;

            fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`)
                .then(response => response.json())
                .then(latestRelease => {
                    console.log(latestRelease)
                    const projectName = project.name;
                    const latestVersion = latestRelease.tag_name;
                    const latestReleaseLink = latestRelease.html_url;

                    const projectElement = document.createElement('div');
                    projectElement.classList.add('project');

                    const projectElementTop = document.createElement('div');
                    projectElementTop.classList.add('project-top');

                    const titleElement = document.createElement('h2');
                    titleElement.textContent = projectName;
                    projectElementTop.appendChild(titleElement);

                    const projectIcon = document.createElement('img');
                    projectIcon.src = `./icons/${project.icon}`;
                    projectElementTop.appendChild(projectIcon);

                    projectElement.appendChild(projectElementTop);

                    if (project.links) {
                        project.links.forEach(link => {
                          const additionalLinkElement = document.createElement('a');
                          const storeImg = document.createElement('img');
                          storeImg.style.width = '150px';
                          storeImg.style.background = 'none';
                          storeImg.style.borderRadius = '0px';
                          storeImg.style.marginTop = '0px';
                          storeImg.src = './img/IzzyOnDroidButton_nofont.svg';
                          additionalLinkElement.appendChild(storeImg);
                          additionalLinkElement.href = link.url;
                          additionalLinkElement.target = '_blank';
                          projectElement.appendChild(additionalLinkElement);
                        });
                      }

                    const descriptionElement = document.createElement('p');
                    descriptionElement.classList.add('description');
                    descriptionElement.textContent = description;
                    projectElement.appendChild(descriptionElement);

                    const versionElement = document.createElement('p');
                    versionElement.classList.add('latest-version');
                    const staticText = document.createTextNode('Current version: ');
                    const strongElement = document.createElement('strong');
                    strongElement.textContent = latestVersion;
                    versionElement.appendChild(staticText);
                    versionElement.appendChild(strongElement);
                    projectElement.appendChild(versionElement);

                    const repoLinkElement = document.createElement('a');
                    repoLinkElement.textContent = 'Repository ';
                    repoLinkElement.href = `https://github.com/${owner}/${repo}`;
                    repoLinkElement.target = '_blank';
                    projectElement.appendChild(repoLinkElement);

                    const emptyElement = document.createElement('p');
                    projectElement.appendChild(emptyElement);

                    const iconElementGitHub = document.createElement('ion-icon');
                    iconElementGitHub.setAttribute('name', 'logo-github');
                    repoLinkElement.appendChild(iconElementGitHub);

                    const latestReleaseLinkElement = document.createElement('a');
                    latestReleaseLinkElement.textContent = 'Release overview ';
                    latestReleaseLinkElement.href = latestReleaseLink;
                    latestReleaseLinkElement.target = '_blank';
                    projectElement.appendChild(latestReleaseLinkElement);

                    const emptyElement2 = document.createElement('p');
                    projectElement.appendChild(emptyElement2);

                    const iconElementGitHub2 = document.createElement('ion-icon');
                    iconElementGitHub2.setAttribute('name', 'logo-github');
                    latestReleaseLinkElement.appendChild(iconElementGitHub2);

                    latestRelease.assets.forEach(asset => {
                        var platform = detectPlatform(asset.name);
                        if (platform) {
                            const downloadLinkElement = document.createElement('a');
                            downloadLinkElement.classList.add('download-link');
                            downloadLinkElement.textContent = `Download for ${platform} `;
                            downloadLinkElement.href = asset.browser_download_url;
                            projectElement.appendChild(downloadLinkElement);

                            const iconElement = document.createElement('ion-icon');
                            if (asset.name.endsWith(".apk")) {
                                platform = "android";
                            } else if (asset.name.endsWith(".zip") || asset.name.endsWith(".exe")) {
                                platform = "windows";
                            } else if (asset.name.endsWith(".dmg")) {
                                platform = "apple";
                            } else if (asset.name.endsWith(".tar.xz")) {
                                platform = "tux";
                            }
                            iconElement.setAttribute('name', `logo-${platform.toLowerCase()}`);
                            downloadLinkElement.appendChild(iconElement);

                            const emptyElement = document.createElement('p');
                            projectElement.appendChild(emptyElement);
                        }
                    });

                    projectContainer.appendChild(projectElement);
                })
                .catch(error => console.error('Failed to get latest release:', error));
        })
        .catch(error => console.error('Failed to get repo informations', error));
});

function detectPlatform(assetName) {
    if (assetName.endsWith(".apk")) {
        return "Android (.apk)";
    } else if (assetName.endsWith(".zip")) {
        return "Windows (.zip)";
    } else if (assetName.endsWith(".dmg")) {
        return "macOS (.dmg)";
    } else if (assetName.endsWith(".tar.xz")) {
        return "Linux (.tar.xz)";
    } else if (assetName.endsWith(".exe")) {
        return "Windows (.exe)";
    }
    // Füge weitere Plattformen hinzu, wenn nötig
    return null;
}
