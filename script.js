"use strict";

if("scrollRestoration" in history)history.scrollRestoration="manual";
if(location.hash)history.replaceState(null,"",`${location.pathname}${location.search}`);
scrollTo(0,0);
addEventListener("pageshow",()=>scrollTo(0,0));

const siteFeatures = Object.freeze({
  showreel:{enabled:false,items:[]},events:{enabled:false,items:[]},impact:{enabled:false,items:[]},
  testimonials:{enabled:false,items:[]},partners:{enabled:false,items:[]}
});

const opening=document.querySelector("#cinematic-opening"),openingEnter=document.querySelector("#opening-enter");
let openingTimer,openingFailSafe,openingClosed=false;
function closeOpening(){
  if(openingClosed||!opening)return;
  openingClosed=true;clearTimeout(openingTimer);clearTimeout(openingFailSafe);
  opening.classList.add("is-leaving");document.body.classList.remove("opening-active");opening.setAttribute("aria-hidden","true");
  const finish=()=>{opening.hidden=true;document.querySelector(".hero")?.classList.add("opening-complete")};
  setTimeout(finish,1250);
}
if(opening){
  document.body.classList.add("opening-active");requestAnimationFrame(()=>opening.classList.add("is-ready"));
  openingEnter.addEventListener("click",closeOpening);opening.addEventListener("keydown",event=>{if(event.key==="Escape"){event.preventDefault();closeOpening()}});
  openingTimer=setTimeout(closeOpening,3800);openingFailSafe=setTimeout(closeOpening,7000);
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){clearTimeout(openingTimer);openingTimer=setTimeout(closeOpening,260)}
  openingEnter.focus({preventScroll:true});
}

const offerings = [
  {name:"Arohan Class",icon:"spiritual-growth.png",text:"Ease mental stress and emotional turmoil while gaining deeper clarity about life and its purpose. Guided self-reflection and self-study strengthen the inner self, build resilience and expand awareness."},
  {name:"Heartful Listening",icon:"guidance-support.png",text:"A confidential, judgement-free space where trained listeners receive your expression. Speaking openly helps declutter the mind, restore clarity and release emotional baggage."},
  {name:"Heart-Centred Yog",icon:"inner-awareness.png",text:"Mindful movement, conscious breathing and meditation techniques help members of the industry slow down, release tension and deepen their connection with the present moment."},
  {name:"Skills Training",icon:"creative-expression.png",text:"Immersive sessions and masterclasses led by accomplished professionals build confidence, craft and competence across a diverse range of creative disciplines."},
  {name:"Values-Based Stories",icon:"storytelling.png",text:"A platform for like-hearted artists to collaborate on plays, short films and performances that awaken hearts and nurture a compassionate, values-driven society."},
  {name:"Fellowship Programme",icon:"community.png",text:"Inspiration and support for emerging artists to remain motivated through competition and uncertainty while continuing to create and express their talent."},
  {name:"Events",icon:"film-media.png",text:"Screenings, discussions and gatherings that create opportunities to connect over the true essence of art, remain grounded and strengthen human values."},
  {name:"Awards",icon:"cultural-roots.png",text:"Recognition for artists and groups whose meaningful work reflects excellence, inspires society and contributes positively to our shared cultural fabric."},
  {name:"Collaborations",icon:"emotional-harmony.png",text:"Purpose-led partnerships with artists, organisations and institutions to create programmes and cultural work aligned with wellbeing, values and transformation."}
];

