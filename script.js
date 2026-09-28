// ---------------------------------------------------------------
// Boot -> Login -> Welcome -> Desktop sequence
// ---------------------------------------------------------------
const bootScreen = document.getElementById("boot-screen");
const loginScreen = document.getElementById("login-screen");
const loginCard = document.getElementById("login-card");
const loginFrame = document.querySelector(".xp-login-frame");
const welcomeText = document.getElementById("welcome-text");
const appShell = document.getElementById("app-shell");

// 1) Boot screen shows for a bit, then fades into the login screen.
setTimeout(() => {
    bootScreen.classList.add("fade-out");
    setTimeout(() => {
        bootScreen.style.display = "none";
        loginScreen.style.display = "flex";
    }, 600); // matches the CSS fade duration
}, 2600);

// 2) Click the user tile to "log in".
loginCard.addEventListener("click", logIn);

function logIn() {
    loginCard.style.pointerEvents = "none";
    loginFrame.classList.add("hide");

    setTimeout(() => {
        welcomeText.classList.add("show");
    }, 400);

    setTimeout(() => {
        loginScreen.classList.add("fade-out");
        setTimeout(() => {
            loginScreen.style.display = "none";
            appShell.classList.add("visible");
        }, 600);
    }, 1300);
}

// ---------------------------------------------------------------
// "My Projects" as a fake late-90s/2000s search engine.
// To add a project later, just add an object to PROJECTS below —
// everything else (rendering + search filter) is automatic.
// ---------------------------------------------------------------
const PROJECTS = [
    {
        title: "Logo GPE",
        url: "silly-os.local/portfolio/projets/gpe-project",
        desc: "identité visuelle de la GPE Gallery The Gallery Project Endeavour",
        tags: ["Identité Visuelle", "Logo",],
        image: "https://www.image-heberg.fr/files/17905996472278164327.png",
        link: "https://www.image-heberg.fr/files/17905996472278164327.png",
    },
    
 {
        title: "T-shirt et Tote bag",
        url: "silly-os.local/portfolio/projets/t-t-takeurshirtoff",
        desc: "Preparation des fichiers graphiques prêt à l'impression",
        tags: ["Design", "Illustration"],
        image:"http://www.image-heberg.fr/files/1790599941684910863.png",
        link: "http://www.image-heberg.fr/files/1790599941684910863.png",
    },
    
    {
        title: "Affiche CHADRU",
        url: "silly-os.local/portfolio/projets/chadru",
        desc: "Affiche pour l'exposition de CHADRU a l'Artocarpe",
        tags: ["Affiche"],
        image: "https://www.image-heberg.fr/files/179060034043479321.png",
        link: "https://www.image-heberg.fr/files/179060034043479321.png",
    },
    
    // Ajoute d'autres projets ici, même format :
    // {
    //   title: "...",
    //   url: "silly-os.local/portfolio/projets/...",
    //   desc: "...",
    //   tags: ["...", "..."],
    //   image: "chemin/vers/image.png",
    //   link: "https://...",
    // },
];

