document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");

  // Mobile navigation
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
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

    if (window.scrollY > 20) {
      header.style.boxShadow = "0 12px 35px rgba(23, 19, 15, 0.08)";
    } else {
      header.style.boxShadow = "none";
    }
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
      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });

  // Add the leather wallet photos already stored in the repository.
  const leatherCard = document.querySelector(".collection-leather");

  if (leatherCard) {
    const photoGallery = document.createElement("div");
    photoGallery.setAttribute("aria-label", "Leather wallet photos");
    photoGallery.style.cssText = [
      "position:absolute",
      "inset:28px 28px auto",
      "height:300px",
      "display:grid",
      "grid-template-columns:1fr 1fr",
      "gap:12px",
      "z-index:1",
      "overflow:hidden"
    ].join(";");

    [
      ["IMG_3722.jpeg", "Handcrafted leather wallet"],
      ["IMG_3723.jpeg", "Handcrafted leather wallet detail"]
    ].forEach(([src, alt]) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.loading = "lazy";
      img.style.cssText = [
        "width:100%",
        "height:100%",
        "object-fit:cover",
        "display:block",
        "border:1px solid rgba(255,255,255,.16)",
        "box-shadow:0 12px 30px rgba(0,0,0,.22)"
      ].join(";");
      photoGallery.appendChild(img);
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
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  }

  console.log("The Burnish Company — premium homepage loaded.");
});
