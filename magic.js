// Magic.js - Valentine's Day Special Effects

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarEffect();
    initMobileMenu();
});

// ==================== //
// Mobile Menu Toggle   //
// ==================== //

function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    if (!hamburgerBtn || !sidebarMenu) return;
    
    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', () => {
        toggleMobileMenu();
    });
    
    // Close menu on overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            closeMobileMenu();
        });
    }
    
    // Close menu on close button click
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            closeMobileMenu();
        });
    }
    
    // Close menu when clicking a link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    hamburgerBtn.classList.toggle('active');
    sidebarMenu.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = sidebarMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    hamburgerBtn.classList.remove('active');
    sidebarMenu.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Create Floating Hearts
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    
    const hearts = ['💚', '🍀', '💚', '🌿', '💚', '✨'];
    const numHearts = 15;
    
    for (let i = 0; i < numHearts; i++) {
        setTimeout(() => {
            createHeart(container, hearts);
        }, i * 500);
    }
    
    // Continuously create new hearts
    setInterval(() => {
        createHeart(container, hearts);
    }, 2000);
}

function createHeart(container, hearts) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 12000);
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations - Fade in elements when they come into view
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section > .container');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
}

// Navbar Effect - Change on scroll
function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-lg');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    });
}

// Add sparkle effect on click
document.addEventListener('click', function(e) {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkles = ['✨', '💚', '⭐'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('span');
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.fontSize = '20px';
        sparkle.style.transition = 'all 0.8s ease-out';
        
        document.body.appendChild(sparkle);
        
        // Random direction
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = Math.random() * 80 + 40;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        setTimeout(() => {
            sparkle.style.left = endX + 'px';
            sparkle.style.top = endY + 'px';
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0)';
        }, 10);
        
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// Typewriter effect for special messages (optional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Countdown to Valentine's Day (if before Feb 14)
function updateCountdown() {
    const valentinesDay = new Date('February 14, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = valentinesDay - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m`;
        }
    }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown();

console.log('💚 Made with love for someone special 💚');

// ==================== //
// Memory Game Logic    //
// ==================== //

// Image configuration - Your images from the img folder
const memoryGameImages = [
    { id: 1, src: 'img/Atenas.jpg', emoji: '💚' },
    { id: 2, src: 'img/Cueca.jpg', emoji: '💑' },
    { id: 3, src: 'img/Gordon.jpg', emoji: '🌹' },
    { id: 4, src: 'img/Perla.jpg', emoji: '💋' },
    { id: 5, src: 'img/Poppy.jpg', emoji: '🥰' },
    { id: 6, src: 'img/Puppe.jpg', emoji: '✨' }
];

// Set to true to use your images
const USE_IMAGES = true;

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

function initMemoryGame() {
    const gameBoard = document.getElementById('memory-game');
    if (!gameBoard) return;
    
    // Create pairs of cards
    memoryCards = [...memoryGameImages, ...memoryGameImages]
        .map((card, index) => ({ ...card, uniqueId: index }))
        .sort(() => Math.random() - 0.5);
    
    renderCards(gameBoard);
    
    // Reset button
    const resetBtn = document.getElementById('reset-game');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }
}

function renderCards(gameBoard) {
    gameBoard.innerHTML = '';
    
    memoryCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.id = card.id;
        cardElement.dataset.uniqueId = card.uniqueId;
        
        cardElement.innerHTML = `
            <div class="card-face card-front">
                ${USE_IMAGES 
                    ? `<img src="${card.src}" alt="Memory card ${card.id}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><span class="card-emoji" style="display:none;">${card.emoji}</span>`
                    : `<span class="card-emoji">${card.emoji}</span>`
                }
            </div>
            <div class="card-face card-back"></div>
        `;
        
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(card) {
    if (!canFlip) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        updateMoves();
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.id === card2.dataset.id;
    
    if (isMatch) {
        handleMatch();
    } else {
        handleMismatch();
    }
}

function handleMatch() {
    flippedCards.forEach(card => {
        card.classList.add('matched');
    });
    
    matchedPairs++;
    updatePairs();
    flippedCards = [];
    
    // Check for win
    if (matchedPairs === 6) {
        setTimeout(showWinMessage, 500);
    }
}

function handleMismatch() {
    canFlip = false;
    
    setTimeout(() => {
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
        });
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

function updateMoves() {
    const movesElement = document.getElementById('moves-count');
    if (movesElement) {
        movesElement.textContent = moves;
    }
}

function updatePairs() {
    const pairsElement = document.getElementById('pairs-count');
    if (pairsElement) {
        pairsElement.textContent = matchedPairs;
    }
}

function showWinMessage() {
    const winMessage = document.getElementById('win-message');
    const finalMoves = document.getElementById('final-moves');
    
    if (winMessage && finalMoves) {
        finalMoves.textContent = moves;
        winMessage.classList.remove('hidden');
        
        // Create celebration sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkle(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 100);
        }
    }
}

function resetGame() {
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    canFlip = true;
    
    updateMoves();
    updatePairs();
    
    const winMessage = document.getElementById('win-message');
    if (winMessage) {
        winMessage.classList.add('hidden');
    }
    
    // Reshuffle and re-render
    memoryCards = memoryCards.sort(() => Math.random() - 0.5);
    const gameBoard = document.getElementById('memory-game');
    if (gameBoard) {
        renderCards(gameBoard);
    }
}

// Initialize memory game when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initMemoryGame();
});