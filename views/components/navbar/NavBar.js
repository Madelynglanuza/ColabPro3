class NavBar extends HTMLElement {
    pages = [
        {
            name: 'home',
            link: '../index.html'
        },
        {
            name: 'Proyectos',
            link: 'project_list.html'
        },
        {
            name: 'Miembros',
            link: ''
        },
        {
            name: 'Calendario',
            link: ''
        },
        {
            name: 'Chat',
            link: ''
        }
    ]

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'components/NavBar/NavBar.css')

        shadow.appendChild(linkElem);

        fetch('components/NavBar/NavBar.html')
            .then(response => response.text())
            .then(html => {
                const container = document.createElement('nav');
                container.classList.add('navbar');
                container.innerHTML = html;
                shadow.appendChild(container);

                // obtiene la ruta de la pagina actual
                let currentPage = window.location.pathname.split("/").pop();

                // crea el menu
                const menu = shadow.querySelector('[data-field="nav-bar-component"]');
                const home = shadow.querySelector('[data-field="nav-bar-home"]');

                this.pages.forEach(page => {
                    const item = document.createElement('li');
                    item.classList.add('nav-item');

                    if (page.name === 'home') {
                        home.href = page.link;
                        return;
                    }

                    let link = '';
                    if (page.link.endsWith(currentPage)) {
                        link = document.createElement('span');
                        item.classList.add('active');
                    } else {
                        link = document.createElement('a');
                        link.href = page.link;
                    }

                    link.classList.add('nav-link');
                    link.textContent = page.name;

                    item.appendChild(link);
                    menu.appendChild(item);
                });
            });
    }
}

customElements.define('colabpro-navbar', NavBar);