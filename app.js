// DYNAMIC TYPING STRING DATA MATRIX
const professionalRoles = [
    "Frontend Web Developer",
    "UI / UX Design Specialist",
    "Custom Landing Page Expert",
    "Clean Code Architect"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const targetElement = document.getElementById("typing-text");

function executeTypingEngine() {
    const currentString = professionalRoles[roleIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    targetElement.textContent = currentString.substring(0, charIndex);

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentString.length) {
        typingSpeed = 2000; // Pause at full string execution
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % professionalRoles.length;
        typingSpeed = 400; // Pause prior to beginning new configuration
    }

    setTimeout(executeTypingEngine, typingSpeed);
}

// SCROLL ANIMATION SYSTEM (INTERSECTION OBSERVER)
function initializeScrollAnimations() {
    const animatableElements = document.querySelectorAll('.scroll-animate');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Unobserve if you only want the animation to happen once
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.08, // triggers when 8% of the element is visible
        rootMargin: "0px 0px -40px 0px" // subtle bottom margin delay for natural look
    });

    animatableElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// THEME TOGGLE CONTROL HUB
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// ACCORDION INTERACTIVE ACTIONS
function toggleAccordion(index) {
    const currentContent = document.getElementById(`faq-content-${index}`);
    const currentIcon = document.getElementById(`faq-icon-${index}`);
    
    if (currentContent.style.maxHeight && currentContent.style.maxHeight !== '0px') {
        currentContent.style.maxHeight = '0px';
        currentContent.style.opacity = '0';
        currentIcon.style.transform = 'rotate(0deg)';
    } else {
        // Clear open states across other containers first
        document.querySelectorAll('.faq-collapse').forEach(item => {
            item.style.maxHeight = '0px';
            item.style.opacity = '0';
        });
        document.querySelectorAll('[id^="faq-icon-"]').forEach(icon => {
            icon.style.transform = 'rotate(0deg)';
        });

        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
        currentContent.style.opacity = '1';
        currentIcon.style.transform = 'rotate(180deg)';
    }
}

// ABSTRACT CANVAS PARTICLE BACKGROUND ENVIRONMENT
const interactiveCanvas = document.getElementById("interactive-canvas");
const canvasContext = interactiveCanvas.getContext("2d");
let networkNodes = [];

function adjustCanvasLayoutSize() {
    interactiveCanvas.width = window.innerWidth;
    interactiveCanvas.height = window.innerHeight;
}

class SystemNode {
    constructor() {
        this.resetNodePosition();
    }
    resetNodePosition() {
        this.horizontalX = Math.random() * interactiveCanvas.width;
        this.verticalY = Math.random() * interactiveCanvas.height;
        this.deltaX = (Math.random() - 0.5) * 0.35;
        this.deltaY = (Math.random() - 0.5) * 0.35;
        this.dimensionRadius = Math.random() * 1.5 + 0.5;
    }
    updateVector() {
        this.horizontalX += this.deltaX;
        this.verticalY += this.deltaY;

        if (this.horizontalX < 0 || this.horizontalX > interactiveCanvas.width) this.deltaX *= -1;
        if (this.verticalY < 0 || this.verticalY > interactiveCanvas.height) this.deltaY *= -1;
    }
    renderVectorGraphic() {
        canvasContext.beginPath();
        canvasContext.arc(this.horizontalX, this.verticalY, this.dimensionRadius, 0, Math.PI * 2);
        canvasContext.fillStyle = document.documentElement.classList.contains('dark') ? "rgba(99, 102, 241, 0.15)" : "rgba(79, 70, 229, 0.08)";
        canvasContext.fill();
    }
}

function constructNetworkTopology() {
    networkNodes = [];
    const totalNodesCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    for (let i = 0; i < totalNodesCount; i++) {
        networkNodes.push(new SystemNode());
    }
}

function executionRenderLoop() {
    canvasContext.clearRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);
    
    for (let i = 0; i < networkNodes.length; i++) {
        networkNodes[i].updateVector();
        networkNodes[i].renderVectorGraphic();

        for (let j = i + 1; j < networkNodes.length; j++) {
            const horizontalDistance = networkNodes[i].horizontalX - networkNodes[j].horizontalX;
            const verticalDistance = networkNodes[i].verticalY - networkNodes[j].verticalY;
            const linkDistanceMetric = Math.sqrt(horizontalDistance * horizontalDistance + verticalDistance * verticalDistance);

            if (linkDistanceMetric < 110) {
                canvasContext.beginPath();
                canvasContext.moveTo(networkNodes[i].horizontalX, networkNodes[i].verticalY);
                canvasContext.lineTo(networkNodes[j].horizontalX, networkNodes[j].verticalY);
                const alphaWeight = (1 - (linkDistanceMetric / 110)) * 0.07;
                canvasContext.strokeStyle = document.documentElement.classList.contains('dark') ? `rgba(99, 102, 241, ${alphaWeight})` : `rgba(79, 70, 229, ${alphaWeight})`;
                canvasContext.lineWidth = 0.5;
                canvasContext.stroke();
            }
        }
    }
    requestAnimationFrame(executionRenderLoop);
}

// SYSTEM APP ENGAGEMENT TRIGGER
window.addEventListener("DOMContentLoaded", () => {
    // Check local preferences for light/dark configurations
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    setTimeout(executeTypingEngine, 600);
    initializeScrollAnimations();
    adjustCanvasLayoutSize();
    constructNetworkTopology();
    executionRenderLoop();
});

window.addEventListener("resize", () => {
    adjustCanvasLayoutSize();
    constructNetworkTopology();
});
