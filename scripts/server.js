const server = [
    {
        name: "Nextcloud",
        icon: "nextcloud.png",
        description: "Self-hosted cloud storage and collaboration platform",
        link: "https://cloud.ericz.de"
    },
    {
        name: "Jellyfin",
        icon: "jellyfin.svg",
        description: "Open-source media server for streaming multimedia content",
        link: "https://jellyflix.ericz.de"
    },
    {
        name: "Navidrome",
        icon: "navidrome.png",
        description: "Music server and streamer with a focus on simplicity and performance",
        link: "https://navidrome.ericz.de"
    },
    {
        name: "Portainer",
        icon: "portainer.png",
        description: "Container management platform for Docker",
        link: "https://ericz.de/portainer/"
    },
    {
        name: "Guacamole",
        icon: "guacamole.png",
        description: "Web-based remote desktop gateway",
        link: "https://guacamole.ericz.de"
    },
    {
        name: "Samba",
        icon: "samba.png",
        description: "File and print server for Windows, Unix, and macOS clients",
        link: "https://www.samba.org"
    }
];

const serverContainer = document.querySelector('.projectcontainer');

server.forEach(server => {
    const serverElement = document.createElement('div');
    serverElement.classList.add('project');

    const titleElement = document.createElement('div');
    titleElement.classList.add('project-top');

    const title = document.createElement('h2');
    title.textContent = server.name;

    const iconLink = document.createElement('a');
    iconLink.href = server.link;
    const iconImg = document.createElement('img');
    iconImg.src = `../icons/${server.icon}`;
    iconImg.alt = "server icon";
    iconLink.appendChild(iconImg);

    titleElement.appendChild(title);
    titleElement.appendChild(iconLink);

    serverElement.appendChild(titleElement);
    
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = server.description;

    serverElement.appendChild(descriptionElement);

    serverContainer.appendChild(serverElement);
})
