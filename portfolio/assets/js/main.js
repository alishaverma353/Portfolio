// Simple interactivity: mobile nav toggle and current year
(function(){
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav-toggle');
    if(toggle){
        toggle.addEventListener('click', function(){
            if(nav){ nav.classList.toggle('open'); }
        });
    }

    // Enhanced title animation
    var animatedTitle = document.getElementById('animatedTitle');
    if(animatedTitle) {
        // Add entrance animation for the title
        setTimeout(function() {
            animatedTitle.style.opacity = '0';
            animatedTitle.style.transform = 'translateY(20px)';
            animatedTitle.style.transition = 'all 1s ease-out';
            
            setTimeout(function() {
                animatedTitle.style.opacity = '1';
                animatedTitle.style.transform = 'translateY(0)';
            }, 100);
        }, 300);
    }

    // Video controls functionality
    var avatarVideo = document.getElementById('avatarVideo');
    var playPauseBtn = document.getElementById('playPauseBtn');
    var muteBtn = document.getElementById('muteBtn');
    
    if(avatarVideo && playPauseBtn && muteBtn) {
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', function() {
            if(avatarVideo.paused) {
                avatarVideo.play();
                playPauseBtn.innerHTML = '<i class="ri-pause-line"></i>';
            } else {
                avatarVideo.pause();
                playPauseBtn.innerHTML = '<i class="ri-play-line"></i>';
            }
        });
        
        // Mute/Unmute functionality
        muteBtn.addEventListener('click', function() {
            if(avatarVideo.muted) {
                avatarVideo.muted = false;
                muteBtn.innerHTML = '<i class="ri-volume-up-line"></i>';
            } else {
                avatarVideo.muted = true;
                muteBtn.innerHTML = '<i class="ri-volume-mute-line"></i>';
            }
        });
        
        // Update button states based on video state
        avatarVideo.addEventListener('play', function() {
            playPauseBtn.innerHTML = '<i class="ri-pause-line"></i>';
        });
        
        avatarVideo.addEventListener('pause', function() {
            playPauseBtn.innerHTML = '<i class="ri-play-line"></i>';
        });
        
        avatarVideo.addEventListener('volumechange', function() {
            if(avatarVideo.muted) {
                muteBtn.innerHTML = '<i class="ri-volume-mute-line"></i>';
            } else {
                muteBtn.innerHTML = '<i class="ri-volume-up-line"></i>';
            }
        });
        
        // Ensure video starts playing
        avatarVideo.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
        });
    }

    var y = document.getElementById('year');
    if(y){ y.textContent = new Date().getFullYear(); }

    // Close mobile menu when a link is clicked (improves UX on small screens)
    var navLinks = document.querySelectorAll('.nav-list a');
    if(navLinks && nav){
        navLinks.forEach(function(link){
            link.addEventListener('click', function(){
                if(nav.classList.contains('open')){ nav.classList.remove('open'); }
            });
        });
    }

    // Motion One animations (Framer web animations)
    var prefersReduced = false;
    try {
        prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { /* no-op */ }

    var motionLib = window.motion;
    if(!prefersReduced && motionLib){
        var animate = motionLib.animate;
        var inView = motionLib.inView;

        var easeOut = 'cubic-bezier(.22,.65,.2,1)';

        function animateStagger(selectorOrNodes, keyframes, baseDelay, stepDelay, options){
            var nodes = typeof selectorOrNodes === 'string' ? document.querySelectorAll(selectorOrNodes) : selectorOrNodes;
            if(!nodes || !nodes.forEach){ return; }
            nodes.forEach(function(node, i){
                animate(node, keyframes, Object.assign({ duration: 0.6, delay: (baseDelay || 0) + i * (stepDelay || 0), easing: easeOut }, options || {}));
            });
        }

        // Entrance animations on load
        animate('.brand', { opacity: [0, 1], transform: ['translateY(-6px)', 'translateY(0)'] }, { duration: 0.6, delay: 0.1, easing: easeOut });
        animateStagger(document.querySelectorAll('.nav-list li'), { opacity: [0, 1], transform: ['translateY(-6px)', 'translateY(0)'] }, 0.15, 0.06, { duration: 0.5 });

        animate('.hero-title', { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0)'] }, { duration: 0.7, delay: 0.18, easing: easeOut });
        animate('.hero-sub', { opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0)'] }, { duration: 0.6, delay: 0.26, easing: easeOut });
        animateStagger('.cta-row .btn', { opacity: [0, 1], transform: ['translateY(8px)', 'translateY(0)'] }, 0.34, 0.08, { duration: 0.6 });
        animateStagger('.socials a', { opacity: [0, 1], transform: ['translateY(6px)', 'translateY(0)'] }, 0.42, 0.06, { duration: 0.5 });
        animate('.hero-card', { opacity: [0, 1], transform: ['scale(.96)', 'scale(1)'] }, { duration: 0.7, delay: 0.3, easing: easeOut });

        // Avatar glow pulse and lightning flicker
        var ring = document.querySelector('.avatar-ring');
        if(ring){
            animate(ring, { opacity: [0.5, 0.9, 0.5], filter: ['blur(20px)', 'blur(28px)', 'blur(20px)'] }, { duration: 3.2, easing: 'ease-in-out', repeat: Infinity });
        }
        
        // Video avatar animations
        var videoAvatar = document.querySelector('.video-avatar');
        if(videoAvatar) {
            // Subtle breathing animation for the video avatar
            animate(videoAvatar, { transform: ['scale(1)', 'scale(1.02)', 'scale(1)'] }, { duration: 4, easing: 'ease-in-out', repeat: Infinity });
            
            // Glow effect for the video
            animate(videoAvatar, { 
                boxShadow: [
                    '0 0 30px rgba(168, 85, 247, 0.4)',
                    '0 0 40px rgba(168, 85, 247, 0.6)',
                    '0 0 30px rgba(168, 85, 247, 0.4)'
                ]
            }, { duration: 3, easing: 'ease-in-out', repeat: Infinity });
        }
        
        var bolt = document.querySelector('.lightning-bolt');
        if(bolt){
            animate(bolt, { opacity: [0.6, 1, 0.6] }, { duration: 1.8, easing: 'steps(3, end)', repeat: Infinity });
            animate('.lightning', { transform: ['translateY(0)', 'translateY(-6px)', 'translateY(0)'] }, { duration: 2.4, easing: 'ease-in-out', repeat: Infinity });
        }

        // Subtle looping float for the decorative blob
        if(document.querySelector('.hero-blob')){
            animate('.hero-blob', { transform: ['translateY(0px)', 'translateY(10px)', 'translateY(0px)'] }, { duration: 6, easing: 'ease-in-out', repeat: Infinity });
        }

        // In-view reveals for content blocks
        if(inView){
            var revealSelector = [
                '.card', '.skills-card', '.cert-card', '.timeline-card',
                '.metric', '.experience', '.section-title', '.section-lead',
                '.footer-grid > div'
            ].join(',');

            inView(revealSelector, function(entry){
                var el = entry.target;
                if(el && !el.dataset.animated){
                    el.dataset.animated = 'true';
                    animate(el, { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] }, { duration: 0.6, easing: easeOut });
                }
            }, { amount: 0.2 });
        }
    }
})();



// Contact form submission
(function(){
    var form = document.getElementById('contactForm');
    var statusEl = document.getElementById('contactStatus');
    if(!form){ return; }

    function setStatus(text, isError){
        if(!statusEl){ return; }
        statusEl.textContent = text || '';
        statusEl.style.color = isError ? '#ef4444' : '#10b981';
    }

    form.addEventListener('submit', function(e){
        e.preventDefault();
        var submitBtn = form.querySelector('button[type="submit"]');
        if(submitBtn){ submitBtn.disabled = true; }
        setStatus('Sending...', false);

        var payload = {
            name: (form.querySelector('[name="name"]').value || '').trim(),
            email: (form.querySelector('[name="email"]').value || '').trim(),
            message: (form.querySelector('[name="message"]').value || '').trim()
        };

        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(function(res){
            if(!res.ok){ throw new Error('Request failed'); }
            return res.json();
        }).then(function(){
            setStatus('Thanks! I\'ll get back to you soon.', false);
            form.reset();
        }).catch(function(){
            setStatus('Something went wrong. Please try again later.', true);
        }).finally(function(){
            if(submitBtn){ submitBtn.disabled = false; }
        });
    });
})();