const trustees = [
  {name:"Smita Jayakar",role:"Actor & Spiritual Healer",image:"smita-jayakar.webp",profile:"Smita Jayakar has been part of the Indian film industry for over 35 years. She has worked in 23 blockbuster Bollywood films, including Devdas, Hum Dil De Chuke Sanam, Sarfarosh and Ek Vivaah Aisa Bhi. She is the author of three life-changing books and a transformative speaker whose purpose is to support Maitreya Dadashreeji's vision of transforming humanity.",quote:"As actors, we are always wearing the masks of the characters we play. Spirituality is essential for actors to be true to themselves and to face not only the highs, but also the lows of this career path."},
  {name:"Makarand Deshpande",role:"Actor, Writer & Director",image:"makarand-deshpande-portrait.webp",profile:"Makarand Deshpande is an Indian actor, writer and director across Hindi, Kannada, Marathi, Telugu, Malayalam and Tamil cinema and theatre. He has directed five films and contributed more than 50 short plays and 40 full-length plays. He founded the Ansh Theatre Group in 1993."},
  {name:"Kajal Aggrawal",role:"Actor & Entrepreneur",image:"kajal-aggrawal.webp",profile:"Kajal Aggrawal is a leading Indian film actor known for her work across Telugu, Tamil and Hindi cinema. With a career spanning nearly two decades and more than 70 films, she is admired for her versatility, discipline and grounded worldview.",quote:"Films don't just entertain; they teach us how to feel, love and become. With values, cinema becomes conscience. In returning to our roots, we don't go back—we go deeper."},
  {name:"Addinath Kothare",role:"Actor, Writer & Director",image:"addinath-kothare.webp",profile:"Addinath M. Kothare is an Indian actor, director, writer and producer working across Marathi and Hindi films, web series, television and theatre. His accolades include a National Film Award, a Maharashtra State Film Award and multiple Filmfare Marathi Awards.",quote:"If creativity is like the Earth, spirituality is the Sun to our Earth. The spiritual path guided by Maitreya Dadashreeji has helped me open the doors and windows of my mind to the universe."},
  {name:"Aaditi Pohankar",role:"Actor",image:"aaditi-pohankar.webp",profile:"Aaditi Pohankar is an Indian actress celebrated for powerful, nuanced performances. She debuted in the Marathi blockbuster Lai Bhaari and earned acclaim for her portrayal of Bhumi in the Netflix series She.",quote:"When you meet your higher self within, a strong value system helps you realise: I am an actor and this is my work, but there is more to my life's purpose."},
  {name:"Shaan Uttamsingh",role:"Entrepreneur",image:"shaan-uttamsingh.webp",profile:"Shaan Uttamsingh is an entrepreneur deeply involved in media and entertainment. The grandson of pioneer G. P. Sippy, he has more than 26 years of experience building and leading companies in the industry while protecting valuable intellectual property. He has been associated with Maitreya Dadashreeji since 2013 and presides over multiple trusts."},
  {name:"Maitreyi Saundarya",role:"Spiritual Guide & Speaker",image:"maitreyi-saundarya.webp",profile:"Maitreyi Saundarya is a Spiritual Guide and Speaker at MaitriBodh Parivaar. After meeting Maitreya Dadashreeji in 2013, she devoted herself to His mission of transforming humanity. She has guided leaders, celebrities, professionals and young people, and has spoken on national and international platforms.",quote:"Spirituality is not a separate path of life, but an added strength to live the same life in a better way."}
];

const formDefinitions = {
  member:{title:"Become a member",description:"Tell us about your journey in the film and entertainment fraternity.",fields:[{name:"industry_role",label:"Industry role",type:"text"},{name:"experience",label:"Years of experience",type:"text"},{name:"areas_of_interest",label:"Areas of interest",type:"text"}]},
  volunteer:{title:"Volunteer with us",description:"Share how you would like to offer your time and skills.",fields:[{name:"skills",label:"Skills",type:"text"},{name:"availability",label:"Availability",type:"text"},{name:"preferred_contribution",label:"Preferred contribution",type:"text"}]},
  collaborate:{title:"Collaborate with us",description:"Introduce your organisation or creative proposal.",fields:[{name:"organization",label:"Organisation",type:"text"},{name:"collaboration_type",label:"Collaboration type",type:"text"},{name:"proposal_summary",label:"Proposal summary",type:"textarea"}]},
  support:{title:"Support the mission",description:"Tell us how you would like to support the mission.",fields:[{name:"support_type",label:"Type of support",type:"text"},{name:"preferred_contact_method",label:"Preferred contact method",type:"select",options:["Email","Phone","WhatsApp"]}]}
};

const offeringGrid=document.querySelector("#offering-grid");
offerings.forEach((item,index)=>{const article=document.createElement("article");article.className="offering-card reveal";article.style.setProperty("--delay",`${(index%3)*55}ms`);article.innerHTML=`<button type="button" aria-expanded="false"><span class="offering-head"><img src="assets/icons/${item.icon}" width="116" height="116" alt=""></span><h3>${item.name}</h3><p>${item.text.split(". ")[0]}.</p><span class="offering-more"><span><p>${item.text}</p></span></span><span class="offering-action">Read more <i>+</i></span></button>`;const button=article.querySelector("button");button.addEventListener("click",()=>{const open=article.classList.toggle("open");button.setAttribute("aria-expanded",String(open));button.querySelector(".offering-action").firstChild.textContent=open?"Read less ":"Read more "});offeringGrid.append(article)});

