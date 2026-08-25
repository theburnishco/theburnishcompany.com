document.addEventListener("DOMContentLoaded",()=>{
  const collections=document.querySelector("#collections");
  if(!collections)return;

  document.querySelectorAll("#wallet-gallery,#woodworking-gallery,#woodworking-covers").forEach(el=>el.remove());

  const style=document.createElement("style");
  style.textContent=`.site-gallery{display:none;padding:80px 0;background:var(--espresso);color:var(--cream)}.site-gallery.is-open{display:block}.site-gallery-heading{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:30px}.site-gallery-heading h2{font-size:clamp(42px,5vw,68px)}.site-gallery-heading p{margin:0;color:#b9aea5;font-size:13px}.gallery-cover{display:flex;flex-direction:column;align-items:center}.gallery-cover-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;width:100%}.gallery-cover-card{display:flex;flex-direction:column;align-items:center}.gallery-cover-photo{width:100%;aspect-ratio:4/3;background:#17100c;border:1px solid rgba(255,255,255,.16);overflow:hidden}.gallery-cover-photo img{width:100%;height:100%;object-fit:contain;display:block}.gallery-cover-title{margin:14px 0 0;font-family:Cormorant Garamond,serif;font-size:28px;color:var(--cream);text-align:center}.gallery-cover-note{margin:6px 0 0;color:#b9aea5;font-size:11px;letter-spacing:.12em;text-transform:uppercase}.gallery-details{display:none}@media(max-width:700px){.site-gallery{padding:60px 0}.site-gallery-heading{align-items:flex-start;flex-direction:column}.gallery-cover-grid{grid-template-columns:1fr}.gallery-cover-title{font-size:32px}}`;
  document.head.appendChild(style);

  const makeGallery=(id,title,eyebrow,description,photos)=>{
    const section=document.createElement("section");
    section.id=id;section.className="site-gallery";
    section.innerHTML=`<div class="wrap"><div class="site-gallery-heading"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2><p>${description}</p></div><button class="site-gallery-close" type="button">Close Gallery</button></div><div class="gallery-cover-grid">${photos.map(photo=>`<div class="gallery-cover-card"><div class="gallery-cover-photo"><img src="${photo.src}" alt="${photo.alt}"></div><h3 class="gallery-cover-title">${photo.title}</h3></div>`).join("")}</div></div>`;
    section.querySelector(".site-gallery-close").addEventListener("click",()=>section.classList.remove("is-open"));
    return section;
  };

  const wallet=makeGallery("wallet-gallery","The Ave","LEATHER GOODS","A handcrafted wallet shown from multiple views.",[
    {src:"photos/wallets/the-ave/IMG_3722.jpeg",alt:"The Ave wallet main view",title:"The Ave"}
  ]);
  const wood=makeGallery("woodworking-gallery","Fine Woodworking","FINE WOODWORK","Three handcrafted cutting boards.",[
    {src:"photos/woodworking/Maple Cutting Board.jpeg",alt:"Maple Cutting Board",title:"Maple Cutting Board"},
    {src:"photos/woodworking/Cherry Cutting Board.jpeg",alt:"Cherry Cutting Board",title:"Cherry Cutting Board"},
    {src:"photos/woodworking/Walnut Cutting Board.jpeg",alt:"Walnut Cutting Board",title:"Walnut Cutting Board"}
  ]);

  const grid=collections.querySelector(".collection-grid");
  if(grid){grid.insertAdjacentElement("afterend",wallet);wallet.insertAdjacentElement("afterend",wood)}

  const openGallery=gallery=>{gallery.classList.add("is-open");gallery.scrollIntoView({behavior:"smooth",block:"start"})};
  document.querySelector(".collection-leather .collection-icon-link")?.addEventListener("click",event=>{event.preventDefault();openGallery(wallet)});
  document.querySelector(".collection-wood .collection-icon-link")?.addEventListener("click",event=>{event.preventDefault();openGallery(wood)});
});