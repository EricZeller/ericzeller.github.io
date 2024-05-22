
const projects = [
    {
        name: "Randy",
        githubRepo: "EricZeller/randy",
        icon: "android.png"
    },
    {
        name: "Randy in Flutter",
        githubRepo: "EricZeller/flutter_randy",
        icon: "cross.png"
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

                    const descriptionElement = document.createElement('p');
                    descriptionElement.classList.add('description');
                    descriptionElement.textContent = description;
                    projectElement.appendChild(descriptionElement);

                    const versionElement = document.createElement('p');
                    versionElement.classList.add('latest-version');
                    versionElement.textContent = `Current version: ${latestVersion}`;
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
                            downloadLinkElement.textContent = `Download (${platform}) `;
                            downloadLinkElement.href = asset.browser_download_url;
                            projectElement.appendChild(downloadLinkElement);

                            const iconElement = document.createElement('ion-icon');
                            if (platform == "macOS") {
                                platform = "apple";
                            } else if (platform == "Linux") { 
                                platform = "tux";
                            } else if (platform == "Windows .zip" || platform == "Windows .exe") { 
                                platform = "windows";
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
        return "Android";
    } else if (assetName.endsWith(".zip")) {
        return "Windows .zip";
    } else if (assetName.endsWith(".dmg")) {
        return "macOS";
    } else if (assetName.endsWith(".tar.xz")) {
        return "Linux";
    } else if (assetName.endsWith(".exe")) {
        return "Windows .exe";
    }
    // Füge weitere Plattformen hinzu, wenn nötig
    return null;
}
