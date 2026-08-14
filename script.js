/* =========================================================
   PT PRATAMA DIGITAL AGENCY
   VANILLA JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const body = document.body;
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    const scrollProgress = document.getElementById("scrollProgress");
    const backTop = document.getElementById("backTop");
    const cursorGlow = document.getElementById("cursorGlow");
    const preloader = document.getElementById("preloader");



    /* =====================================================
       PRELOADER
       ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 500);

    });



    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function openMenu() {

        menuToggle.classList.add("active");
        mobileNav.classList.add("active");
        body.classList.add("menu-open");

        menuToggle.setAttribute("aria-label", "Tutup menu");

    }


    function closeMenu() {

        menuToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-label", "Buka menu");

    }


    menuToggle.addEventListener("click", () => {

        if (mobileNav.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });



    /* =====================================================
       HEADER ON SCROLL
       ===================================================== */

    function updateHeader() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );



    /* =====================================================
       SCROLL PROGRESS
       ===================================================== */

    function updateScrollProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (documentHeight <= 0) {
            scrollProgress.style.width = "0%";
            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width =
            `${Math.min(progress, 100)}%`;

    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();



    /* =====================================================
       BACK TO TOP
       ===================================================== */

    function updateBackTop() {

        if (window.scrollY > 600) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    }

    window.addEventListener(
        "scroll",
        updateBackTop,
        { passive: true }
    );


    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });



    /* =====================================================
       REVEAL ON SCROLL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });



    /* =====================================================
       COUNTER
       ===================================================== */

    const counterElements =
        document.querySelectorAll("[data-counter]");


    function animateCounter(element) {

        const target =
            Number(element.dataset.counter);

        const suffix =
            element.dataset.suffix || "";

        const duration = 1700;

        let startTime = null;


        function updateCounter(timestamp) {

            if (!startTime) {
                startTime = timestamp;
            }

            const elapsed =
                timestamp - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /*
             * Smooth easing
             */
            const eased =
                1 - Math.pow(1 - progress, 4);


            const current =
                Math.floor(target * eased);


            element.textContent =
                current.toLocaleString("id-ID") + suffix;


            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent =
                    target.toLocaleString("id-ID") + suffix;
            }

        }


        requestAnimationFrame(updateCounter);

    }


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.6
            }
        );


    counterElements.forEach(element => {
        counterObserver.observe(element);
    });



    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const button =
            item.querySelector(".faq-question");


        button.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
            });


            if (!isActive) {
                item.classList.add("active");
            }

        });

    });



    /* =====================================================
       CURSOR GLOW
       ===================================================== */

    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (finePointer && cursorGlow) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let currentX = mouseX;
        let currentY = mouseY;


        window.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });


        function animateCursor() {

            currentX +=
                (mouseX - currentX) * 0.08;

            currentY +=
                (mouseY - currentY) * 0.08;


            cursorGlow.style.left =
                `${currentX}px`;

            cursorGlow.style.top =
                `${currentY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();

    }



    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );


    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const id =
                        entry.target.getAttribute("id");


                    navLinks.forEach(link => {

                        link.classList.remove("active");


                        const href =
                            link.getAttribute("href");


                        if (href === `#${id}`) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });



    /* =====================================================
       SMOOTH ANCHOR HANDLING
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header.offsetHeight;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight +
                1;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });



    /* =====================================================
       CLOSE MOBILE MENU ON ESC
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            mobileNav.classList.contains("active")
        ) {
            closeMenu();
        }

    });



    /* =====================================================
       CLOSE MOBILE MENU WHEN RESIZED
       ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 850 &&
            mobileNav.classList.contains("active")
        ) {
            closeMenu();
        }

    });



    /* =====================================================
       PREVENT ACCIDENTAL HASH JUMP
       ===================================================== */

    if (window.location.hash) {

        window.setTimeout(() => {

            const target =
                document.querySelector(
                    window.location.hash
                );


            if (target) {

                const headerHeight =
                    header.offsetHeight;


                window.scrollTo({
                    top:
                        target.offsetTop -
                        headerHeight,
                    behavior: "instant"
                });

            }

        }, 100);

    }



    /* =====================================================
       CONSOLE BRANDING
       ===================================================== */

    console.log(
        "%c PT PRATAMA DIGITAL AGENCY ",
        "background:#d9ff45;color:#08090c;font-size:16px;font-weight:bold;padding:8px 12px;border-radius:6px;"
    );

    console.log(
        "%c Digital Excellence / 2026 ",
        "color:#d9ff45;font-size:12px;font-weight:bold;"
    );

});