const trusteeGrid=document.querySelector("#trustee-grid");
const detail=document.querySelector("#trustee-detail");
let activeTrustee=0;
trustees.forEach((person,index)=>{const button=document.createElement("button");button.className="trustee-card reveal";button.type="button";button.setAttribute("aria-controls","trustee-detail");button.setAttribute("aria-label",`View ${person.name}'s trustee profile`);button.style.setProperty("--delay",`${(index%4)*55}ms`);button.innerHTML=`<span class="trustee-photo"><img src="assets/images/${person.image}" width="900" height="1200" loading="lazy" alt="${person.name}"></span><span class="trustee-meta"><h3>${person.name}</h3><p>${person.role}</p></span>`;button.addEventListener("click",()=>showTrustee(index,true));trusteeGrid.append(button)});
trusteeGrid.querySelectorAll("img").forEach(image=>image.src+=image.src.includes("?")?"&pdf=2":"?pdf=2");
function showTrustee(index,shouldScroll=false){
  const movement=index===activeTrustee?0:index>activeTrustee?1:-1;
  activeTrustee=(index+trustees.length)%trustees.length;
  const person=trustees[activeTrustee];
  const profileIntro=person.profile,profileMore="";
  trusteeGrid.querySelectorAll("button").forEach((item,itemIndex)=>{const half=Math.floor(trustees.length/2);const offset=((itemIndex-activeTrustee+trustees.length+half)%trustees.length)-half;const distance=Math.abs(offset);item.classList.toggle("active",itemIndex===activeTrustee);item.setAttribute("aria-current",itemIndex===activeTrustee?"true":"false");item.style.setProperty("--arc-x",`${offset*88}%`);item.style.setProperty("--arc-y",`${distance*24}px`);item.style.setProperty("--arc-turn",`${offset*-9}deg`);item.style.setProperty("--arc-scale",String(1-distance*.075));item.style.setProperty("--arc-opacity",String(1-distance*.16));item.style.zIndex=String(10-distance)});
  detail.classList.remove("profile-enter");void detail.offsetWidth;
  detail.dataset.direction=movement<0?"previous":"next";
  detail.innerHTML=`<figure class="trustee-detail-portrait"><img src="assets/images/${person.image}" width="900" height="1200" alt="${person.name}"></figure><div class="trustee-detail-copy"><div class="trustee-identity"><h3>${person.name}</h3><p class="trustee-role">${person.role}</p></div><div class="trustee-biography"><p>${profileIntro}</p>${profileMore||person.quote?`<details><summary>Read full profile</summary>${profileMore?`<p>${profileMore}</p>`:""}${person.quote?`<blockquote>“${person.quote}”</blockquote>`:""}</details>`:""}</div></div><div class="trustee-controls"><button type="button" data-direction="-1" aria-label="Previous trustee">←</button><button type="button" data-direction="1" aria-label="Next trustee">→</button></div>`;
  detail.querySelector("img").src+="?pdf=2";
  detail.querySelector("details")?.setAttribute("open","");
  detail.classList.add("profile-enter");
  detail.querySelectorAll("[data-direction]").forEach(button=>button.addEventListener("click",()=>showTrustee(activeTrustee+Number(button.dataset.direction))));
  if(shouldScroll&&matchMedia("(max-width: 900px)").matches)detail.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center"});
}
showTrustee(0);

document.querySelectorAll(".value-button").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll(".value-button").forEach(item=>item.classList.remove("active"));button.classList.add("active");const title=document.querySelector("#active-value-name"),art=document.querySelector("#active-value-art");title.style.opacity="0";title.style.transform="translateY(5px)";art.classList.add("is-changing");setTimeout(()=>{title.innerHTML=`${button.dataset.devanagari} <span>${button.dataset.name}</span>`;document.querySelector("#active-value-meaning").textContent=button.dataset.meaning;art.src=`assets/values/${button.dataset.image}`;title.style.opacity="1";title.style.transform="none";art.classList.remove("is-changing")},180)}));