function buildProjectResult(p) {
    const searchBlob = (p.title + " " + p.tags.join(" ")).toLowerCase();
    return `
    <div class="se-result" data-search="${searchBlob}">
      <div class="se-result-thumb"><img src="${p.image}" alt="${p.title}"></div>
      <div class="se-result-body">
        <a href="${p.link}" target="_blank" class="se-result-title">${p.title}</a>
        <div class="se-result-url">www.${p.url} <span class="se-cached">- En cache - Pages similaires</span></div>
        <p class="se-result-desc">${p.desc}</p>
        <div class="se-result-tags">${p.tags.map((t) => `<span class="se-tag">#${t}</span>`).join("")}</div>
      </div>
    </div>
  `;
}

function buildProjectsWindowContent() {
    const results = PROJECTS.map(buildProjectResult).join("");
    return `
    <div class="se-shell">
      <div class="se-header">
        <div class="se-logo">
          <span style="color:#4285F4">S</span><span style="color:#EA4335">i</span><span style="color:#FBBC05">l</span><span style="color:#4285F4">l</span><span style="color:#34A853">y</span><span style="color:#EA4335">S</span><span style="color:#FBBC05">e</span><span style="color:#4285F4">a</span><span style="color:#34A853">r</span><span style="color:#EA4335">c</span><span style="color:#FBBC05">h</span><span style="color:#333">!</span>
        </div>
        <div class="se-searchbar">
          <input type="text" id="se-input" class="se-input" placeholder="Rechercher un projet, un tag..." oninput="filterProjects(this.value)" />
          <div class="se-btn" onclick="filterProjects(document.getElementById('se-input').value)">
            <img src="icons/Search.png" class="tb-icon" alt="" /> Rechercher
          </div>
        </div>
        <div class="se-stats" id="se-stats">Environ ${PROJECTS.length} résultat${PROJECTS.length > 1 ? "s" : ""} (0,04 seconde)</div>
      </div>
      <div class="se-results" id="se-results">
        ${results}
      </div>
      <div class="se-noresults" id="se-noresults" style="display:none">
        Aucun document ne correspond aux termes de recherche.<br />Essayez « design », « affiche » ou « illustration ».
      </div>
    </div>
  `;
}

function filterProjects(query) {
    const q = query.trim().toLowerCase();
    const nodes = document.querySelectorAll("#se-results .se-result");
    let count = 0;
    nodes.forEach((node) => {
        const match = !q || node.dataset.search.includes(q);
        node.style.display = match ? "" : "none";
        if (match) count++;
    });
    const stats = document.getElementById("se-stats");
    const noResults = document.getElementById("se-noresults");
    if (stats) {
        stats.textContent =
            count > 0
                ? `Environ ${count} résultat${count > 1 ? "s" : ""} (0,0${Math.floor(Math.random() * 8) + 1} seconde)`
                : `0 résultat pour "${query}"`;
    }
    if (noResults) noResults.style.display = count === 0 ? "block" : "none";
}

// ---------------------------------------------------------------
// App registry: define your "windows" here. This is the only part
// you need to touch to add real content later.
// ---------------------------------------------------------------
const APPS = {
    stage: {
        title: "Stage",
        glyph: "icons/aboutme.png",
        color: "#3a6ea5",
        width: 660,
        height: 520,
        explorerChrome: true,
        sidebar: `
      <div class="sidebar-section">
        <div class="sidebar-title">Rapport de stage</div>
        <div class="sidebar-list">
          <div>L'Artocarpe</div>
          <div>01/06 – 30/06/2026</div>
          <div>BUT MMI 1re année</div>
        </div>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">Skills Appris/travaillés</div>
        <div class="sidebar-list">
          <div>Adobe Photoshop</div>
          <div>Canva</div>
          <div>Webflow</div>
          <div>Fichiers print</div>
        </div>
      </div>
    `,
        content: `
      <div style="max-height:100%; overflow-y:auto; padding-right:6px; line-height:1.45;">
        <h2 style="margin-top:0;">Stage de 1er Année de ANICET Neidjah</h2>
        <p><em>Du 1er au 30 juin 2026 · Stagiaire en coordination numérique et communication</em></p>

        <h3>Introduction</h3>
        <p>Ce rapport présente mon expérience d'un mois au sein de L'Artocarpe, association culturelle guadeloupéenne basée au Moule, spécialisée dans la promotion de l'art contemporain à l'échelle internationale. Ce stage s'est déroulé dans le cadre de ma première année de BUT MMI à l'IUT de Saint-Claude (Université des Antilles), sous la tutelle de Mme Joëlle Ferly, directrice et fondatrice de l'association.</p>
        <p>Mes missions ont couvert la création graphique, la gestion du site web, la production de supports de communication et la participation à des projets événementiels.</p>

        <h3>Présentation de l'entreprise</h3>
        <p>L'Artocarpe est une association culturelle fondée en 2009 par Joëlle Ferly, artiste et commissaire d'exposition diplômée de la Central Saint Martins' School of Art de Londres. Situé au cœur du Moule, en Grande-Terre, c'est le premier espace d'art contemporain autogéré de Guadeloupe, créé par une artiste pour les artistes.</p>
        <p>55 Rue Victor Hugo, Le Moule 97160, Guadeloupe · <a href="https://www.lartocarpe.org" target="_blank" rel="noopener">lartocarpe.org</a> · <a href="mailto:lartocarpe@gmail.com">lartocarpe@gmail.com</a></p>

        <h3>Ma place à l'agence</h3>
        <p>Intégrée comme stagiaire en coordination numérique et communication, j'ai travaillé directement avec Mme Ferly au sein d'une équipe de 3 à 4 personnes, entièrement en télétravail. Mon rôle : assurer la présence en ligne de l'association, produire des contenus visuels et coordonner différents projets de communication.</p>
        <ul>
          <li>Création de l'identité visuelle de la GPE Gallery (logo sous Photoshop)</li>
          <li>Coordination des supports goodies avec le prestataire Pixel Services 97</li>
          <li>Gestion et mise à jour du site lartocarpe.org (Webflow)</li>
          <li>Pool Art Fair (26-28 juin) et préparation de l'événement « Rencontre avec les artistes » du 17 juillet 2026</li>
        </ul>

        <h3>Mes réalisations</h3>
        <p><strong>Projet 01 — Identité visuelle de la GPE Gallery (1 semaine).</strong> Création de l'identité visuelle de la GPE Gallery (The Gallery Project Endeavour), espace d'exposition affilié à L'Artocarpe. Logo conçu sous Adobe Photoshop, avec une charte graphique minimaliste : palette jaune et noir, logotype circulaire. Choix graphiques validés avec Mme Ferly et le président de l'association.</p>
        <p><strong>Projet 02 — Goodies (1 semaine).</strong> Production des supports de communication physiques : t-shirts, tote bags et stylos. Préparation des fichiers prêts à l'impression (format, résolution, zones de marquage), conception des visuels et coordination avec Pixel Services 97. Maquettes validées par Mme Ferly avant envoi au prestataire.</p>
        <p><strong>Projet 03 — Site web et événements (8 jours).</strong> Gestion du site lartocarpe.org sous Webflow : mise à jour des contenus, intégration de nouvelles informations, vérification de la cohérence en français et en anglais. En parallèle, communication autour de la Pool Art Fair et visuels de l'événement « Rencontre avec les artistes » du 17 juillet 2026 au Centre culturel Robert Loyson du Moule. Contenus relus et validés par Mme Ferly.</p>

        <h3>Bilan</h3>
        <p><strong>Technique.</strong> J'ai mobilisé et renforcé Adobe Photoshop pour la création graphique (logo, visuels événementiels), Canva pour la production rapide de contenus réseaux sociaux et de flyers, et Webflow pour la gestion du site. J'ai aussi produit des fichiers print techniques pour un prestataire, ce qui m'a confrontée aux contraintes réelles de la chaîne graphique.</p>
        <p><strong>Humain.</strong> Ce que j'ai le plus apprécié : l'autonomie et le télétravail. J'ai appris à organiser mes journées de façon indépendante, à prendre des initiatives et à rendre compte régulièrement de mon travail. Évoluer dans une petite structure culturelle m'a aussi sensibilisée aux spécificités du milieu associatif : engagement, contraintes budgétaires et importance du réseau international.</p>
        <p><strong>Professionnel.</strong> Ce stage a confirmé mon intérêt pour la communication numérique et le design graphique. Il m'a aussi permis de nuancer mon attrait pour le secteur culturel : si l'environnement artistique est stimulant, je souhaite orienter ma recherche d'alternance vers un secteur plus large, offrant davantage de ressources et de possibilités d'évolution technique.</p>

        <h3>Conclusion &amp; remerciements</h3>
        <p>Ce stage d'un mois a été une première expérience professionnelle structurante. Il m'a permis de renforcer mes compétences en design graphique, gestion de contenu web et coordination numérique, et me laisse une vision enrichie du monde culturel et de ses enjeux numériques, ainsi que la fierté d'avoir contribué au rayonnement d'une association qui porte haut les couleurs de la création artistique guadeloupéenne et caribéenne.</p>
        <p>Je remercie sincèrement Mme Joëlle Ferly pour son accueil, sa confiance et sa bienveillance, Mme Bouchaud, mon enseignante référente à l'IUT de Saint-Claude, pour son accompagnement, ainsi que toute l'équipe de L'Artocarpe et l'IUT de Saint-Claude pour la formation BUT MMI qui m'a donné les outils pour aborder ce stage avec confiance.</p>
      </div>
    `
    },
    projects: {
        title: "My Projects",
        glyph: "icons/IE6.png",
        color: "#c98a2b",
        width: 560,
        height: 500,
        content: buildProjectsWindowContent(),
    },
    contact: {
        title: "Contact Me",
        glyph: "icons/Email.png",
        color: "#3f9b3f",
        width: 340,
        height: 400,
        content: `
      <form class="contact-form" onsubmit="handleContactForm(event, this)">
        <div class="contact-field">
          <label for="c-name">Nom</label>
          <input type="text" id="c-name" name="name" required />
        </div>
        <div class="contact-field">
          <label for="c-email">Email</label>
          <input type="email" id="c-email" name="email" required />
        </div>
        <div class="contact-field">
          <label for="c-message">Message</label>
          <textarea id="c-message" name="message" rows="4" required minlength="10"></textarea>
        </div>
        <div class="contact-status" aria-live="polite"></div>
        <div class="contact-actions">
          <button type="submit" class="btn">Envoyer</button>
        </div>
        <div class="contact-alt">
          Ou écrivez directement à <a href="mailto:neidjah.anicet@gmail.com">neidjah.anicet@gmail.com</a>
        </div>
      </form>
    `
    },
curryvital: {
    title: "My Resume",
    glyph: "icons/Generic Text Document.png",
    color: "#3f9b3f",
    width: 620,
    height: 520,
    content: `
      <div class="resume-toolbar">
        <div class="tb-btn" onclick="document.getElementById('resumeImg').style.width = (document.getElementById('resumeImg').style.width === '150%' ? '100%' : '150%')">
          <img src="icons/Search.png" class="tb-icon" alt=""> Zoom
        </div>
        <a class="tb-btn" href="images/cv-neidjah.png" download="CV_ANICET_Neidjah.png">
          <img src="icons/SDCard.png" class="tb-icon" alt=""> Save
        </a>
        <div class="tb-btn" onclick="openWindow('contact')">
          <img src="icons/Email.png" class="tb-icon" alt=""> Contact Me
        </div>
      </div>
      <div class="resume-scroll">
        <img id="resumeImg" src="pdf/CV_ANICET_Neidjah.png" alt="Mon CV" style="width:100%; display:block; margin:0 auto; transition: width 0.2s;">
      </div>
    `
}
};

// ---------------------------------------------------------------
// Contact form (Formspree AJAX) — used by the "Contact Me" window
// ---------------------------------------------------------------
function handleContactForm(e, form) {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const status = form.querySelector(".contact-status");
    const btn = form.querySelector('button[type="submit"]');
    status.textContent = "";
    status.className = "contact-status";
    btn.disabled = true;
    btn.textContent = "Envoi...";

    fetch("https://formspree.io/f/mykbgjzo", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
    })
        .then((res) => {
            if (res.ok) {
                status.textContent = "Message envoyé ! Merci 👻";
                status.classList.add("success");
                form.reset();
            } else {
                throw new Error("Server error");
            }
        })
        .catch(() => {
            status.textContent = "Oups, une erreur est survenue. Réessayez ou écrivez par email.";
            status.classList.add("error");
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = "Envoyer";
        });
}

const desktopIcons = document.getElementById("icons");
const taskbarItems = document.getElementById("taskbar-items");
const startBtn = document.getElementById("start-btn");
const startMenu = document.getElementById("start-menu");
const desktop = document.getElementById("desktop");

let zCounter = 10;
let openWindows = {}; // id -> { el, taskEl, minimized }
let winCounter = 0;
let offsetCascade = 0;

// Build desktop icons from APPS
Object.entries(APPS).forEach(([id, app]) => {
    const el = document.createElement("div");
    el.className = "icon";
    el.innerHTML = `
    <div class="glyph"><img src="${app.glyph}" class="icon-img" alt=""></div>
    <div class="label">${app.title}</div>
  `;
    el.addEventListener("dblclick", () => openWindow(id));
    el.addEventListener("click", () => openWindow(id)); // single click too, easier on first try
    desktopIcons.appendChild(el);
});

// Builds the File-Explorer-style chrome (menu bar / toolbar / address
// bar / sidebar). The status bar at the bottom uses XP.css's own
// .status-bar / .status-bar-field classes.
function explorerChromeMarkup(app) {
    const sidebar = app.sidebar || "";
    return `
 <div class="explorer-menubar">
      <span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span>
    </div>
    <div class="explorer-toolbar">
      <div class="tb-btn"><img src="icons/Back.png" class="tb-icon" alt=""> Back</div>
      <div class="tb-btn"><img src="icons/Forward.png" class="tb-icon" alt=""> Forward</div>
      <div class="sep"></div>
      <div class="tb-btn" onclick="openWindow('projects')"><img src="icons/IE6.png" class="tb-icon" alt=""> My Projects</div>
      <div class="tb-btn" onclick="openWindow('curryvital')"><img src="icons/Generic Text Document.png" class="tb-icon" alt=""> My Resume</div>
    </div>
    <div class="explorer-addressbar">
      <span class="addr-label">Address</span>
      <div class="addr-field"><img src="${app.glyph}" alt=""> ${app.title} <span class="addr-caret">&#9660;</span></div>
      <div class="go-btn"><img src="icons/Go.png" class="go-icon" alt=""> Go</div>
    </div>
    <div class="explorer-body">
      ${sidebar ? `<div class="explorer-sidebar">${sidebar}</div>` : ""}
      <div class="explorer-main window-body${app.darkContent ? " dark-content" : ""}">${app.content}</div>
    </div>
    <div class="status-bar">
      <p class="status-bar-field">Ready</p>
    </div>
  `;
}
// Builds the XP.css title bar: title-bar / title-bar-text /
// title-bar-controls, with real <button aria-label="..."> controls
// so XP.css renders the minimize/maximize/close glyphs itself.
function titleBarMarkup(app) {
    return `
    <div class="title-bar">
      <div class="title-bar-text"><img src="${app.glyph}" class="title-icon" alt=""> ${app.title}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
  `;
}

function openWindow(appId) {
    const existingId = Object.keys(openWindows).find((k) => k.startsWith(appId + "__"));
    if (existingId) {
        restoreWindow(existingId);
        focusWindow(existingId);
        return;
    }

    const app = APPS[appId];
    const winId = appId + "__" + winCounter++;
    const win = document.createElement("div");
    // "xp-window" handles position/drag/resize behavior (custom),
    // "window" is the XP.css class that draws the actual chrome.
    win.className = "xp-window window";
    win.style.width = app.width + "px";
    win.style.height = app.height + "px";
    win.style.left = 60 + offsetCascade + "px";
    win.style.top = 50 + offsetCascade + "px";
    offsetCascade = (offsetCascade + 28) % 140;
    win.style.zIndex = ++zCounter;

    win.innerHTML = `
    ${titleBarMarkup(app)}
    ${app.explorerChrome ? explorerChromeMarkup(app) : `<div class="window-body">${app.content}</div>`}
    <div class="resize-handle"></div>
  `;
    desktop.appendChild(win);

    const taskEl = document.createElement("div");
    taskEl.className = "task-item active";
    taskEl.innerHTML = `<img src="${app.glyph}" class="task-icon" alt=""> ${app.title}`;
    taskbarItems.appendChild(taskEl);

    openWindows[winId] = { el: win, taskEl, minimized: false };

    // Wire up interactions
    makeDraggable(win, win.querySelector(".title-bar"));
    makeResizable(win, win.querySelector(".resize-handle"));

    win.addEventListener("mousedown", () => focusWindow(winId));
    taskEl.addEventListener("click", () => {
        if (openWindows[winId].minimized) {
            restoreWindow(winId);
        } else if (isActive(winId)) {
            minimizeWindow(winId);
        }
        focusWindow(winId);
    });

    win.querySelector('.title-bar-controls button[aria-label="Minimize"]').addEventListener("click", (e) => {
        e.stopPropagation();
        minimizeWindow(winId);
    });
    win.querySelector('.title-bar-controls button[aria-label="Close"]').addEventListener("click", (e) => {
        e.stopPropagation();
        closeWindow(winId);
    });
    win.querySelector('.title-bar-controls button[aria-label="Maximize"]').addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMaximize(win);
    });

    focusWindow(winId);
}

function isActive(winId) {
    return openWindows[winId].el.classList.contains("active");
}

function focusWindow(winId) {
    Object.entries(openWindows).forEach(([id, w]) => {
        const active = id === winId;
        w.el.classList.toggle("active", active);
        w.taskEl.classList.toggle("active", active);
        // XP.css dims the title bar via the "inactive" class on .title-bar
        w.el.querySelector(".title-bar").classList.toggle("inactive", !active);
    });
    const w = openWindows[winId];
    w.el.style.zIndex = ++zCounter;
}

function minimizeWindow(winId) {
    const w = openWindows[winId];
    w.el.classList.add("minimized");
    w.minimized = true;
    w.el.classList.remove("active");
    w.taskEl.classList.remove("active");
}

function restoreWindow(winId) {
    const w = openWindows[winId];
    w.el.classList.remove("minimized");
    w.minimized = false;
}

function closeWindow(winId) {
    const w = openWindows[winId];
    w.el.remove();
    w.taskEl.remove();
    delete openWindows[winId];
}

function toggleMaximize(win) {
    if (win.dataset.maxed === "1") {
        win.style.width = win.dataset.prevW;
        win.style.height = win.dataset.prevH;
        win.style.left = win.dataset.prevL;
        win.style.top = win.dataset.prevT;
        win.dataset.maxed = "0";
    } else {
        win.dataset.prevW = win.style.width;
        win.dataset.prevH = win.style.height;
        win.dataset.prevL = win.style.left;
        win.dataset.prevT = win.style.top;
        win.style.width = "100%";
        win.style.height = "calc(100vh - 34px)";
        win.style.left = "0px";
        win.style.top = "0px";
        win.dataset.maxed = "1";
    }
}

// ---------------------------------------------------------------
// Drag / resize
// ---------------------------------------------------------------
function makeDraggable(win, handle) {
    let dragging = false,
        startX,
        startY,
        startLeft,
        startTop;
    handle.addEventListener("mousedown", (e) => {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = win.offsetLeft;
        startTop = win.offsetTop;
        e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        win.style.left = startLeft + (e.clientX - startX) + "px";
        win.style.top = Math.max(0, startTop + (e.clientY - startY)) + "px";
    });
    window.addEventListener("mouseup", () => (dragging = false));
}

function makeResizable(win, handle) {
    let resizing = false,
        startX,
        startY,
        startW,
        startH;
    handle.addEventListener("mousedown", (e) => {
        resizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startW = win.offsetWidth;
        startH = win.offsetHeight;
        e.stopPropagation();
        e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
        if (!resizing) return;
        win.style.width = Math.max(220, startW + (e.clientX - startX)) + "px";
        win.style.height = Math.max(140, startH + (e.clientY - startY)) + "px";
    });
    window.addEventListener("mouseup", () => (resizing = false));
}

// ---------------------------------------------------------------
// Start menu + clock
// ---------------------------------------------------------------
startBtn.addEventListener("click", () => {
    startMenu.classList.toggle("open");
    startBtn.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
        startMenu.classList.remove("open");
        startBtn.classList.remove("open");
    }
});

startMenu.querySelectorAll(".sm-item[data-open]").forEach((item) => {
    item.addEventListener("click", () => {
        openWindow(item.dataset.open);
        startMenu.classList.remove("open");
        startBtn.classList.remove("open");
    });
});

// "Fermer la session" sends you back to the login screen, XP-style.
const smLogoff = document.getElementById("sm-logoff");
if (smLogoff) {
    smLogoff.addEventListener("click", () => {
        startMenu.classList.remove("open");
        startBtn.classList.remove("open");
        appShell.classList.remove("visible");
        loginScreen.style.display = "flex";
        loginScreen.classList.remove("fade-out");
        loginFrame.classList.remove("hide");
        welcomeText.classList.remove("show");
        loginCard.style.pointerEvents = "auto";
    });
}

// "Arrêter" is decorative for now — just closes the menu.
const smShutdown = document.getElementById("sm-shutdown");
if (smShutdown) {
    smShutdown.addEventListener("click", () => {
        startMenu.classList.remove("open");
        startBtn.classList.remove("open");
    });
}

function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    document.getElementById("clock").textContent = `${h}:${m} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000 * 10);
