/**
 * Juan Vazquez - Portfolio JavaScript
 * Interactivity: Accordions, Theme Toggling, Copy-to-clipboard, Scrollspy
 */

document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initCopyToClipboard();
    initScrollspy();
    initSmoothScroll();
});

/**
 * 1. Experience Accordion Toggle
 * inspired by aalexis.fr style
 */
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Automatically open the first experience item on page load for better visual engagement
    if (accordionHeaders.length > 0) {
        const firstItem = accordionHeaders[0].closest('.accordion-item');
        const firstCollapse = firstItem.querySelector('.accordion-collapse');
        firstItem.classList.add('active');
        accordionHeaders[0].setAttribute('aria-expanded', 'true');
        // Delay slightly to allow layout calculation
        setTimeout(() => {
            firstCollapse.style.maxHeight = firstCollapse.scrollHeight + 'px';
        }, 100);
    }

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const collapse = item.querySelector('.accordion-collapse');
            const isActive = item.classList.contains('active');
            
            // Collapse all other items (Single-expansion accordion behavior)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.accordion-collapse').style.maxHeight = '0';
                }
            });
            
            // Toggle clicked item
            if (isActive) {
                item.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
                collapse.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                collapse.style.maxHeight = collapse.scrollHeight + 'px';
            }
        });
    });

    // Handle window resize to recalculate height of active accordion
    window.addEventListener('resize', () => {
        const activeCollapse = document.querySelector('.accordion-item.active .accordion-collapse');
        if (activeCollapse) {
            activeCollapse.style.maxHeight = activeCollapse.scrollHeight + 'px';
        }
    });
}

// Theme toggle removed - permanent dark mode active

/**
 * 3. Copy Contact Info to Clipboard
 */
function initCopyToClipboard() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        const copyVal = card.getAttribute('data-copy');
        const copyBtn = card.querySelector('.btn-copy');
        const tooltip = card.querySelector('.tooltip');
        
        card.addEventListener('click', () => {
            navigator.clipboard.writeText(copyVal).then(() => {
                // visual feedback
                copyBtn.classList.add('copied');
                tooltip.textContent = '¡Copiado!';
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
                
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    tooltip.textContent = 'Copiar';
                    tooltip.style.opacity = '';
                    tooltip.style.transform = '';
                }, 2000);
            }).catch(err => {
                console.error('No se pudo copiar el texto: ', err);
            });
        });
    });
}

/**
 * 4. Active Section Highlight in the Floating Dock (Scrollspy)
 */
function initScrollspy() {
    const sections = document.querySelectorAll('section[id], header.header-section');
    const dockItems = document.querySelectorAll('.dock-item:not(.theme-toggle)');
    const dock = document.querySelector('.floating-dock');
    
    function changeActiveDockItem() {
        let scrollPosition = window.scrollY + 150; // offset
        let currentSectionId = '#';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (section.tagName === 'HEADER') {
                    currentSectionId = '#';
                } else {
                    currentSectionId = '#' + section.getAttribute('id');
                }
            }
        });
        
        dockItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentSectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Control floating dock visibility based on scroll position
        if (window.scrollY > 80) {
            dock.classList.add('visible');
        } else {
            dock.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', changeActiveDockItem);
    // run once initially
    changeActiveDockItem();
}

/**
 * 5. Smooth scrolling for anchors
 */
function initSmoothScroll() {
    const dockLinks = document.querySelectorAll('.dock-item:not(.theme-toggle)');
    
    dockLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetPosition = targetElement.offsetTop - 40; // visual buffer
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
