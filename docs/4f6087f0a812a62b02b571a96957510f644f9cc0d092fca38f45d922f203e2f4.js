/* dar hide nos botoes de copied! do shiki quando der load na página */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.u-mdic-copy-notify').forEach(notify => {
        notify.style.display = 'none';
    });

    document.querySelectorAll('.m-mdic-copy-wrapper').forEach((wrapper,index) => {
        const button = wrapper.querySelector('.u-mdic-copy-btn');
        const notify = wrapper.querySelector('.u-mdic-copy-notify');

        if (!button || !notify) return;

        const observer = new MutationObserver(() => {
            const copied = notify.style.display !== 'none';

            button.classList.toggle('is-copied', copied);
            button.textContent  = copied ? 'Copied ✅' : 'Copy';
        });

        observer.observe(notify, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    });
});

const STORAGE_KEY = 'sidebar_open_items';

function salvarEstadoSidebar() {
    const abertos = [];
    document.querySelectorAll('.sidebar-item.has-submenu').forEach(li => {
        const submenu = li.querySelector('.submenu');
        const page = li.getAttribute('data-page');
        if (page && submenu && submenu.style.display === 'block') {
            abertos.push(page);
        }
    });
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(abertos));
}

function toggleSubmenu(event, headerElement) {
    event.preventDefault();
    const parentLi = headerElement.parentElement;
    const submenu = parentLi.querySelector('.submenu');
    
    if (submenu) {
        if (submenu.style.display === 'none' || !submenu.style.display) {
            submenu.style.display = 'block';
            parentLi.classList.add('open');
        } else {
            submenu.style.display = 'none';
            parentLi.classList.remove('open');
        }
        salvarEstadoSidebar();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    if (isIndex) {
        sessionStorage.removeItem(STORAGE_KEY);
        salvarEstadoSidebar();
    } else {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                const abertos = JSON.parse(raw);
                document.querySelectorAll('.sidebar-item.has-submenu').forEach(li => {
                    const page = li.getAttribute('data-page');
                    const submenu = li.querySelector('.submenu');
                    const isActive = li.querySelector('.active-page') !== null;
                    if (submenu && page) {
                        if (abertos.includes(page) || isActive) {
                            submenu.style.display = 'block';
                            li.classList.add('open');
                        } else {
                            submenu.style.display = 'none';
                            li.classList.remove('open');
                        }
                    }
                });
            } catch (e) {}
        }
        salvarEstadoSidebar();
    }

    // Scrollspy / Destaque da seção ativa da página atual
    const currentActiveLi = document.querySelector('.sidebar-item:has(.active-page)');
    const currentSubmenu = currentActiveLi ? currentActiveLi.querySelector('.submenu') : null;
    const sectionLinks = currentSubmenu ? Array.from(currentSubmenu.querySelectorAll('a')) : [];

    function updateActiveSection() {
        if (!currentSubmenu || currentSubmenu.style.display === 'none' || sectionLinks.length === 0) {
            return;
        }

        const headings = [];
        sectionLinks.forEach(link => {
            const hash = link.getAttribute('href').split('#')[1];
            if (hash) {
                const el = document.getElementById(hash);
                if (el) headings.push({ el, link });
            }
        });

        if (headings.length === 0) return;

        const scrollPos = window.scrollY + 100;
        let currentHeading = headings[0];

        for (let i = 0; i < headings.length; i++) {
            if (headings[i].el.offsetTop <= scrollPos) {
                currentHeading = headings[i];
            } else {
                break;
            }
        }

        sectionLinks.forEach(link => link.classList.remove('active-section'));
        if (currentHeading) {
            currentHeading.link.classList.add('active-section');
        }
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('hashchange', updateActiveSection);
    updateActiveSection();
});

const SIDEBAR_COLLAPSED_KEY = 'sidebar_collapsed';

function salvarEstadoSidebarCollapsed(isClosed) {
    try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, isClosed ? 'true' : 'false');
    } catch (e) {}
}

