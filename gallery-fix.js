document.addEventListener("DOMContentLoaded",()=>{
  const collections=document.querySelector("#collections");
  if(!collections)return;

  document.querySelectorAll("#wallet-gallery,#woodworking-gallery,#woodworking-covers").forEach(el=>el.remove());

  const style=document.createElement("style");
  style.textContent=`.site-gallery{display:none;padding:80px 0;background:var(--espresso);color:var(--cream)}.site-gallery.is-open{display:block}.site-gallery-heading{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:30px}.site-gallery-heading h2{font-size:clamp(42px,5vw,68px)}.site-gallery-heading p{margin:0;color:#b9aea5;font-size:13px}.gallery-cover-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;width:100%}.gallery-cover-card{display:flex;flex-direction:column;align-items:center;cursor:pointer}.gallery-cover-photo{width:100%;aspect-ratio:4/3;background:#17100c;border:1px solid rgba(255,255,255,.16);overflow:hidden}.gallery-cover-photo img{width:100%;height:100%;object-fit:contain;display:block}.gallery-cover-title{margin:14px 0 0;font-family:Cormorant Garamond,serif;font-size:28px;color:var(--cream);text-align:center}.gallery-cover-note{margin:6px 0 0;color:#b9aea5;font-size:11px;letter-spacing:.12em;text-transform:uppercase}.gallery-details{display:none}.gallery-details.is-visible{display:block}.gallery-back{margin-bottom:20px;border:1px solid rgba(255,255,255,.3);background:transparent;color:var(--cream);padding:10px 16px;font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;cursor:pointer}.site-gallery-main{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(220px,.7fr);gap:24px}.site-gallery-main-photo{min-height:520px;background:#17100c;border:1px solid rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;overflow:hidden}.site-gallery-main-photo img{width:100%;height:100%;object-fit:contain}.site-gallery-thumbs{display:grid;grid-template-columns:1fr;gap:16px}.site-gallery-thumb{border:1px solid rgba(255,255,255,.16);background:#17100c;padding:0;cursor:pointer;overflow:hidden;aspect-ratio:1}.site-gallery-thumb img{width:100%;height:100%;object-fit:cover}.site-gallery-close{border:1px solid rgba(255,255,255,.3);background:transparent;color:var(--cream);padding:10px 16px;font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;cursor:pointer}@media(max-width:700px){.site-gallery{padding:60px 0}.site-gallery-heading{align-items:flex-start;flex-direction:column}.gallery-cover-grid{grid-template-columns:1fr}.site-gallery-main{grid-template-columns:1fr}.site-gallery-main-photo{min-height:360px}.site-gallery-thumbs{grid-template-columns:repeat(3,1fr)}.gallery-cover-title{font-size:32px}}`;
  document.head.appendChild(style);

  const makeWalletGallery=()=>{
    const section=document.createElement("section");section.id="wallet-gallery";section.className="site-gallery";
    section.innerHTML=`<div class="wrap"><div class="site-gallery-heading"><div><p class="eyebrow">LEATHER GOODS</p><h2>Wallets</h2><p>Individually made, for an individual purpose.</p></div><button class="site-gallery-close" type="button">Close Gallery</button></div><div class="gallery-cover-grid"><div class="gallery-cover-card" data-gallery="ave"><div class="gallery-cover-photo"><img src="photos/wallets/the-ave/IMG_3722.jpeg" alt="The Ave wallet"></div><h3 class="gallery-cover-title">The Ave</h3><p class="gallery-cover-note">View Gallery</p></div><div class="gallery-cover-card" data-gallery="stine"><div class="gallery-cover-photo"><img src="photos/wallets/stine/IMG_3719.jpeg" alt="The Stine wallet"></div><h3 class="gallery-cover-title">The Stine</h3><p class="gallery-cover-note">View Gallery</p></div></div><div class="gallery-details" data-gallery-details="ave"><button class="gallery-back" type="button">← Back to Wallets</button><div class="site-gallery-main"><div class="site-gallery-main-photo"><img src="photos/wallets/the-ave/IMG_3722.jpeg" alt="The Ave wallet"></div><div class="site-gallery-thumbs"><button class="site-gallery-thumb" type="button"><img src="photos/wallets/the-ave/IMG_3722.jpeg" alt="The Ave wallet front view"></button><button class="site-gallery-thumb" type="button"><img src="photos/wallets/the-ave/IMG_3723.jpeg" alt="The Ave wallet detail view"></button></div></div></div><div class="gallery-details" data-gallery-details="stine"><button class="gallery-back" type="button">← Back to Wallets</button><div class="site-gallery-main"><div class="site-gallery-main-photo"><img src="photos/wallets/stine/IMG_3719.jpeg" alt="The Stine wallet"></div><div class="site-gallery-thumbs"><button class="site-gallery-thumb" type="button"><img src="photos/wallets/stine/IMG_3719.jpeg" alt="The Stine wallet cover view"></button><button class="site-gallery-thumb" type="button"><img src="photos/wallets/stine/IMG_3720.jpeg" alt="The Stine wallet detail view"></button><button class="site-gallery-thumb" type="button"><img src="photos/wallets/stine/IMG_3721.jpeg" alt="The Stine wallet additional view"></button></div></div></div></div>`;
    const covers=section.querySelectorAll(".gallery-cover-card"),details=section.querySelectorAll(".gallery-details");
    covers.forEach(cover=>cover.addEventListener("click",()=>{
      const key=cover.dataset.gallery;
      covers.forEach(c=>c.style.display="none");
      details.forEach(d=>d.classList.toggle("is-visible",d.dataset.galleryDetails===key));
    }));
    section.querySelectorAll(".gallery-back").forEach(button=>button.addEventListener("click",()=>{
      details.forEach(d=>d.classList.remove("is-visible"));
      covers.forEach(c=>c.style.display="flex");
    }));
    details.forEach(detail=>{
      const main=detail.querySelector(".site-gallery-main-photo img");
      detail.querySelectorAll(".site-gallery-thumb").forEach(button=>button.addEventListener("click",()=>{const image=button.querySelector("img");main.src=image.src;main.alt=image.alt}));
    });
    section.querySelector(".site-gallery-close").addEventListener("click",()=>{
      section.classList.remove("is-open");details.forEach(d=>d.classList.remove("is-visible"));covers.forEach(c=>c.style.display="flex");
    });
    return section;
  };

  const makeWoodGallery=()=>{
    const section=document.createElement("section");section.id="woodworking-gallery";section.className="site-gallery";
    section.innerHTML=`<div class="wrap"><div class="site-gallery-heading"><div><p class="eyebrow">WOODWORK</p><h2>Woodworking</h2><p>Handcrafted cutting boards, organized by species.</p></div><button class="site-gallery-close" type="button">Close Gallery</button></div><div class="gallery-cover-grid"><div class="gallery-cover-card"><div class="gallery-cover-photo"><img src="photos/woodworking/maple/IMG_44B4E7CF.jpeg" alt="Maple Cutting Board"></div><h3 class="gallery-cover-title">Maple Cutting Board</h3></div><div class="gallery-cover-card"><div class="gallery-cover-photo"><img src="photos/woodworking/cherry/IMG_5995285E.jpeg" alt="Cherry Cutting Board"></div><h3 class="gallery-cover-title">Cherry Cutting Board</h3></div><div class="gallery-cover-card"><div class="gallery-cover-photo"><img src="photos/woodworking/walnut/IMG_606FA773.jpeg" alt="Walnut Cutting Board"></div><h3 class="gallery-cover-title">Walnut Cutting Board</h3></div></div></div>`;
    section.querySelector(".site-gallery-close").addEventListener("click",()=>section.classList.remove("is-open"));
    return section;
  };

  const wallet=makeWalletGallery(),wood=makeWoodGallery();
  const grid=collections.querySelector(".collection-grid");
  if(grid){grid.insertAdjacentElement("afterend",wallet);wallet.insertAdjacentElement("afterend",wood)}
  const openGallery=gallery=>{gallery.classList.add("is-open");gallery.scrollIntoView({behavior:"smooth",block:"start"})};
  document.querySelector(".collection-leather .collection-icon-link")?.addEventListener("click",event=>{event.preventDefault();openGallery(wallet)});
  document.querySelector(".collection-wood .collection-icon-link")?.addEventListener("click",event=>{event.preventDefault();openGallery(wood)});
  const contactHeading=document.querySelector("#contact h2");
  if(contactHeading)contactHeading.innerHTML=contactHeading.innerHTML.replace("Have something <em>in mind?</em>","Have something <em>else in mind?</em>");
});