const menu=document.querySelector("#nav-links"),menuButton=document.querySelector(".menu-toggle");
menuButton.addEventListener("click",()=>{const open=menu.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open))});
menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{menu.classList.remove("open");menuButton.setAttribute("aria-expanded","false")}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -45px"});
document.querySelectorAll(".reveal,.bloom-decor").forEach(element=>revealObserver.observe(element));
const sections=[...document.querySelectorAll("main section[id]")],navAnchors=[...document.querySelectorAll(".nav-links>a")];
const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navAnchors.forEach(link=>link.classList.toggle("active",link.hash===`#${entry.target.id}`))}),{rootMargin:"-30% 0px -62%"});sections.forEach(section=>activeObserver.observe(section));
let ticking=false;
function paintScroll(){
  const max=document.documentElement.scrollHeight-innerHeight,reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,mobile=innerWidth<=800;
  document.querySelector("#scroll-progress").style.width=`${max?scrollY/max*100:0}%`;document.querySelector(".site-header")?.classList.toggle("is-scrolled",scrollY>24);
  if(!reduced){
    if(!mobile)document.querySelectorAll(".parallax").forEach(item=>item.style.transform=`translate3d(0,${scrollY*Number(item.dataset.rate)}px,0)`);
  }
  ticking=false
}
addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(paintScroll);ticking=true}},{passive:true});paintScroll();
document.addEventListener("visibilitychange",()=>document.body.classList.toggle("page-hidden",document.hidden));

const dialog=document.querySelector("#intent-dialog"),form=document.querySelector("#intent-form"),intentFields=document.querySelector("#intent-fields"),closeDialog=document.querySelector(".dialog-close");let lastTrigger=null;
document.querySelectorAll(".form-trigger").forEach(trigger=>trigger.addEventListener("click",()=>openForm(trigger.dataset.intent,trigger)));
function openForm(intent,trigger){lastTrigger=trigger;const definition=formDefinitions[intent];form.reset();document.querySelector("#intent").value=intent;document.querySelector("#dialog-title").textContent=definition.title;document.querySelector("#dialog-description").textContent=definition.description;intentFields.innerHTML=definition.fields.map(field=>{if(field.type==="textarea")return `<label>${field.label} <span>*</span><textarea name="${field.name}" rows="3" required></textarea></label>`;if(field.type==="select")return `<label>${field.label} <span>*</span><select name="${field.name}" required><option value="">Select one</option>${field.options.map(option=>`<option>${option}</option>`).join("")}</select></label>`;return `<label>${field.label} <span>*</span><input name="${field.name}" type="${field.type}" required></label>`}).join("");dialog.showModal();document.body.classList.add("dialog-open")}
function dismissDialog(){dialog.close();document.body.classList.remove("dialog-open");lastTrigger?.focus()}
closeDialog.addEventListener("click",dismissDialog);dialog.addEventListener("click",event=>{if(event.target===dialog)dismissDialog()});dialog.addEventListener("close",()=>document.body.classList.remove("dialog-open"));
form.addEventListener("submit",async event=>{event.preventDefault();const config=window.VACS_FORM_CONFIG||{};if(!config.enabled||!config.endpoint)return;if(!form.reportValidity())return;const submit=form.querySelector(".form-submit");submit.disabled=true;submit.textContent="Sending…";try{const response=await fetch(config.endpoint,{method:config.method||"POST",body:new FormData(form)});if(!response.ok)throw new Error("Submission failed");submit.textContent="Enquiry sent"}catch{submit.disabled=false;submit.textContent="Try again"}});
const config=window.VACS_FORM_CONFIG||{};if(config.enabled&&config.endpoint){const submit=form.querySelector(".form-submit");submit.disabled=false;submit.textContent="Send enquiry"}

// Keep the public-facing brand name in the approved long form; the acronym remains only in technical configuration.
const dialogEyebrow=document.querySelector("#intent-dialog .eyebrow");if(dialogEyebrow)dialogEyebrow.textContent="Connect with us";
const consentCopy=document.querySelector("#intent-form .consent span");if(consentCopy)consentCopy.textContent="I consent to being contacted about this enquiry.";
document.querySelector("#year").textContent=new Date().getFullYear();
