document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header"),menuToggle=document.querySelector(".menu-toggle"),navigation=document.querySelector(".main-navigation");
  const visualFixes=document.createElement("style");
  visualFixes.textContent=`
    .section-dark,.craft,.contact{margin-top:28px!important;margin-bottom:28px!important}.site-header{border-bottom:none!important;box-shadow:none}.collection-leather,.collection-wood{min-height:590px!important;overflow:hidden!important}.collection-leather .collection-overlay,.collection-wood .collection-overlay{z-index:1!important}.collection-leather .collection-content,.collection-wood .collection-content{z-index:5!important}
    .wallet-gallery{margin-top:70px;padding:0 0 10px;display:none}.wallet-gallery.is-open{display:block}.wallet-gallery-heading{margin-bottom:28px}.wallet-gallery-heading .eyebrow{margin-bottom:10px}.wallet-gallery-heading h3{font-size:42px;color:var(--cream)}.wallet-gallery-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.wallet-gallery-frame{aspect-ratio:1;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#17100c;border:1px solid rgba(255,255,255,.18);box-shadow:0 18px 40px rgba(0,0,0,.25)}.wallet-gallery-frame img{width:100%;height:100%;object-fit:contain;display:block}
    @media(max-width:600px){.section-dark,.craft,.contact{margin-top:20px!important;margin-bottom:20px!important}.wallet-gallery-grid{grid-template-columns:1fr}.wallet-gallery-heading h3{font-size:36px}.collection-leather,.collection-wood{min-height:600px!important}}
  `;document.head.appendChild(visualFixes);

  if(menuToggle&&navigation){menuToggle.addEventListener("click",()=>{const open=navigation.classList.toggle("open");menuToggle.classList.toggle("active",open);menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{navigation.classList.remove("open");menuToggle.classList.remove("active");menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Open navigation")}))}
  const updateHeader=()=>{if(header)header.style.boxShadow=window.scrollY>20?"0 12px 35px rgba(23,19,15,.08)":"none"};window.addEventListener("scroll",updateHeader,{passive:true});updateHeader();
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",event=>{const id=link.getAttribute("href");if(!id||id==="#"||id==="#wallet-gallery")return;const target=document.querySelector(id);if(!target)return;event.preventDefault();const hh=header?header.offsetHeight:0;window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-hh-20,behavior:"smooth"})}));

  const leatherCard=document.querySelector(".collection-leather"),woodCard=document.querySelector(".collection-wood"),collections=document.querySelector("#collections .wrap");
  if(leatherCard&&collections){
    let walletLink=leatherCard.querySelector(".collection-icon-link,.wallet-icon-link");
    if(!walletLink){walletLink=document.createElement("a");walletLink.className="wallet-icon-link";walletLink.href="#wallet-gallery";walletLink.setAttribute("aria-label","Open leather wallet gallery");walletLink.innerHTML='<span class="wallet-icon-wrap"><span class="wallet-icon" aria-hidden="true"></span><span class="wallet-icon-label">View Wallets</span></span>';leatherCard.prepend(walletLink)}
    let gallery=document.querySelector("#wallet-gallery");
    if(!gallery){gallery=document.createElement("section");gallery.id="wallet-gallery";gallery.className="wallet-gallery";gallery.setAttribute("aria-label","Leather wallet gallery");gallery.innerHTML='<div class="wallet-gallery-heading"><p class="eyebrow">LEATHER GOODS</p><h3>Wallet Gallery</h3></div><div class="wallet-gallery-grid"><a class="wallet-gallery-frame" href="IMG_3722.jpeg" target="_blank" rel="noopener"><img src="IMG_3722.jpeg" alt="Handcrafted leather wallet" loading="lazy"></a><a class="wallet-gallery-frame" href="IMG_3723.jpeg" target="_blank" rel="noopener"><img src="IMG_3723.jpeg" alt="Handcrafted leather wallet detail" loading="lazy"></a></div>';collections.appendChild(gallery)}
    walletLink.addEventListener("click",event=>{event.preventDefault();gallery.classList.toggle("is-open");const open=gallery.classList.contains("is-open");walletLink.setAttribute("aria-expanded",String(open));if(open){const hh=header?header.offsetHeight:0;setTimeout(()=>window.scrollTo({top:gallery.getBoundingClientRect().top+window.scrollY-hh-20,behavior:"smooth"}),50)}})
  }

  if(woodCard){
    let woodLink=woodCard.querySelector(".collection-icon-link,.dovetail-icon-link");
    if(!woodLink){woodLink=document.createElement("a");woodLink.className="dovetail-icon-link";woodLink.href="#craft";woodLink.setAttribute("aria-label","View fine woodworking gallery");woodLink.innerHTML='<span class="dovetail-icon-wrap"><span class="dovetail-icon" aria-hidden="true"><span class="dovetail-board"></span><span class="dovetail-fingers"></span></span><span class="dovetail-icon-label">View Woodwork</span></span>';woodCard.prepend(woodLink)}
    woodLink.addEventListener("click",event=>{event.preventDefault();const craft=document.querySelector("#craft");if(craft)craft.scrollIntoView({behavior:"smooth",block:"start"})})
  }

  const revealItems=document.querySelectorAll(".intro-grid,.collection-card,.value,.craft-grid,.contact-grid");
  if("IntersectionObserver"in window){const observer=new IntersectionObserver((entries,o)=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add("is-visible");o.unobserve(entry.target)}),{threshold:.12,rootMargin:"0px 0px -50px 0px"});revealItems.forEach(item=>{item.classList.add("reveal");observer.observe(item)})}
  console.log("The Burnish Company — premium homepage loaded.");
});
