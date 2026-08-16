document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");

  const visualFixes = document.createElement("style");
  visualFixes.textContent = `
    .section-dark, .craft, .contact { margin-top:28px !important; margin-bottom:28px !important; }
    .site-header { border-bottom:none !important; box-shadow:none; }

    /* Custom wallet mark: layered-card silhouette, inspired by modern digital wallet icons. */
    .collection-leather { min-height:590px !important; overflow:hidden !important; }
    .collection-leather .collection-overlay { z-index:1 !important; }
    .collection-leather .collection-content { z-index:5 !important; }
    .wallet-icon-link, .dovetail-icon-link {
      position:absolute !important; inset:0 !important; z-index:6 !important;
      display:flex !important; align-items:center !important; justify-content:center !important;
      text-decoration:none !important; color:#fff !important;
    }
    .wallet-icon-wrap, .dovetail-icon-wrap { display:flex; flex-direction:column; align-items:center; gap:16px; transform:translateY(-35px); }
    .wallet-icon { width:190px !important; height:125px !important; position:relative !important; border-radius:25px !important; background:linear-gradient(145deg,#f5f5f5,#cfcfcf) !important; box-shadow:0 20px 45px rgba(0,0,0,.32) !important; border:0 !important; }
    .wallet-icon::before { content:"" !important; position:absolute !important; left:0 !important; top:0 !important; width:155px !important; height:100% !important; border-radius:25px !important; background:linear-gradient(145deg,#252525,#080808) !important; box-shadow:12px 8px 0 rgba(255,255,255,.92) !important; }
    .wallet-icon::after { content:"" !important; position:absolute !important; right:0 !important; top:45px !important; width:62px !important; height:38px !important; border-radius:12px 0 0 12px !important; background:#171717 !important; border:2px solid #eee !important; box-sizing:border-box !important; }
    .wallet-icon-label, .dovetail-icon-label { font-size:11px !important; font-weight:600 !important; letter-spacing:.2em !important; text-transform:uppercase !important; }
    .wallet-icon-link:hover .wallet-icon, .dovetail-icon-link:hover .dovetail-icon { transform:translateY(-5px) scale(1.025); transition:transform .2s ease; }

    /* Custom drawer dovetail graphic. */
    .dovetail-icon-wrap { transform:translateY(-35px); }
    .dovetail-icon { width:220px; height:130px; position:relative; filter:drop-shadow(0 18px 30px rgba(0,0,0,.3)); transition:transform .2s ease; }
    .dovetail-board { position:absolute; bottom:0; width:220px; height:78px; background:#b87945; border:3px solid #f2d0a7; box-sizing:border-box; }
    .dovetail-board::before { content:""; position:absolute; left:18px; top:-38px; width:42px; height:38px; background:#b87945; border:3px solid #f2d0a7; border-bottom:0; clip-path:polygon(12% 0,88% 0,100% 100%,0 100%); }
    .dovetail-board::after { content:""; position:absolute; left:78px; top:-38px; width:42px; height:38px; background:#b87945; border:3px solid #f2d0a7; border-bottom:0; clip-path:polygon(12% 0,88% 0,100% 100%,0 100%); }
    .dovetail-fingers { position:absolute; top:18px; left:22px; right:22px; height:46px; border-top:3px solid #f2d0a7; border-bottom:3px solid #f2d0a7; background:repeating-linear-gradient(90deg, transparent 0 34px, #f2d0a7 34px 38px); opacity:.9; }

    .wallet-gallery { margin-top:70px; padding:0 0 10px; }
    .wallet-gallery-heading { margin-bottom:28px; }
    .wallet-gallery-heading .eyebrow { margin-bottom:10px; }
    .wallet-gallery-heading h3 { font-size:42px; color:var(--cream); }
    .wallet-gallery-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; }
    .wallet-gallery-frame { aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; overflow:hidden; background:#17100c; border:1px solid rgba(255,255,255,.18); box-shadow:0 18px 40px rgba(0,0,0,.25); }
    .wallet-gallery-frame img { width:100%; height:100%; object-fit:contain; object-position:center; display:block; }

    .logo-mark { background:transparent !important; padding:0 !important; }
    .logo-mark .logo-image { filter:none !important; background:transparent !important; }
    .footer-logo { background:transparent !important; filter:brightness(0) invert(1) !important; opacity:1 !important; }

    @media (max-width:600px) {
      .section-dark, .craft, .contact { margin-top:20px !important; margin-bottom:20px !important; }
      .wallet-icon-wrap, .dovetail-icon-wrap { transform:translateY(-45px) scale(.82); }
      .wallet-icon { width:170px !important; height:112px !important; }
      .dovetail-icon { width:200px; }
      .wallet-gallery { margin-top:55px; }
      .wallet-gallery-grid { grid-template-columns:1fr; gap:18px; }
      .wallet-gallery-heading h3 { font-size:36px; }
      .collection-leather { min-height:600px !important; }
    }
  `;
  document.head.appendChild(visualFixes);

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

  const updateHeader = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 20 ? "0 12px 35px rgba(23,19,15,.08)" : "none";
  };
  window.addEventListener("scroll", updateHeader, { passive:true });
  updateHeader();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 20, behavior:"smooth" });
    });
  });

  const leatherCard = document.querySelector(".collection-leather");
  const woodCard = document.querySelector(".collection-woodwork");
  const collections = document.querySelector("#collections .wrap");

  if (leatherCard && collections) {
    const walletLink = document.createElement("a");
    walletLink.className = "wallet-icon-link";
    walletLink.href = "#wallet-gallery";
    walletLink.setAttribute("aria-label", "View leather wallet gallery");
    walletLink.innerHTML = '<span class="wallet-icon-wrap"><span class="wallet-icon" aria-hidden="true"></span><span class="wallet-icon-label">View Wallets</span></span>';
    leatherCard.prepend(walletLink);

    const gallery = document.createElement("section");
    gallery.id = "wallet-gallery";
    gallery.className = "wallet-gallery";
    gallery.setAttribute("aria-label", "Leather wallet gallery");
    gallery.innerHTML = `
      <div class="wallet-gallery-heading"><p class="eyebrow">LEATHER GOODS</p><h3>Wallet Gallery</h3></div>
      <div class="wallet-gallery-grid">
        <a class="wallet-gallery-frame" href="IMG_3722.jpeg" target="_blank" rel="noopener"><img src="IMG_3722.jpeg" alt="Handcrafted leather wallet" loading="lazy"></a>
        <a class="wallet-gallery-frame" href="IMG_3723.jpeg" target="_blank" rel="noopener"><img src="IMG_3723.jpeg" alt="Handcrafted leather wallet detail" loading="lazy"></a>
      </div>`;
    collections.appendChild(gallery);
  }

  if (woodCard) {
    const dovetailLink = document.createElement("a");
    dovetailLink.className = "dovetail-icon-link";
    dovetailLink.href = "#craft";
    dovetailLink.setAttribute("aria-label", "View custom woodwork and dovetail craftsmanship");
    dovetailLink.innerHTML = '<span class="dovetail-icon-wrap"><span class="dovetail-icon" aria-hidden="true"><span class="dovetail-board"></span><span class="dovetail-fingers"></span></span><span class="dovetail-icon-label">View Woodwork</span></span>';
    woodCard.prepend(dovetailLink);
  }

  const revealItems = document.querySelectorAll(".intro-grid, .collection-card, .value, .craft-grid, .contact-grid");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observerInstance.unobserve(entry.target);
      });
    }, { threshold:.12, rootMargin:"0px 0px -50px 0px" });
    revealItems.forEach((item) => { item.classList.add("reveal"); observer.observe(item); });
  }

  console.log("The Burnish Company — premium homepage loaded.");
});
