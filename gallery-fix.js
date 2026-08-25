document.addEventListener("DOMContentLoaded",()=>{
  const collections=document.querySelector("#collections");
  if(!collections)return;

  document.querySelectorAll("#wallet-gallery,#woodworking-gallery").forEach(el=>el.remove());

  const style=document.createElement("style");
  style.textContent=`.site-gallery{display:none;padding:80px 0;background:var(--espresso);color:var(--cream)}.site-gallery.is-open{display:block}.site-gallery-heading{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:30px}.site-gallery-heading h2{font-size:clamp(42px,5vw,68px)}.site-gallery-heading p{margin:0;color:#b9aea5;font-size:13px}.gallery-cover{display:flex;flex-direction:column;align-items:center;cursor:pointer}.gallery-cover-photo{width:min(760px,100%);aspect-ratio:4/3;background:#17100c;border:1px solid rgba(255,255,255,.16);overflow:hidden}.gallery-cover-photo img{width:100%;height:100%;object-fit:contain;display:block}.gallery-cover-title{margin:18px 0 0;font-family:Cormorant Garamond,serif;font-size:38px;color:var(--cream)}.gallery-cover-note{margin:6px 0 0;color:#b9aea5;font-size:11px;letter-spacing:.12em;text-transform:uppercase}.gallery-details{display:none}.gallery-details.is-visible{display:block}.site-gallery-main{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(220px,.7fr);gap:24px}.site-gallery-main-photo{min-height:520px;background:#17100c;border:1px solid rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;overflow:hidden}.site-gallery-main-photo img{width:100%;height:100%;object-fit:contain}.site-gallery-thumbs{display:grid;grid-template-columns:1fr;gap:16px}.site-gallery-thumb{border:1px solid rgba(255,255,255,.16);background:#17100c;padding:0;cursor:pointer;overflow:hidden;aspect-ratio:1}.site-gallery-thumb img{width:100%;height:100%;object-fit:cover}.gallery-back{margin-bottom:20px;border:1px solid rgba(255,255,255,.3);background:transparent;color:var(--cream);padding:10px 16px;font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;cursor:pointer}.site-gallery-close{border:1px solid rgba(255,255,255,.3);background:transparent;color:var(--cream);padding:10px 16px;font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;cursor:pointer}.site-gallery-close:hover,.gallery-back:hover{background:rgba(255,255,255,.08)}@media(max-width:700px){.site-gallery{padding:60px 0}.site-gallery-heading{align-items:flex-start;flex-direction:column}.site-gallery-main{grid-template-columns:1fr}.site-gallery-main-photo{min-height:360px}.site-gallery-thumbs{grid-template-columns:repeat(2,1fr)}.gallery-cover-title{font-size:32px}}`;
  document.head.appendChild(style);

  const makeGallery=(id,title,eyebrow,description,photos)=>{
    const section=document.createElement("section");
    section.id=id;section.className="site-gallery";
    section.innerHTML=`<div class="wrap"><div class="site-gallery-heading"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2><p>${description}</p></div><button class="site-gallery-close" type="button">Close Gallery</button></div><div class="gallery-cover"><div class="gallery-cover-photo"><img src="${photos[0].src}" alt="${photos[0].alt}"></div><h3 class="gallery-cover-title">${title}</h3><p class="gallery-cover-note">Click to enter full gallery</p></div><div class="gallery-details"><button class="gallery-back" type="button">← Back to Cover</button><div class="site-gallery-main"><div class="site-gallery-main-photo"><img src="${photos[0].src}" alt="${photos[0].alt}"></div><div class="site-gallery-thumbs">${photos.map(photo=>`<button class="site-gallery-thumb" type="button"><img src="${photo.src}" alt="${photo.alt}"></button>`).join("")}</div></div></div></div>`;
    const cover=section.querySelector(".gallery-cover"),details=section.querySelector(".gallery-details"),main=section.querySelector(".site-gallery-main-photo img");
    cover.addEventListener("click",()=>{cover.style.display="none";details.classList.add("is-visible")});
    section.querySelector(".gallery-back").addEventListener("click",()=>{details.classList.remove("is-visible");cover.style.display="flex"});
    section.querySelectorAll(".site-gallery-thumb").forEach(button=>button.addEventListener("click",()=>{const image=button.querySelector("img");main.src=image.src;main.alt=image.alt}));
    section.querySelector(".site-gallery-close").addEventListener("click",()=>{section.classList.remove("is-open");details.classList.remove("is-visible");cover.style.display="flex"});
    return section;
  };

  const wallet=makeGallery("wallet-gallery","The Ave","LEATHER GOODS","A handcrafted wallet shown from multiple views.",[
    {src:"photos/wallets/the-ave/IMG_3722.jpeg",alt:"The Ave wallet main view"},
    {src:"photos/wallets/the-ave/IMG_3723.jpeg",alt:"The Ave wallet detail view"}
  ]);
  const wood=makeGallery("woodworking-gallery","Fine Woodworking","FINE WOODWORK","A selection of handcrafted woodworking pieces.",[
    {src:"photos/woodworking/44B4E7CF-BC14-4AA3-BE37-607FF00D6211.jpeg",alt:"Fine woodworking view 1"},
    {src:"photos/woodworking/5995285E-4D0A-43AC-88C3-E676BD0FD377.jpeg",alt:"Fine woodworking view 2"},
    {src:"photos/woodworking/606FA773-1DAA-4E93-A696-E3887DC2BE37.jpeg",alt:"Fine woodworking view 3"},
    {src:"photos/woodworking/IMG_8987.jpeg",alt:"Fine woodworking view 4"},
    {src:"photos/woodworking/IMG_9053.jpeg",alt:"Fine woodworking view 5"}
  ]);

  const grid=collections.querySelector(".collection-grid");
  if(grid){grid.insertAdjacentElement("afterend",wallet);wallet.insertAdjacentElement("afterend",wood)}

  const openGallery=gallery=>{gallery.classList.add("is-open");gallery.scrollIntoView({behavior:"smooth",block:"start"})};
  document.querySelector(".collection-leather .collection-icon-link")?.addEventListener("click",event=>{event.preventDefault();openGallery(wallet)});
  document.querySelector(".collection-wood .collection-icon-link")?.addEventListener("click",event=>{event.preventDefault();openGallery(wood)});
});