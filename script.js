document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");

  // Visual fixes for the collection photos and brand logos.
  const visualFixes = document.createElement("style");
  visualFixes.textContent = `
    /* Leather gallery: large standalone square photos */
    .collection-leather {
      min-height: 780px !important;
      overflow: hidden !important;
    }

    .leather-photo-gallery {
      position: absolute !important;
      top: 34px !important;
      left: 34px !important;
      right: 34px !important;
      height: 390px !important;
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 22px !important;
      z-index: 3 !important;
    }

    .leather-photo-frame {
      width: 100% !important;
      height: 390px !important;
      aspect-ratio: 1 / 1 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
      background: #17100c !important;
      border: 1px solid rgba(255,255,255,.2) !important;
      box-shadow: 0 18px 40px rgba(0,0,0,.28) !important;
    }

    .leather-photo-frame img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center !important;
      display: block !important;
    }

    .collection-leather .collection-overlay {
      z-index: 1 !important;
      background: linear-gradient(to top, rgba(15,10,7,.96), rgba(15,10,7,.08) 68%) !important;
    }

    .collection-leather .collection-content {
      z-index: 5 !important;
      inset: auto 45px 42px !important;
    }

    .collection-leather .collection-number {
      margin-bottom: 18px !important;
    }

    /* Header logo: clean black-and-white treatment */
    .logo-mark {
      background: #000 !important;
      padding: 12px 15px !important;
    }

    .logo-mark .logo-image {
      filter: brightness(0) invert(1) !important;
    }

    /* Footer logo: same black-and-white treatment */
    .footer-logo {
      background: #000 !important;
      padding: 12px 15px !important;
      filter: brightness(0) invert(1) !important;
      opacity: 1 !important;
    }

    @media (max-width: 900px) {
      .collection-leather {
        min-height: 760px !important;
      }

      .leather-photo-gallery {
        top: 28px !important;
        left: 28px !important;
        right: 28px !important;
        height: 350px !important;
        gap: 16px !important;
      }

      .leather-photo-frame {
        height: 350px !important;
      }
    }

    @media (max-width: 600px) {
      .collection-leather {
        min-height: 920px !important;
      }

      .leather-photo-gallery {
        top: 25px !important;
        left: 25px !important;
        right: 25px !important;
        height: auto !important;
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 18px !important;
      }

      .leather-photo-frame {
        width: 100% !important;
        height: auto !important;
        aspect-ratio: 1 / 1 !important;
      }

      .collection-leather .collection-content {
        inset: auto 25px 28px !important;
      }
    }
  `;
  document.head.appendChild(visualFixes);

  // Mobile navigation
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // Header shadow while scrolling
  const updateHeader = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 20
      ? "0 12px 35px rgba(23, 19, 15, 0.08)"
      : "none";
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    });
  });

  // Leather wallet gallery — large, separate square frames with no cropping.
  const leatherCard = document.querySelector(".collection-leather");

  if (leatherCard) {
    const photoGallery = document.createElement("div");
    photoGallery.className = "leather-photo-gallery";
    photoGallery.setAttribute("aria-label", "Leather wallet photos");

    [
      ["IMG_3722.jpeg", "Handcrafted leather wallet"],
      ["IMG_3723.jpeg", "Handcrafted leather wallet detail"]
    ].forEach(([src, alt]) => {
      const frame = document.createElement("div");
      frame.className = "leather-photo-frame";

      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.loading = "lazy";

      frame.appendChild(img);
      photoGallery.appendChild(frame);
    });

    leatherCard.prepend(photoGallery);
  }

  // Subtle reveal animations
  const revealItems = document.querySelectorAll(
    ".intro-grid, .collection-card, .value, .craft-grid, .contact-grid"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observerInstance.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  }

  console.log("The Burnish Company — premium homepage loaded.");
});
