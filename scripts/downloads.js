
const projects = [
    {
        name: "Randy",
        githubRepo: "EricZeller/randy",
        icon: "android.png"
    },
    {
        name: "Jellyfin Media Player",
        githubRepo: "jellyfin/jellyfin-media-player",
        icon: "cross.png"
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
                    const projectName = project.name;
                    const latestVersion = latestRelease.tag_name;
                    const latestReleaseLink = latestRelease.html_url;

                    const projectElement = document.createElement('div');
                    projectElement.classList.add('project');

                    const projectElementLeft = document.createElement('div');
                    projectElementLeft.classList.add('project-left');

                    const titleElement = document.createElement('h2');
                    titleElement.textContent = projectName;
                    projectElementLeft.appendChild(titleElement);

                    const descriptionElement = document.createElement('p');
                    descriptionElement.classList.add('description');
                    descriptionElement.textContent = description;
                    projectElementLeft.appendChild(descriptionElement);

                    const versionElement = document.createElement('p');
                    versionElement.classList.add('latest-version');
                    versionElement.textContent = `Current version: ${latestVersion}`;
                    projectElementLeft.appendChild(versionElement);

                    const repoLinkElement = document.createElement('a');
                    repoLinkElement.textContent = 'Repository ';
                    repoLinkElement.href = `https://github.com/${owner}/${repo}`;
                    repoLinkElement.target = '_blank';
                    projectElementLeft.appendChild(repoLinkElement);

                    const emptyElement = document.createElement('p');
                    projectElementLeft.appendChild(emptyElement);

                    const iconElementGitHub = document.createElement('ion-icon');
                    iconElementGitHub.setAttribute('name', 'logo-github');
                    repoLinkElement.appendChild(iconElementGitHub);

                    const latestReleaseLinkElement = document.createElement('a');
                    latestReleaseLinkElement.textContent = 'Release overview ';
                    latestReleaseLinkElement.href = latestReleaseLink;
                    latestReleaseLinkElement.target = '_blank';
                    projectElementLeft.appendChild(latestReleaseLinkElement);

                    const emptyElement2 = document.createElement('p');
                    projectElementLeft.appendChild(emptyElement2);

                    const iconElementGitHub2 = document.createElement('ion-icon');
                    iconElementGitHub2.setAttribute('name', 'logo-github');
                    latestReleaseLinkElement.appendChild(iconElementGitHub2);

                    latestRelease.assets.forEach(asset => {
                        const platform = detectPlatform(asset.content_type);
                        if (platform) {
                            const downloadLinkElement = document.createElement('a');
                            downloadLinkElement.classList.add('download-link');
                            downloadLinkElement.textContent = `Download (${platform})`;
                            downloadLinkElement.href = asset.browser_download_url;
                            projectElementLeft.appendChild(downloadLinkElement);

                            const iconElement = document.createElement('ion-icon');
                            iconElement.setAttribute('name', 'cloud-download');
                            downloadLinkElement.appendChild(iconElement);

                            const emptyElement = document.createElement('p');
                            projectElementLeft.appendChild(emptyElement);
                        }
                    });

                    projectElement.appendChild(projectElementLeft);

                    const projectIcon = document.createElement('img');
                    projectIcon.src = `./icons/${project.icon}`;
                    projectElement.appendChild(projectIcon);

                    projectContainer.appendChild(projectElement);
                })
                .catch(error => console.error('Failed to get latest release:', error));
        })
        .catch(error => console.error('Failed to get repo informations', error));
});

function detectPlatform(contentType) {
    switch (contentType) {
        case "application/vnd.android.package-archive":
            return "Android";
        case "application/x-ms-dos-executable":
            return "Windows";
        case "application/x-diskcopy":
            return "macOS";
        case "application/vnd.debian.binary-package":
            return "Linux";
        default:
            return null;
    }
}