function carregarEstadoSidebarCollapsed() {
    try {
        return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true';
    } catch (e) {
        return false;
    }
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    const sidebar = document.querySelector("aside.sidebar");
    if (sidebar) {
        sidebar.classList.remove('closed');
        salvarEstadoSidebarCollapsed(false);
    }
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    const sidebar = document.querySelector("aside.sidebar");
    if (sidebar) {
        sidebar.classList.add('closed');
        salvarEstadoSidebarCollapsed(true);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('aside.sidebar');
    const toggle = document.querySelector('.sidebar-toggle');

    if (sidebar) {
        if (carregarEstadoSidebarCollapsed()) {
            sidebar.classList.add('closed');
        } else {
            sidebar.classList.remove('closed');
        }
        document.documentElement.classList.remove('sidebar-collapsed-init');

        if (toggle) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('closed');
                salvarEstadoSidebarCollapsed(sidebar.classList.contains('closed'));
            });
        }
    }

    // Collapsible Header (Hide on scroll down, show on scroll up)
    const header = document.getElementById('collapsible-header');
    if (header) {
        let lastScrollY = window.scrollY;
        const scrollThreshold = 10;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Se rolou para baixo além do threshold, oculta o header
            if (currentScrollY > lastScrollY && currentScrollY > 60) {
                header.classList.add('header-hidden');
                document.documentElement.classList.add('header-hidden');
            } else if (currentScrollY < lastScrollY || currentScrollY <= 60) {
                // Se rolou para cima ou está no topo, mostra o header
                header.classList.remove('header-hidden');
                document.documentElement.classList.remove('header-hidden');
            }

            lastScrollY = Math.max(0, currentScrollY);
        }, { passive: true });
    }

    // Progresso de Leitura do Livro (Páginas e Seções)
    const progressBar = document.getElementById('reading-progress-bar');
    if (progressBar) {
        function obterMetadadosProgresso(element) {
            return {
                pageIndex: parseFloat(element.getAttribute('data-page-index') || '0'),
                totalPages: Math.max(parseFloat(element.getAttribute('data-total-pages') || '1'), 1),
                sectionOffset: parseFloat(element.getAttribute('data-section-offset') || '0'),
                sectionCount: Math.max(parseFloat(element.getAttribute('data-section-count') || '1'), 1),
                totalSections: Math.max(parseFloat(element.getAttribute('data-total-sections') || '1'), 1)
            };
        }

        const progressMeta = obterMetadadosProgresso(progressBar);
        const headings = Array.from(document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6'));

        function updateReadingProgress() {
            const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const clientHeight = window.innerHeight || document.documentElement.clientHeight;
            const maxScroll = Math.max(scrollHeight - clientHeight, 1);

            let pageProgress = 0;

            if (scrollY >= maxScroll - 5) {
                // Fim da página atual
                pageProgress = 1;
            } else if (headings.length > 0) {
                // Progresso baseado nas seções da página atual
                const scrollPos = scrollY + 100;
                let activeIndex = 0;

                for (let i = 0; i < headings.length; i++) {
                    if (headings[i].offsetTop <= scrollPos) {
                        activeIndex = i;
                    } else {
                        break;
                    }
                }

                const currentHeadingTop = headings[activeIndex].offsetTop;
                const nextHeadingTop = (activeIndex + 1 < headings.length)
                    ? headings[activeIndex + 1].offsetTop
                    : scrollHeight;

                const sectionHeight = Math.max(nextHeadingTop - currentHeadingTop, 1);
                const progressInSection = Math.min(Math.max((scrollPos - currentHeadingTop) / sectionHeight, 0), 1);

                pageProgress = (activeIndex + progressInSection) / headings.length;
            } else {
                pageProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
            }

            pageProgress = Math.min(Math.max(pageProgress, 0), 1);

            // Progresso acumulado no livro utilizando o dicionário progressMeta
            const globalProgress = (progressMeta.sectionOffset + (pageProgress * progressMeta.sectionCount)) / progressMeta.totalSections;
            const percentage = Math.min(Math.max(globalProgress * 100, 0), 100);

            progressBar.style.width = `${percentage}%`;
            progressBar.setAttribute('aria-valuenow', Math.round(percentage));
            progressBar.setAttribute('title', `Progresso do livro: ${Math.round(percentage)}%`);
        }

        window.addEventListener('scroll', updateReadingProgress, { passive: true });
        window.addEventListener('resize', updateReadingProgress);
        updateReadingProgress();
    }

    // Navegação via teclado (Setas Esquerda / Direita) estilo Rust Book
    document.addEventListener('keydown', (event) => {
        if (event.defaultPrevented) return;
        const tag = event.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target.isContentEditable) {
            return;
        }

        if (event.key === 'ArrowLeft') {
            const prevBtn = document.querySelector('.nav-chapters.previous');
            if (prevBtn && prevBtn.href) {
                window.location.href = prevBtn.href;
            }
        } else if (event.key === 'ArrowRight') {
            const nextBtn = document.querySelector('.nav-chapters.next');
            if (nextBtn && nextBtn.href) {
                window.location.href = nextBtn.href;
            }
        }
    });
});

