document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and effects
    initStarsAnimation();
    initScrollTrigger();
    initMobileMenu();
    initParallaxEffects();
    initProductAnimations();
    initTechShowcase();
    initSmoothScrolling();
    initLandTech3DEffect();
    
    // Stars Animation
    function initStarsAnimation() {
        const starsContainer = document.getElementById('stars-canvas');
        if (!starsContainer) return;
        
        // Create canvas for better performance
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        starsContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Create stars
        const stars = [];
        const starCount = 300;
        
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                opacity: Math.random(),
                pulse: Math.random() * 0.1
            });
        }
        
        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
                
                // Pulse effect
                star.opacity += star.pulse;
                
                if (star.opacity > 1) {
                    star.pulse = -Math.abs(star.pulse);
                } else if (star.opacity < 0.3) {
                    star.pulse = Math.abs(star.pulse);
                }
            });
            
            requestAnimationFrame(drawStars);
        }
        
        drawStars();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Reposition stars
            stars.forEach(star => {
                star.x = Math.random() * canvas.width;
                star.y = Math.random() * canvas.height;
            });
        });
    }
    
    // Initialize ScrollTrigger
    function initScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        const sections = [
            '.feature-section', 
            '.organizations-section', 
            '.gallery-section', 
            '.product-showcase-section', 
            '.cta-section'
        ];
        
        sections.forEach(sectionSelector => {
            const sections = document.querySelectorAll(sectionSelector);
            
            sections.forEach(section => {
                // Find elements with data-parallax attribute
                const parallaxElements = section.querySelectorAll('[data-parallax]');
                
                parallaxElements.forEach(element => {
                    const animation = element.dataset.parallax || 'fade-up';
                    const delay = element.dataset.delay || 0;
                    
                    gsap.from(element, {
                        y: animation.includes('up') ? 50 : 0,
                        x: animation.includes('left') ? -50 : (animation.includes('right') ? 50 : 0),
                        opacity: 0,
                        duration: 0.8,
                        delay: delay / 1000,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "top 50%",
                            toggleActions: "play none none none"
                        }
                    });
                });
                
                // Default animation for sections without specific data-parallax elements
                if (parallaxElements.length === 0) {
                    gsap.from(section.querySelectorAll('.feature-title, .section-title, .feature-description, .section-description, .feature-specs, .organization-logos, .gallery-grid, .detail-columns'), {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "top 50%",
                            toggleActions: "play none none none"
                        }
                    });
                }
            });
        });
       
        // Special animation for Land Technology section
        const landSection = document.querySelector('#land');
        if (landSection) {
            const landCard = landSection.querySelector('.apple-glass-card');
            
            // Initially set the card properties
            gsap.set(landCard, {
                x: 100,
                opacity: 0,
                scale: 0.95
            });
            
            // Create scroll animation
            gsap.to(landCard, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: landSection,
                    start: "top 80%",
                    end: "top 40%",
                    toggleActions: "play none none none",
                    // Uncomment the next line for debugging
                    // markers: true,
                }
            });
            
            // If buildings are already created, animate them too
            const buildings = landSection.querySelector('.landtech-buildings');
            if (buildings) {
                gsap.set(buildings, {
                    x: 150,
                    opacity: 0,
                    scale: 0.8
                });
                
                gsap.to(buildings, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    delay: 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: landSection,
                        start: "top 80%",
                        end: "top 40%",
                        toggleActions: "play none none none"
                    }
                });
            }
        }
        
        // Animate gallery items
        gsap.utils.toArray('.gallery-item').forEach((item, i) => {
            gsap.from(item, {
                y: 100,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    end: "top 70%",
                    toggleActions: "play none none none"
                }
            });
        });
        
        // Animate logo containers
        gsap.utils.toArray('.logo-container').forEach((logo, i) => {
            gsap.from(logo, {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: '.organization-logos',
                    start: "top 80%",
                    end: "top 60%",
                    toggleActions: "play none none none"
                }
            });
        });
    }
    
    // Parallax Effects
    function initParallaxEffects() {
        // For elements with specified parallax speed
        const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Apply parallax to elements with parallax-speed
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallaxSpeed) || 0.1;
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
            
            // Parallax for hero section
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            }
            
            // Parallax for feature media sections
            document.querySelectorAll('.feature-media').forEach(media => {
                const rect = media.getBoundingClientRect();
                const centerY = rect.top + rect.height / 2;
                const distFromCenter = centerY - window.innerHeight / 2;
                
                media.style.transform = `translateY(${distFromCenter * 0.05}px)`;
            });
        });
    }
    
    // Product Visualizations Animation
    function initProductAnimations() {
        // Nava data visualization animation
        animateDataVisualization();
        
        // Chatty chat bubbles animation
        animateChatBubbles();
        
        // Omnitrix network animation
        animateNetworkNodes();
        
        // StarSyync celestial animation
        animateCelestialObjects();
        
        function animateDataVisualization() {
            const dataNodes = document.querySelectorAll('.data-node');
            if (dataNodes.length === 0) return;
            
            // Animate each node with different timing
            dataNodes.forEach((node, index) => {
                gsap.to(node, {
                    y: `-=${20 + index * 5}`,
                    x: `+=${10 - index * 5}`,
                    scale: 1.1,
                    opacity: 0.9,
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: index * 0.2
                });
            });
            
            // Animate connections
            const connections = document.querySelectorAll('.data-connection');
            if (connections.length > 0) {
                gsap.to(connections, {
                    opacity: 0.6,
                    duration: 1.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
        }
        
        function animateChatBubbles() {
            const chatBubbles = document.querySelectorAll('.chat-bubble');
            if (chatBubbles.length === 0) return;
            
            // Animate each bubble with floating effect
            chatBubbles.forEach((bubble, index) => {
                gsap.to(bubble, {
                    y: `-=${15 + index * 7}`,
                    x: index % 2 === 0 ? "+=10" : "-=10",
                    rotation: index % 2 === 0 ? 3 : -3,
                    duration: 2 + index * 0.3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: index * 0.3
                });
            });
            
            // Animate AI core
            const aiCore = document.querySelector('.ai-core');
            if (aiCore) {
                gsap.to(aiCore, {
                    scale: 1.1,
                    opacity: 0.8,
                    duration: 1.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
        }
        
        function animateNetworkNodes() {
            const networkNodes = document.querySelectorAll('.network-node');
            if (networkNodes.length === 0) return;
            
            // Central node pulse
            const centralNode = document.querySelector('.network-node.central');
            if (centralNode) {
                gsap.to(centralNode, {
                    scale: 1.2,
                    boxShadow: "0 0 20px rgba(255, 51, 102, 0.8)",
                    duration: 1.2,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
            
            // Satellite nodes orbit
            const satelliteNodes = document.querySelectorAll('.network-node:not(.central)');
            satelliteNodes.forEach((node, index) => {
                gsap.to(node, {
                    rotation: 360,
                    transformOrigin: "50% 50%",
                    duration: 12 + index * 2,
                    repeat: -1,
                    ease: "none"
                });
                
                // Additional pulse
                gsap.to(node, {
                    scale: 1.1,
                    opacity: 0.9,
                    duration: 1 + index * 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: index * 0.3
                });
            });
            
            // Connections
            const connections = document.querySelectorAll('.network-connection');
            if (connections.length > 0) {
                gsap.to(connections, {
                    opacity: 0.7,
                    duration: 1.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
        }
        
        function animateCelestialObjects() {
            const celestialSphere = document.querySelector('.celestial-sphere');
            if (celestialSphere) {
                gsap.to(celestialSphere, {
                    rotation: 360,
                    transformOrigin: "50% 50%",
                    duration: 120,
                    repeat: -1,
                    ease: "none"
                });
            }
            
            // Planets orbit
            const planets = document.querySelectorAll('.planet');
            planets.forEach((planet, index) => {
                gsap.to(planet, {
                    rotation: 360,
                    transformOrigin: "50% 50%",
                    duration: 20 + index * 10,
                    repeat: -1,
                    ease: "none"
                });
                
                // Planet wobble
                gsap.to(planet, {
                    y: "+=10",
                    x: index % 2 === 0 ? "+=5" : "-=5",
                    duration: 3 + index,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            });
            
            // Stars twinkle
            const stars = document.querySelectorAll('.star');
            stars.forEach((star, index) => {
                gsap.to(star, {
                    opacity: 0.5,
                    scale: 0.8,
                    duration: 1 + Math.random(),
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: index * 0.2
                });
            });
            
            // Constellation rotate
            const constellation = document.querySelector('.constellation');
            if (constellation) {
                gsap.to(constellation, {
                    rotation: 15,
                    duration: 8,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
        }
    }
    
    // Technology Showcase
    function initTechShowcase() {
        const techShowcase = document.querySelector('.tech-showcase-visualization');
        if (!techShowcase) return;
        
        // Animate the central core
        const centralCore = document.querySelector('.tech-central-core');
        if (centralCore) {
            gsap.to(centralCore, {
                rotation: 360,
                transformOrigin: "50% 50%",
                duration: 20,
                repeat: -1,
                ease: "none"
            });
            
            // Pulse effect
            gsap.to(centralCore, {
                scale: 1.1,
                boxShadow: "0 0 30px rgba(0, 255, 140, 0.3)",
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
        }
        
        // Orbital items
        const orbital = document.querySelector('.tech-orbital');
        if (orbital) {
            gsap.to(orbital, {
                rotation: 360,
                transformOrigin: "50% 50%",
                duration: 40,
                repeat: -1,
                ease: "none"
            });
        }
        
        // Individual tech items
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            gsap.to(item, {
                y: "+=15",
                duration: 2 + index,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: index * 0.5
            });
            
            gsap.to(item, {
                rotation: 360,
                transformOrigin: "50% 50%",
                duration: 15 - index * 2,
                repeat: -1,
                ease: "none"
            });
        });
        
        // Framework animation
        const framework = document.querySelector('.tech-framework');
        if (framework) {
            gsap.to(framework, {
                rotation: -360,
                transformOrigin: "50% 50%",
                duration: 60,
                repeat: -1,
                ease: "none"
            });
            
            gsap.to(framework, {
                opacity: 0.5,
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
        }
        
        // Control buttons functionality
        const rotateBtn = document.getElementById('rotate-btn');
        const zoomBtn = document.getElementById('zoom-btn');
        const explodeBtn = document.getElementById('explode-btn');
        
        if (rotateBtn && zoomBtn && explodeBtn) {
            // Rotation control
            rotateBtn.addEventListener('click', () => {
                rotateBtn.classList.toggle('active');
                
                if (rotateBtn.classList.contains('active')) {
                    // Resume rotation
                    gsap.to(orbital, {
                        timeScale: 1,
                        overwrite: true
                    });
                } else {
                    // Pause rotation
                    gsap.to(orbital, {
                        timeScale: 0.1,
                        overwrite: true
                    });
                }
                
                // Reset other buttons
                zoomBtn.classList.remove('active');
                explodeBtn.classList.remove('active');
            });
            
            // Zoom control
            zoomBtn.addEventListener('click', () => {
                zoomBtn.classList.toggle('active');
                
                if (zoomBtn.classList.contains('active')) {
                    // Zoom in
                    gsap.to(techShowcase, {
                        scale: 1.5,
                        duration: 1
                    });
                    
                    // Reset other buttons
                    rotateBtn.classList.remove('active');
                    explodeBtn.classList.remove('active');
                } else {
                    // Zoom out
                    gsap.to(techShowcase, {
                        scale: 1,
                        duration: 1
                    });
                }
            });
            
            // Explode view control
            explodeBtn.addEventListener('click', () => {
                explodeBtn.classList.toggle('active');
                
                if (explodeBtn.classList.contains('active')) {
                    // Explode view
                    gsap.to(techItems, {
                        scale: 1.3,
                        x: (i, target) => {
                            return (i % 3 - 1) * 50;
                        },
                        y: (i, target) => {
                            return (i % 3 - 1) * 50;
                        },
                        duration: 1
                    });
                    
                    // Reset other buttons
                    rotateBtn.classList.remove('active');
                    zoomBtn.classList.remove('active');
                } else {
                    // Reset position
                    gsap.to(techItems, {
                        scale: 1,
                        x: 0,
                        y: 0,
                        duration: 1
                    });
                }
            });
        }
    }
    
    // Mobile Menu
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            // Toggle mobile menu on button click
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
            
            // Close mobile menu when a link is clicked
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.nav-wrapper').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Land Technology 3D Effect
    function initLandTech3DEffect() {
        const landSection = document.querySelector('#land');
        if (!landSection) return;
        
        // Create 3D buildings if they don't exist yet
        if (!landSection.querySelector('.landtech-buildings')) {
            const buildings = document.createElement('div');
            buildings.className = 'landtech-buildings';
            
            const building1 = document.createElement('div');
            building1.className = 'building building-1';
            
            const building2 = document.createElement('div');
            building2.className = 'building building-2';
            
            const building3 = document.createElement('div');
            building3.className = 'building building-3';
            
            const terrainBase = document.createElement('div');
            terrainBase.className = 'terrain-base';
            
            const gridOverlay = document.createElement('div');
            gridOverlay.className = 'grid-overlay';
            
            buildings.appendChild(building1);
            buildings.appendChild(building2);
            buildings.appendChild(building3);
            buildings.appendChild(terrainBase);
            buildings.appendChild(gridOverlay);
            
            // Add buildings to the section (after the card to ensure proper z-index)
            const glassCard = landSection.querySelector('.apple-glass-card');
            if (glassCard) {
                glassCard.parentNode.insertBefore(buildings, glassCard.nextSibling);
            } else {
                landSection.appendChild(buildings);
            }
        }
        
        // Add 3D tilt effect based on mouse position
        const card = landSection.querySelector('.apple-glass-card');
        if (!card) return;
        
        landSection.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return; // Disable on mobile
            
            const rect = landSection.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            // Convert to percentage of section
            const xPercent = (mouseX / rect.width) * 100;
            const yPercent = (mouseY / rect.height) * 100;
            
            // Calculate rotation (max 5 degrees)
            const rotateY = ((xPercent - 50) / 50) * 5; // -5 to +5 degrees
            const rotateX = ((yPercent - 50) / 50) * -5; // +5 to -5 degrees (inverted for correct effect)
            
            // Apply rotation with GSAP for smooth animation
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000,
                transformStyle: "preserve-3d"
            });
            
            // Also rotate the buildings slightly for a more interactive effect
            const buildings = landSection.querySelector('.landtech-buildings');
            if (buildings) {
                gsap.to(buildings, {
                    rotateY: rotateY * 0.5,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
        
        // Reset on mouse leave
        landSection.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: "power2.out"
            });
            
            const buildings = landSection.querySelector('.landtech-buildings');
            if (buildings) {
                gsap.to(buildings, {
                    rotateY: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });
    }
});

function initScrollReveal() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        document.querySelectorAll('.scroll-reveal').forEach(item => {
            item.classList.add('is-visible');
        });
        return;
    }
    
    const landSection = document.querySelector('#land');
    if (landSection) {
        // Add scroll-reveal class to the card if it doesn't have it already
        const landCard = landSection.querySelector('.apple-glass-card');
        if (landCard && !landCard.classList.contains('scroll-reveal')) {
            landCard.classList.add('scroll-reveal', 'from-right');
        }
    }
    
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add visible class
                entry.target.classList.add('is-visible');
                
                // If it's the Land section, add the class to the section too
                if (entry.target.id === 'land') {
                    entry.target.classList.add('is-visible');
                }
                
                // Stop observing the element after it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Element is considered to be in viewport when 10% of it is visible
        threshold: 0.1,
        // Add a root margin to trigger the animation a bit earlier
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe the Land section
    if (landSection) {
        observer.observe(landSection);
    }
    
    // Observe all elements with the scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(element => {
        observer.observe(element);
    });
}

initScrollReveal();

// Add this animation to your animateEcommerceProducts function

function animateEcommerceProducts() {
    // Logo animation
    const navaLogo = document.querySelector('.nava-logo');
    if (navaLogo) {
        gsap.fromTo(navaLogo, 
            { y: 20, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '#nava',
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
        
        // Add subtle floating effect
        gsap.to(navaLogo, {
            y: "-=5",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 1
        });
    }
    
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length === 0) return;
    
    // Animate each product card
    productCards.forEach((card, index) => {
        // Float animation
        gsap.to(card, {
            y: "-=15",
            duration: 2 + index * 0.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: index * 0.3
        });
        
        // Add subtle rotation
        gsap.to(card, {
            rotationY: 5,
            rotationX: 3,
            duration: 3 + index * 0.7,
            yoyo: true, 
            repeat: -1,
            ease: "sine.inOut",
            delay: index * 0.2
        });
        
        // Pulse shadow
        gsap.to(card, {
            boxShadow: "0 20px 40px rgba(0, 113, 227, 0.3)",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: index * 0.4
        });
    });
    
    // Animate featured card separately
    const featuredCard = document.querySelector('.product-card.featured');
    if (featuredCard) {
        gsap.to(featuredCard, {
            scale: 1.05,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }
    
    // Animate trend graph
    const trendGraph = document.querySelector('.trend-graph');
    if (trendGraph) {
        // Create trend line animation
        gsap.fromTo(trendGraph, 
            { backgroundPosition: "0% 100%" },
            {
                backgroundPosition: "100% 0%",
                duration: 8,
                repeat: -1,
                ease: "none"
            }
        );
        
        // Add pulsing effect
        gsap.to(trendGraph, {
            opacity: 0.8,
            duration: 1.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }
}

// Enhanced Animation for Nava Section
function enhanceNavaSection() {
    // Initialize the animation for product cards
    animateNavaProducts();
    
    // Add 3D tilt effect to product cards
    addProductCardTiltEffect();
    
    // Initialize parallax effects
    initNavaParallax();
}

// Animate Product Cards with GSAP
function animateNavaProducts() {
    if (typeof gsap === 'undefined') return;
    
    // Get all product cards in the Nava section
    const productCards = document.querySelectorAll('#nava .product-card');
    if (productCards.length === 0) return;
    
    // Create a timeline for staggered animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#nava',
            start: 'top 70%',
            end: 'center center',
            toggleActions: 'play none none none'
        }
    });
    
    // Initial state - move cards out of view
    gsap.set(productCards, {
        y: 100,
        opacity: 0,
        rotationX: 5,
        rotationY: -5,
        transformPerspective: 1000
    });
    
    // Staggered entry animation
    tl.to(productCards, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    });
    
    // Add floating animation
    productCards.forEach((card, index) => {
        gsap.to(card, {
            y: "-=15",
            rotationX: "+=2",
            rotationY: index % 2 ? "+=3" : "-=3",
            duration: 2 + index * 0.5,
            yoyo: true, 
            repeat: -1,
            ease: "sine.inOut",
            delay: index * 0.2
        });
        
        // Add shadow animation
        gsap.to(card, {
            boxShadow: "0 30px 60px rgba(0, 113, 227, 0.4)",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: index * 0.3
        });
    });
    
    // Animate featured card separately
    const featuredCard = document.querySelector('#nava .product-card.featured');
    if (featuredCard) {
        gsap.to(featuredCard, {
            scale: 1.05,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 1
        });
    }
    
    // Animate trend graph
    const trendGraph = document.querySelector('#nava .trend-graph');
    if (trendGraph) {
        gsap.from(trendGraph, {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '#nava',
                start: 'top 50%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Animate AI Recommendation
    const aiRecommendation = document.querySelector('#nava .ai-recommendation');
    if (aiRecommendation) {
        gsap.from(aiRecommendation, {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
            delay: 1,
            scrollTrigger: {
                trigger: '#nava',
                start: 'top 50%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Animate feature specs
    const specItems = document.querySelectorAll('#nava .spec-item');
    if (specItems.length > 0) {
        gsap.from(specItems, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#nava .feature-specs',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
}

// Simplified hover effect for product cards
function addProductCardTiltEffect() {
    const productCards = document.querySelectorAll('#nava .product-card');
    
    productCards.forEach(card => {
        // Just use CSS hover effects instead of JavaScript transforms
        // This creates a more reliable hover experience
        
        // But we'll add a simple highlight effect on hover
        card.addEventListener('mouseenter', () => {
            // Add a subtle glow effect
            card.style.boxShadow = '0 30px 60px rgba(0, 113, 227, 0.5)';
            
            // Ensure quick-add button is visible
            const quickAddBtn = card.querySelector('.quick-add-btn');
            if (quickAddBtn) {
                quickAddBtn.style.opacity = '1';
                quickAddBtn.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset to default shadow
            card.style.boxShadow = '';
        });
    });
}

// Initialize parallax effects for Nava section
function initNavaParallax() {
    // Apply parallax to elements with parallax-speed attribute
    const parallaxElements = document.querySelectorAll('#nava [data-parallax-speed]');
    
    window.addEventListener('scroll', () => {
        const navaTrigger = document.querySelector('#nava');
        if (!navaTrigger) return;
        
        const rect = navaTrigger.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        
        // Only apply parallax when section is in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallaxSpeed) || 0.1;
                const offset = (rect.top - window.innerHeight) * speed;
                element.style.transform = `translateY(${offset}px)`;
            });
        }
    });
    
    // Apply fade animations for elements with data-parallax attribute
    const fadeElements = document.querySelectorAll('#nava [data-parallax]');
    fadeElements.forEach(element => {
        const animation = element.dataset.parallax || 'fade-up';
        const delay = element.dataset.delay || 0;
        
        // Set initial state
        gsap.set(element, {
            y: animation.includes('up') ? 50 : 0,
            x: animation.includes('left') ? -50 : (animation.includes('right') ? 50 : 0),
            opacity: 0,
        });
        
        // Create scroll animation
        gsap.to(element, {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: delay / 1000,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#nava',
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none none"
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Run after a slight delay to ensure all elements are loaded
    setTimeout(enhanceNavaSection, 100);
    
    // Reinitialize on page resize for responsive adjustments
    window.addEventListener('resize', () => {
        addProductCardTiltEffect();
    });
});

// Add this function to your existing JavaScript file
function initChattySectionEffects() {
    const chattySection = document.querySelector('#chatty');
    if (!chattySection) return;
    
    const chattyImage = chattySection.querySelector('.chatty-flow-image');
    const chattyWrapper = chattySection.querySelector('.chatty-image-wrapper');
    const parallaxElements = chattySection.querySelector('.chatty-parallax-elements');
    
    if (!chattyImage || !chattyWrapper || !parallaxElements) return;
    
    // Add scroll trigger animation for image entry
    gsap.from(chattyWrapper, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '#chatty',
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    // Animate the parallax elements individually
    const circles = chattySection.querySelectorAll('.parallax-circle');
    const lines = chattySection.querySelectorAll('.parallax-line');
    const dots = chattySection.querySelectorAll('.parallax-dot');
    
    gsap.from(circles, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#chatty',
            start: "top 60%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(lines, {
        width: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: '#chatty',
            start: "top 60%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from(dots, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#chatty',
            start: "top 60%",
            toggleActions: "play none none none"
        }
    });
    
    // Parallax effect on mouse move for background elements
    chattySection.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return; // Disable on mobile
        
        const rect = chattySection.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width;
        const mouseY = (e.clientY - rect.top) / rect.height;
        
        // Move parallax elements based on mouse position
        const circles = chattySection.querySelectorAll('.parallax-circle');
        const lines = chattySection.querySelectorAll('.parallax-line');
        const dots = chattySection.querySelectorAll('.parallax-dot');
        
        circles.forEach((circle, index) => {
            const offsetX = (mouseX - 0.5) * 30 * (index + 1);
            const offsetY = (mouseY - 0.5) * 30 * (index + 1);
            
            gsap.to(circle, {
                x: offsetX,
                y: offsetY,
                duration: 1,
                ease: "power2.out"
            });
        });
        
        lines.forEach((line, index) => {
            const offsetX = (mouseX - 0.5) * 20 * (index + 1);
            const offsetY = (mouseY - 0.5) * 20 * (index + 1);
            
            gsap.to(line, {
                x: offsetX,
                y: offsetY,
                duration: 1,
                ease: "power2.out"
            });
        });
        
        dots.forEach((dot, index) => {
            const offsetX = (mouseX - 0.5) * 40 * (index + 1);
            const offsetY = (mouseY - 0.5) * 40 * (index + 1);
            
            gsap.to(dot, {
                x: offsetX,
                y: offsetY,
                duration: 1,
                ease: "power2.out"
            });
        });
    });
    
    // Feature specs animation
    const specItems = chattySection.querySelectorAll('.spec-item');
    gsap.from(specItems, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#chatty .feature-specs',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
}

// Add this to your document.addEventListener('DOMContentLoaded', () => {}) function
document.addEventListener('DOMContentLoaded', () => {
    // Your existing code
    
    // Add this new function call
    initChattySectionEffects();
});


// Complete Omnitrix Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get the Omnitrix section
    const omnitrixSection = document.getElementById('omnitrix');
    if (!omnitrixSection) {
        console.warn('Omnitrix section not found');
        return;
    }
    
    // Get important elements
    const hub = omnitrixSection.querySelector('.omnitrix-hub');
    const connections = omnitrixSection.querySelectorAll('.omnitrix-connection');
    const nodes = omnitrixSection.querySelectorAll('.omnitrix-node');
    const transactionValues = omnitrixSection.querySelectorAll('.transaction-value');
    const statusIndicator = omnitrixSection.querySelector('.status-indicator');
    const statusText = omnitrixSection.querySelector('.status-text');
    const network = omnitrixSection.querySelector('.omnitrix-network');
    
    // Check if we have essential elements
    if (!hub || connections.length === 0 || nodes.length === 0) {
        console.warn('Essential elements missing in Omnitrix visualization');
        return;
    }
    
    // Add hover effect to hub
    hub.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        }
    });
    
    hub.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
    
    // Add click event to hub
    hub.addEventListener('click', function() {
        // Prevent multiple simultaneous animations
        if (this.classList.contains('active')) return;
        
        // Add active class to hub
        this.classList.add('active');
        
        // Update status
        if (statusText) {
            statusText.textContent = "Processing...";
        }
        
        // Process each connection
        connections.forEach((connection, index) => {
            setTimeout(() => {
                // Activate connection
                connection.classList.add('active');
                
                // Create and add active flow particle
                const activeParticle = document.createElement('div');
                activeParticle.className = 'flow-active-particle';
                
                // Set position and transform based on connection index
                switch(index) {
                    case 0: // c1
                        activeParticle.style.transform = 'rotate(-30deg)';
                        break;
                    case 1: // c2
                        activeParticle.style.transform = 'rotate(40deg)';
                        break;
                    case 2: // c3
                        activeParticle.style.transform = 'rotate(210deg)';
                        break;
                    case 3: // c4
                        activeParticle.style.transform = 'rotate(150deg)';
                        break;
                }
                
                // Add animation
                activeParticle.style.animation = `particle-animate-${index} 1s linear forwards`;
                
                // Create keyframe animation dynamically
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes particle-animate-${index} {
                        0% {
                            transform: ${activeParticle.style.transform} translateX(0);
                            opacity: 0.9;
                        }
                        10% {
                            opacity: 0.9;
                        }
                        90% {
                            opacity: 0.9;
                        }
                        100% {
                            transform: ${activeParticle.style.transform} translateX(${index % 2 === 0 ? '200px' : '220px'});
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
                
                // Add particle to network
                network.appendChild(activeParticle);
                
                // After a delay, activate the corresponding node
                setTimeout(() => {
                    if (nodes[index]) {
                        nodes[index].classList.add('active');
                        
                        // Reset node after animation
                        setTimeout(() => {
                            nodes[index].classList.remove('active');
                        }, 1000);
                    }
                    
                    // Reset connection
                    setTimeout(() => {
                        connection.classList.remove('active');
                        
                        // Remove this particle
                        if (activeParticle.parentNode) {
                            activeParticle.parentNode.removeChild(activeParticle);
                        }
                        
                        // Cleanup style
                        if (style.parentNode) {
                            style.parentNode.removeChild(style);
                        }
                    }, 800);
                }, 800);
            }, index * 400); // Stagger the animations
        });
        
        // Update transaction values
        if (transactionValues.length >= 2) {
            // Parse current values
            const sourceValue = parseFloat(transactionValues[0].textContent.replace(/[^0-9.-]+/g, ""));
            const destValue = parseFloat(transactionValues[1].textContent.replace(/[^0-9.-]+/g, ""));
            
            // Generate transfer amount (between $30,000 and $50,000)
            const transferAmount = Math.floor(Math.random() * 20000 + 30000);
            
            // Animate the value changes
            animateValue(transactionValues[0], sourceValue, sourceValue - transferAmount, 1500);
            animateValue(transactionValues[1], destValue, destValue + transferAmount, 1500);
        }
        
        // Update status after animations complete
        setTimeout(() => {
            if (statusIndicator) {
                statusIndicator.classList.add('active');
            }
            
            if (statusText) {
                statusText.textContent = "Detected";
                statusText.classList.add('active');
            }
            
            // Reset hub
            setTimeout(() => {
                this.classList.remove('active');
                
                // Reset status after a delay
                setTimeout(() => {
                    if (statusIndicator) {
                        statusIndicator.classList.remove('active');
                    }
                    
                    if (statusText) {
                        statusText.textContent = "Monitoring";
                        statusText.classList.remove('active');
                    }
                }, 3000);
            }, 1000);
        }, 2500);
    });
    
    // Add mouse tracking functionality
    if (network && hub) {
        network.addEventListener('mousemove', function(e) {
            // Skip if hub is active
            if (hub.classList.contains('active')) return;
            
            // Get mouse position
            const rect = network.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate normalized offsets from center (between -1 and 1)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const offsetX = (x - centerX) / centerX;
            const offsetY = (y - centerY) / centerY;
            
            // Apply subtle movement (max 5px in any direction)
            const moveX = offsetX * 5;
            const moveY = offsetY * 5;
            
            // Move hub with smooth transition
            hub.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            hub.style.transition = 'transform 0.2s ease-out';
        });
        
        // Reset hub position on mouse leave
        network.addEventListener('mouseleave', function() {
            if (!hub.classList.contains('active')) {
                hub.style.transform = 'translate(-50%, -50%)';
            }
        });
    }
    
    // Helper function to animate transaction values
    function animateValue(element, start, end, duration) {
        // Store start time
        const startTime = performance.now();
        
        // Animation function
        function updateValue(timestamp) {
            // Calculate progress
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Apply easing for smoother animation
            const easedProgress = easeOutCubic(progress);
            
            // Calculate current value
            const currentValue = start + (end - start) * easedProgress;
            
            // Format and update element
            element.textContent = '$' + formatNumber(currentValue);
            
            // Highlight changing values
            if (progress > 0 && progress < 1) {
                element.style.color = '#ff6699';
                element.style.textShadow = '0 0 5px rgba(255, 102, 153, 0.5)';
            } else if (progress === 1) {
                element.style.color = '';
                element.style.textShadow = '';
            }
            
            // Continue animation if not complete
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        }
        
        // Start animation
        requestAnimationFrame(updateValue);
    }
    
    // Format number with commas
    function formatNumber(num) {
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Easing function for smoother animation
    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }
});

// StarSyync Celestial Visualization and Interaction
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the section exists
    const starsyyncSection = document.getElementById('starsyync');
    if (!starsyyncSection) return;
    
    // Initialize the StarSyync 3D cosmos
    initStarSyync();
    
    function initStarSyync() {
        // Create container for our 3D cosmos if it doesn't exist yet
        if (!document.querySelector('.cosmos-container')) {
            createCosmosElements();
        }
        
        // Initialize stars, planets and constellations
        createStars();
        createPlanets();
        createConstellations();
        createZodiacRing();
        
        // Apply animations and interactions
        animateCelestialElements();
        initMouseInteractions();
        initControlButtons();
        
        // Initialize GSAP animations for entrance effects
        initGSAPAnimations();
    }
    
    // Create the base cosmos elements
    function createCosmosElements() {
        const featureMedia = starsyyncSection.querySelector('.feature-media');
        if (!featureMedia) return;
        
        // Clear any existing content
        featureMedia.innerHTML = '';
        
        // Create main container
        const cosmosContainer = document.createElement('div');
        cosmosContainer.className = 'cosmos-container';
        
        // Create celestial sphere (main container for 3D elements)
        const celestialSphere = document.createElement('div');
        celestialSphere.className = 'celestial-sphere';
        
        // Create orbital rings
        for (let i = 0; i < 4; i++) {
            const ring = document.createElement('div');
            ring.className = 'orbital-ring';
            celestialSphere.appendChild(ring);
        }
        
        // Create stars field
        const starsField = document.createElement('div');
        starsField.className = 'stars-field';
        
        // Create sun
        const sun = document.createElement('div');
        sun.className = 'celestial-object sun';
        
        // Create feature info panel
        const infoPanel = document.createElement('div');
        infoPanel.className = 'feature-info-panel';
        infoPanel.innerHTML = `
            <h3 class="feature-info-title">StarSyync Celestial Map</h3>
            <p class="feature-info-description">
                Explore the cosmos with our interactive 3D celestial map, combining ancient 
                Vedic astrology with modern technology to deliver personalized cosmic insights.
            </p>
        `;
        
        // Create control buttons
        const controls = document.createElement('div');
        controls.className = 'cosmos-controls';
        controls.innerHTML = `
            <button class="cosmos-control-btn active" data-mode="explore">Explore</button>
            <button class="cosmos-control-btn" data-mode="planets">Planets</button>
            <button class="cosmos-control-btn" data-mode="zodiac">Zodiac</button>
            <button class="cosmos-control-btn" data-mode="alignment">Alignment</button>
        `;
        
        // Put it all together
        celestialSphere.appendChild(starsField);
        celestialSphere.appendChild(sun);
        cosmosContainer.appendChild(celestialSphere);
        cosmosContainer.appendChild(infoPanel);
        
        // Add to feature media
        featureMedia.appendChild(cosmosContainer);
        featureMedia.appendChild(controls);
    }
    
    // Create stars
    function createStars() {
        const starsField = document.querySelector('.stars-field');
        if (!starsField) return;
        
        // Clear any existing stars
        starsField.innerHTML = '';
        
        // Create random stars
        const numStars = 200;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random size between 1-3px
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Random position in 3D space
            const sphereRadius = 600; // larger than our container for depth
            const theta = Math.random() * Math.PI * 2; // around the sphere
            const phi = Math.random() * Math.PI; // up and down the sphere
            
            const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
            const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
            const z = sphereRadius * Math.cos(phi);
            
            star.style.left = `calc(50% + ${x}px)`;
            star.style.top = `calc(50% + ${y}px)`;
            star.style.transform = `translateZ(${z}px)`;
            
            // Random opacity
            star.style.opacity = Math.random() * 0.7 + 0.3;
            
            starsField.appendChild(star);
        }
    }
    
    // Create planets with orbits
    function createPlanets() {
        const celestialSphere = document.querySelector('.celestial-sphere');
        if (!celestialSphere) return;
        
        // Planet data - name, orbit radius, orbit speed
        const planets = [
            { name: 'mercury', radius: 80, speed: 30 },
            { name: 'venus', radius: 110, speed: 40 },
            { name: 'earth', radius: 150, speed: 50 },
            { name: 'mars', radius: 190, speed: 65 },
            { name: 'jupiter', radius: 240, speed: 85 },
            { name: 'saturn', radius: 290, speed: 100 }
        ];
        
        planets.forEach(planetData => {
            // Create planet orbit container
            const orbit = document.createElement('div');
            orbit.className = `planet-orbit ${planetData.name}-orbit`;
            orbit.style.width = `${planetData.radius * 2}px`;
            orbit.style.height = `${planetData.radius * 2}px`;
            orbit.style.marginLeft = `-${planetData.radius}px`;
            orbit.style.marginTop = `-${planetData.radius}px`;
            
            // Create the planet
            const planet = document.createElement('div');
            planet.className = `celestial-object planet ${planetData.name}`;
            
            // Position planet on its orbit
            const angle = Math.random() * Math.PI * 2; // Random starting position
            const x = Math.cos(angle) * planetData.radius;
            const y = Math.sin(angle) * planetData.radius;
            
            planet.style.left = `${planetData.radius + x}px`;
            planet.style.top = `${planetData.radius + y}px`;
            
            // Add Saturn's rings if it's Saturn
            if (planetData.name === 'saturn') {
                const rings = document.createElement('div');
                rings.className = 'saturn-rings';
                planet.appendChild(rings);
            }
            
            // Add data attributes for animation
            orbit.dataset.speed = planetData.speed;
            orbit.dataset.angle = angle;
            
            // Add planet to orbit and orbit to celestial sphere
            orbit.appendChild(planet);
            celestialSphere.appendChild(orbit);
        });
    }
    
    // Create constellations
    function createConstellations() {
        const celestialSphere = document.querySelector('.celestial-sphere');
        if (!celestialSphere) return;
        
        // Define some basic constellations with star points
        const constellations = [
            {
                name: 'orion',
                points: [
                    { x: 150, y: 80, z: 200 },
                    { x: 170, y: 110, z: 200 },
                    { x: 140, y: 130, z: 200 },
                    { x: 130, y: 160, z: 200 },
                    { x: 160, y: 170, z: 200 },
                    { x: 180, y: 150, z: 200 },
                    { x: 190, y: 120, z: 200 }
                ],
                // Connections between points to form lines (indexes in the points array)
                lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [1, 5], [2, 4]]
            },
            {
                name: 'ursa-minor',
                points: [
                    { x: -120, y: -90, z: 180 },
                    { x: -140, y: -110, z: 180 },
                    { x: -160, y: -100, z: 180 },
                    { x: -170, y: -80, z: 180 },
                    { x: -190, y: -70, z: 180 },
                    { x: -180, y: -50, z: 180 },
                    { x: -160, y: -60, z: 180 }
                ],
                lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
            }
        ];
        
        constellations.forEach(constellation => {
            const constElement = document.createElement('div');
            constElement.className = `constellation ${constellation.name}`;
            
            // Create stars for each point
            constellation.points.forEach((point, idx) => {
                const star = document.createElement('div');
                star.className = 'constellation-star';
                star.style.left = `calc(50% + ${point.x}px)`;
                star.style.top = `calc(50% + ${point.y}px)`;
                star.style.transform = `translateZ(${point.z}px)`;
                constElement.appendChild(star);
            });
            
            // Create lines between connected stars
            constellation.lines.forEach(line => {
                const p1 = constellation.points[line[0]];
                const p2 = constellation.points[line[1]];
                
                // Calculate line length and angle
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                const lineElement = document.createElement('div');
                lineElement.className = 'constellation-line';
                lineElement.style.width = `${length}px`;
                lineElement.style.left = `calc(50% + ${p1.x}px)`;
                lineElement.style.top = `calc(50% + ${p1.y}px)`;
                lineElement.style.transform = `rotate(${angle}deg) translateZ(${p1.z}px)`;
                
                constElement.appendChild(lineElement);
            });
            
            celestialSphere.appendChild(constElement);
        });
    }
    
    // Create zodiac ring with signs
    function createZodiacRing() {
        const celestialSphere = document.querySelector('.celestial-sphere');
        if (!celestialSphere) return;
        
        // Create zodiac ring
        const zodiacRing = document.createElement('div');
        zodiacRing.className = 'zodiac-ring';
        
        // Zodiac signs and their symbols
        const zodiacSigns = [
            { name: 'Aries', symbol: '♈', angle: 0 },
            { name: 'Taurus', symbol: '♉', angle: 30 },
            { name: 'Gemini', symbol: '♊', angle: 60 },
            { name: 'Cancer', symbol: '♋', angle: 90 },
            { name: 'Leo', symbol: '♌', angle: 120 },
            { name: 'Virgo', symbol: '♍', angle: 150 },
            { name: 'Libra', symbol: '♎', angle: 180 },
            { name: 'Scorpio', symbol: '♏', angle: 210 },
            { name: 'Sagittarius', symbol: '♐', angle: 240 },
            { name: 'Capricorn', symbol: '♑', angle: 270 },
            { name: 'Aquarius', symbol: '♒', angle: 300 },
            { name: 'Pisces', symbol: '♓', angle: 330 }
        ];
        
        // Place zodiac signs around the ring
        const ringRadius = 275; // Half of the zodiac ring size
        
        zodiacSigns.forEach(sign => {
            const signElement = document.createElement('div');
            signElement.className = 'zodiac-sign';
            signElement.textContent = sign.symbol;
            signElement.dataset.sign = sign.name;
            
            // Position based on angle
            const angle = sign.angle * Math.PI / 180;
            const x = Math.cos(angle) * ringRadius;
            const y = Math.sin(angle) * ringRadius;
            
            signElement.style.left = `calc(50% + ${x}px)`;
            signElement.style.top = `calc(50% + ${y}px)`;
            
            // Add hover event to show zodiac information
            signElement.addEventListener('mouseenter', () => {
                showZodiacInfo(sign.name);
            });
            
            signElement.addEventListener('mouseleave', () => {
                hideZodiacInfo();
            });
            
            zodiacRing.appendChild(signElement);
        });
        
        celestialSphere.appendChild(zodiacRing);
    }
    
    // Animate celestial elements
    function animateCelestialElements() {
        // Get elements
        const celestialSphere = document.querySelector('.celestial-sphere');
        const stars = document.querySelectorAll('.star');
        const planetOrbits = document.querySelectorAll('.planet-orbit');
        const constellations = document.querySelectorAll('.constellation');
        const zodiacRing = document.querySelector('.zodiac-ring');
        
        if (!celestialSphere) return;
        
        // Rotate the entire celestial sphere slowly
        gsap.to(celestialSphere, {
            rotationY: 360,
            duration: 240,
            repeat: -1,
            ease: 'none'
        });
        
        // Add slight wobble to the celestial sphere
        gsap.to(celestialSphere, {
            rotationX: '+=5',
            rotationZ: '+=3',
            duration: 20,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
        
        // Animate stars twinkling
        stars.forEach(star => {
            gsap.to(star, {
                opacity: Math.random() * 0.5 + 0.2,
                duration: 1 + Math.random() * 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
        
        // Animate planets orbiting
        planetOrbits.forEach(orbit => {
            const speed = parseFloat(orbit.dataset.speed) || 50;
            const initialAngle = parseFloat(orbit.dataset.angle) || 0;
            
            // Store initial angle for reference
            orbit.currentAngle = initialAngle;
            
            // Set up animation
            gsap.to(orbit, {
                onUpdate: function() {
                    // Update the orbit's angle
                    orbit.currentAngle += 0.001 * (100 / speed);
                    
                    // Rotate the orbit
                    orbit.style.transform = `rotateZ(${orbit.currentAngle * 180 / Math.PI}deg)`;
                },
                repeat: -1,
                duration: 0.1,
                ease: 'none'
            });
        });
        
        // Animate constellations with slight movement
        constellations.forEach(constellation => {
            gsap.to(constellation, {
                rotationY: '+=10',
                rotationZ: '+=5',
                duration: 30 + Math.random() * 20,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        });
        
        // Animate zodiac ring
        if (zodiacRing) {
            gsap.to(zodiacRing, {
                rotationY: '+=10',
                duration: 60,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        }
        
        // Create and animate magic particles
        createMagicParticles();
    }
    
    // Create and animate magic particles
    function createMagicParticles() {
        const celestialSphere = document.querySelector('.celestial-sphere');
        if (!celestialSphere) return;
        
        const numParticles = 50;
        
        // Create particles
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            
            // Random starting position around the sphere
            const radius = 250 + Math.random() * 100;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi) - 250; // offset for centering
            
            particle.style.left = `calc(50% + ${x}px)`;
            particle.style.top = `calc(50% + ${y}px)`;
            particle.style.transform = `translateZ(${z}px)`;
            
            celestialSphere.appendChild(particle);
            
            // Animate each particle
            gsap.to(particle, {
                opacity: 0.8,
                scale: 2,
                duration: 2 + Math.random() * 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 5
            });
            
            // Move particles in a floating pattern
            gsap.to(particle, {
                x: '+=' + (Math.random() * 100 - 50),
                y: '+=' + (Math.random() * 100 - 50),
                z: '+=' + (Math.random() * 100 - 50),
                duration: 10 + Math.random() * 20,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }
    
    // Initialize mouse interactions with the cosmos
    function initMouseInteractions() {
        const cosmosContainer = document.querySelector('.cosmos-container');
        const celestialSphere = document.querySelector('.celestial-sphere');
        
        if (!cosmosContainer || !celestialSphere) return;
        
        let isDragging = false;
        let prevMouseX = 0;
        let prevMouseY = 0;
        let rotationX = 20; // Initial rotation X
        let rotationY = 0;  // Initial rotation Y
        
        // Touch and mouse event handling
        cosmosContainer.addEventListener('mousedown', startDrag);
        cosmosContainer.addEventListener('touchstart', startDrag, { passive: true });
        
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);
        
        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag, { passive: false });
        
        function startDrag(e) {
            isDragging = true;
            
            // Get current mouse/touch position
            if (e.type === 'touchstart') {
                prevMouseX = e.touches[0].clientX;
                prevMouseY = e.touches[0].clientY;
            } else {
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
            }
            
            // Pause GSAP animations while dragging
            gsap.to(celestialSphere, { timeScale: 0 });
        }
        
        function stopDrag() {
            if (isDragging) {
                isDragging = false;
                
                // Resume GSAP animations
                gsap.to(celestialSphere, { timeScale: 1, duration: 1 });
            }
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            // Prevent default behavior for touch events
            if (e.type === 'touchmove') {
                e.preventDefault();
            }
            
            // Get current position
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            
            // Calculate the difference
            const deltaX = clientX - prevMouseX;
            const deltaY = clientY - prevMouseY;
            
            // Update previous position
            prevMouseX = clientX;
            prevMouseY = clientY;
            
            // Update rotation with limits
            rotationY += deltaX * 0.3;
            rotationX -= deltaY * 0.3;
            
            // Limit vertical rotation to prevent flipping
            rotationX = Math.max(-30, Math.min(60, rotationX));
            
            // Apply rotation with smooth transition
            gsap.to(celestialSphere, {
                rotateX: rotationX,
                rotateY: rotationY,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }
    
    // Initialize control buttons
    function initControlButtons() {
        const controlButtons = document.querySelectorAll('.cosmos-control-btn');
        if (controlButtons.length === 0) return;
        
        controlButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                controlButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Apply the selected mode
                applyCosmosMode(button.dataset.mode);
            });
        });
    }
    
    // Apply different modes to the cosmos visualization
    function applyCosmosMode(mode) {
        const celestialSphere = document.querySelector('.celestial-sphere');
        const zodiacRing = document.querySelector('.zodiac-ring');
        const planetOrbits = document.querySelectorAll('.planet-orbit');
        const constellations = document.querySelectorAll('.constellation');
        
        if (!celestialSphere) return;
        
        // Reset transformations
        gsap.killTweensOf(celestialSphere);
        gsap.to(celestialSphere, {
            rotateX: 20,
            rotateY: 0,
            scale: 1,
            duration: 1.5,
            ease: 'power2.inOut'
        });
        
        // Apply specific modes
        switch(mode) {
            case 'explore':
                // Default mode - everything visible
                if (zodiacRing) zodiacRing.style.opacity = '1';
                planetOrbits.forEach(orbit => {
                    orbit.style.opacity = '1';
                });
                constellations.forEach(constellation => {
                    constellation.style.opacity = '1';
                });
                
                // Update info panel
                updateInfoPanel('StarSyync Celestial Map', 
                    'Explore the cosmos with our interactive 3D celestial map, combining ancient ' +
                    'Vedic astrology with modern technology to deliver personalized cosmic insights.');
                break;
                
            case 'planets':
                // Focus on planets
                if (zodiacRing) zodiacRing.style.opacity = '0.3';
                planetOrbits.forEach(orbit => {
                    orbit.style.opacity = '1';
                });
                constellations.forEach(constellation => {
                    constellation.style.opacity = '0.3';
                });
                
                // Zoom in slightly
                gsap.to(celestialSphere, {
                    scale: 1.2,
                    duration: 1.5,
                    ease: 'power2.inOut'
                });
                
                // Update info panel
                updateInfoPanel('Planetary Influences', 
                    'Each planet\'s position influences different aspects of your life. ' +
                    'StarSyync analyzes these celestial positions to provide insights into your ' +
                    'personality, relationships, career, and life path.');
                break;
                
            case 'zodiac':
                // Focus on zodiac
                if (zodiacRing) zodiacRing.style.opacity = '1';
                planetOrbits.forEach(orbit => {
                    orbit.style.opacity = '0.3';
                });
                constellations.forEach(constellation => {
                    constellation.style.opacity = '0.3';
                });
                
                // Adjust view for zodiac
                gsap.to(celestialSphere, {
                    rotateX: 60,
                    duration: 1.5,
                    ease: 'power2.inOut'
                });
                
                // Update info panel
                updateInfoPanel('Zodiac Signs', 
                    'Your zodiac sign is determined by the position of the Sun at your birth. ' +
                    'StarSyync uses traditional Vedic astrology to calculate your true sidereal ' +
                    'zodiac sign, which may differ from the Western tropical zodiac system.');
                break;
                
            case 'alignment':
                // Show alignment of planets and constellations
                if (zodiacRing) zodiacRing.style.opacity = '0.7';
                planetOrbits.forEach(orbit => {
                    orbit.style.opacity = '0.7';
                });
                constellations.forEach(constellation => {
                    constellation.style.opacity = '0.7';
                });
                
                // Create connection lines
                createAlignmentLines();
                
                // Update info panel
                updateInfoPanel('Cosmic Alignments', 
                    'The alignment of celestial bodies creates unique energy patterns that ' +
                    'influence earthly events. StarSyync analyzes these alignments to ' +
                    'provide timing guidance for important decisions and life events.');
                break;
        }
    }
    
    // Show info for specific zodiac sign
    function showZodiacInfo(signName) {
        updateInfoPanel(signName, getZodiacDescription(signName));
        
        // Make the panel visible
        const infoPanel = document.querySelector('.feature-info-panel');
        if (infoPanel) {
            infoPanel.classList.add('visible');
        }
    }
    
    // Hide zodiac info panel
    function hideZodiacInfo() {
        const infoPanel = document.querySelector('.feature-info-panel');
        if (infoPanel) {
            // Don't hide immediately, add a delay
            setTimeout(() => {
                const activeMode = document.querySelector('.cosmos-control-btn.active');
                if (activeMode) {
                    // Restore the current mode's panel content
                    applyCosmosMode(activeMode.dataset.mode);
                } else {
                    infoPanel.classList.remove('visible');
                }
            }, 300);
        }
    }
    
    // Update info panel content
    function updateInfoPanel(title, description) {
        const panel = document.querySelector('.feature-info-panel');
        if (!panel) return;
        
        // Update content
        panel.innerHTML = `
            <h3 class="feature-info-title">${title}</h3>
            <p class="feature-info-description">${description}</p>
        `;
        
        // Show the panel
        panel.classList.add('visible');
    }
    
    // Get description for each zodiac sign
    function getZodiacDescription(sign) {
        const descriptions = {
            'Aries': 'The first sign of the zodiac, Aries represents new beginnings, courage, and action. Ruled by Mars, Aries individuals are natural leaders with bold and dynamic energy.',
            'Taurus': 'Taurus embodies stability, persistence, and sensuality. Ruled by Venus, those born under this sign value security, comfort, and have a strong connection to the material world.',
            'Gemini': 'Gemini represents duality, communication, and adaptability. Ruled by Mercury, Geminis are quick-witted, curious, and excellent communicators.',
            'Cancer': 'Cancer embodies nurturing, emotional depth, and intuition. Ruled by the Moon, Cancer individuals are deeply connected to home, family, and emotional security.',
            'Leo': 'Leo represents creativity, passion, and leadership. Ruled by the Sun, Leos are natural performers with warm, generous hearts and a flair for the dramatic.',
            'Virgo': 'Virgo embodies analysis, practicality, and service. Ruled by Mercury, Virgos are detail-oriented perfectionists with a methodical approach to life.',
            'Libra': 'Libra represents harmony, justice, and partnerships. Ruled by Venus, Libras seek balance in all things and excel in creating beautiful, harmonious environments.',
            'Scorpio': 'Scorpio embodies transformation, intensity, and power. Ruled by Mars and Pluto, Scorpios have profound emotional depth and regenerative abilities.',
            'Sagittarius': 'Sagittarius represents expansion, philosophy, and adventure. Ruled by Jupiter, Sagittarians are optimistic seekers of truth and worldly experiences.',
            'Capricorn': 'Capricorn embodies ambition, discipline, and mastery. Ruled by Saturn, Capricorns are patient climbers who excel in building lasting structures.',
            'Aquarius': 'Aquarius represents innovation, community, and humanitarianism. Ruled by Saturn and Uranus, Aquarians are visionary thinkers who value freedom and equality.',
            'Pisces': 'Pisces embodies compassion, spirituality, and artistic sensitivity. Ruled by Jupiter and Neptune, Pisceans are empathic dreamers with strong intuitive abilities.'
        };
        
        return descriptions[sign] || 'Information about this zodiac sign will be revealed in your personalized reading.';
    }
    
    // Create celestial alignment lines for the alignment mode
    function createAlignmentLines() {
        // Remove existing alignment lines
        document.querySelectorAll('.alignment-line').forEach(line => line.remove());
        
        const celestialSphere = document.querySelector('.celestial-sphere');
        if (!celestialSphere) return;
        
        // Get positions of planets and major stars
        const planets = document.querySelectorAll('.planet');
        const stars = document.querySelectorAll('.constellation-star');
        
        // Only use a subset of stars for clarity
        const significantStars = Array.from(stars).filter((_, index) => index % 3 === 0);
        
        // Create lines between planets based on astrological significance
        for (let i = 0; i < planets.length; i++) {
            for (let j = i + 1; j < planets.length; j++) {
                // Skip some connections for less clutter
                if (Math.random() > 0.4) continue;
                
                createConnectionLine(planets[i], planets[j], 'planet-connection');
            }
        }
        
        // Create lines between planets and significant stars
        planets.forEach(planet => {
            // Connect each planet to 1-2 significant stars
            const connections = Math.floor(Math.random() * 2) + 1;
            
            for (let i = 0; i < connections; i++) {
                if (significantStars.length > i) {
                    createConnectionLine(planet, significantStars[i], 'star-connection');
                }
            }
        });
        
        // Helper function to create connection line between two elements
        function createConnectionLine(elem1, elem2, className) {
            // Get positions relative to celestial sphere
            const rect1 = elem1.getBoundingClientRect();
            const rect2 = elem2.getBoundingClientRect();
            const sphereRect = celestialSphere.getBoundingClientRect();
            
            // Calculate center points
            const x1 = rect1.left + rect1.width / 2 - sphereRect.left;
            const y1 = rect1.top + rect1.height / 2 - sphereRect.top;
            const x2 = rect2.left + rect2.width / 2 - sphereRect.left;
            const y2 = rect2.top + rect2.height / 2 - sphereRect.top;
            
            // Calculate distance and angle
            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            // Create line element
            const line = document.createElement('div');
            line.className = `alignment-line ${className}`;
            line.style.position = 'absolute';
            line.style.width = `${distance}px`;
            line.style.height = '1px';
            line.style.backgroundColor = 'rgba(153, 102, 255, 0.3)';
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transformOrigin = 'left center';
            line.style.zIndex = '5';
            line.style.opacity = '0';
            
            // Add to celestial sphere
            celestialSphere.appendChild(line);
            
            // Animate line appearance
            gsap.to(line, {
                opacity: 0.6,
                duration: 1,
                ease: 'power2.inOut'
            });
        }
    }
    
    // Initialize GSAP animations for entrance effects
    function initGSAPAnimations() {
        // Make sure GSAP is available
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not found, skipping animations');
            return;
        }
        
        // Get elements
        const cosmosContainer = document.querySelector('.cosmos-container');
        const celestialSphere = document.querySelector('.celestial-sphere');
        const orbitalRings = document.querySelectorAll('.orbital-ring');
        const zodiacRing = document.querySelector('.zodiac-ring');
        const sun = document.querySelector('.sun');
        const planets = document.querySelectorAll('.planet');
        const infoPanel = document.querySelector('.feature-info-panel');
        const controls = document.querySelector('.cosmos-controls');
        
        // Create timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#starsyync',
                start: 'top 70%',
                end: 'center center',
                toggleActions: 'play none none none'
            }
        });
        
        // Initial state
        gsap.set([celestialSphere, orbitalRings, zodiacRing, infoPanel], { opacity: 0 });
        gsap.set(sun, { scale: 0, opacity: 0 });
        gsap.set(planets, { scale: 0, opacity: 0 });
        gsap.set(controls, { y: 30, opacity: 0 });
        
        // Animation sequence
        tl.to(celestialSphere, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            })
            .to(orbitalRings, {
                opacity: 0.5,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5')
            .to(sun, {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            }, '-=0.3')
            .to(planets, {
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: 'back.out(1.7)'
            }, '-=0.5')
            .to(zodiacRing, {
                opacity: 0.8,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.3')
            .to(infoPanel, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5')
            .to(controls, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.6');
        
        // Animate feature specs
        const specItems = document.querySelectorAll('#starsyync .spec-item');
        if (specItems.length > 0) {
            gsap.from(specItems, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#starsyync .feature-specs',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }
    }
}
);


document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and gallery items
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event listener to each filter button
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 100);
          } else {
            if (item.getAttribute('data-category').includes(filterValue)) {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, 100);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
              setTimeout(() => {
                item.style.display = 'none';
              }, 300);
            }
          }
        });
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Technology Expertise Section Animations
    const techSection = document.querySelector('.technology-expertise-section');
    
    if (techSection) {
      // Animate expertise cards on scroll
      const expertiseCards = document.querySelectorAll('.expertise-card');
      
      // Create observer for cards
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Set initial state and observe
      expertiseCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        cardObserver.observe(card);
      });
      
      // Interactive orbital visualization
      const orbitalVisualization = document.querySelector('.tech-orbital');
      
      if (orbitalVisualization) {
        // Add mouse interaction
        orbitalVisualization.addEventListener('mousemove', (e) => {
          const rect = orbitalVisualization.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Calculate mouse position relative to center
          const mouseX = e.clientX - rect.left - centerX;
          const mouseY = e.clientY - rect.top - centerY;
          
          // Calculate rotation angles based on mouse position
          const rotateY = mouseX * 0.1;
          const rotateX = -mouseY * 0.1;
          
          // Apply rotation to orbits
          const orbits = document.querySelectorAll('.orbit');
          orbits.forEach(orbit => {
            orbit.style.transform = `rotateX(${70 + rotateX}deg) rotateY(${rotateY}deg)`;
          });
          
          // Enhance core glow based on mouse proximity
          const centralCore = document.querySelector('.tech-central-core');
          if (centralCore) {
            const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
            const proximity = 1 - Math.min(distance / 200, 1);
            centralCore.style.boxShadow = `0 0 ${30 + proximity * 20}px rgba(0, 255, 140, ${0.5 + proximity * 0.3})`;
          }
        });
        
        // Reset on mouse leave
        orbitalVisualization.addEventListener('mouseleave', () => {
          const orbits = document.querySelectorAll('.orbit');
          orbits.forEach(orbit => {
            orbit.style.transform = '';
          });
          
          const centralCore = document.querySelector('.tech-central-core');
          if (centralCore) {
            centralCore.style.boxShadow = '';
          }
        });
      }
    }
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Add subtle animation to the primary contact method
    const primaryContact = document.querySelector('.primary-contact');
    
    if (primaryContact) {
      // Add hover effect for smoother interaction
      primaryContact.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.25), 0 0 20px rgba(0, 255, 140, 0.25)';
        this.style.borderColor = 'rgba(0, 255, 140, 0.4)';
      });
      
      primaryContact.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.borderColor = '';
      });
      
      // Add click animation for email link
      const emailLink = primaryContact.querySelector('.method-link');
      if (emailLink) {
        emailLink.addEventListener('click', function() {
          // Flash effect on click
          primaryContact.style.backgroundColor = 'rgba(0, 255, 140, 0.15)';
          setTimeout(() => {
            primaryContact.style.backgroundColor = '';
          }, 300);
        });
      }
    }
    
    // Add scroll reveal animation for contact section
    const contactSection = document.querySelector('.contact-section');
    const contactInfo = document.querySelector('.contact-info');
    
    if (contactSection && contactInfo) {
      // Create an intersection observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            contactInfo.style.opacity = '1';
            contactInfo.style.transform = 'translateY(0)';
            
            // Animate contact methods sequentially
            const contactMethods = document.querySelectorAll('.contact-method');
            contactMethods.forEach((method, index) => {
              setTimeout(() => {
                method.style.opacity = '1';
                method.style.transform = 'translateY(0)';
              }, 200 + (index * 150));
            });
            
            // Stop observing after animation
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2
      });
      
      // Set initial state
      contactInfo.style.opacity = '0';
      contactInfo.style.transform = 'translateY(30px)';
      contactInfo.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      // Set initial state for contact methods
      const contactMethods = document.querySelectorAll('.contact-method');
      contactMethods.forEach(method => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(30px)';
        method.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });
      
      // Start observing
      observer.observe(contactSection);
    }
  });