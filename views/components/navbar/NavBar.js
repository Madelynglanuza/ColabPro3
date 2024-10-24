class NavBar extends HTMLElement {
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
            })
    }
}

customElements.define('colabpro-navbar', NavBar);