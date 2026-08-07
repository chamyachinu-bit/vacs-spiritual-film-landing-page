"use strict";

if("scrollRestoration" in history)history.scrollRestoration="manual";
if(location.hash)history.replaceState(null,"",`${location.pathname}${location.search}`);
scrollTo(0,0);
addEventListener("pageshow",()=>scrollTo(0,0));

const siteFeatures = Object.freeze({
  showreel:{enabled:false,items:[]},events:{enabled:false,items:[]},impact:{enabled:false,items:[]},
  testimonials:{enabled:false,items:[]},partners:{enabled:false,items:[]}
});

const opening=document.querySelector("#cinematic-opening");
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
  opening.addEventListener("keydown",event=>{if(event.key==="Escape"){event.preventDefault();closeOpening()}});
  openingTimer=setTimeout(closeOpening,3800);openingFailSafe=setTimeout(closeOpening,7000);
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){clearTimeout(openingTimer);openingTimer=setTimeout(closeOpening,260)}
  opening.setAttribute("tabindex","-1");opening.focus({preventScroll:true});
}

const offerings = [
  {name:"VACS Arohan Class",icon:"spiritual-growth.png",text:"Ease mental stress and emotional turmoil while gaining deeper clarity about life and its purpose. Through guided methods of self-reflection and self-study, you can strengthen your inner self, build resilience, and connect with your core—your true self beyond external identities. Experience powerful processes designed to expand awareness and cognition, helping you grow, enhance, and upgrade yourself into a more balanced and conscious version of who you are."},
  {name:"Heartful Listening",icon:"guidance-support.png",text:"A service to provide relief wherein trained Listeners receive your expression. This is a confidential and free-from-judgement platform to express yourself openly, to trusted and trained Listeners. It declutters the mind to regain clarity and helps one feel light and free from within by letting go of the unnecessary baggage."},
  {name:"Heart-Centred Yog by Maitri Oorja",icon:"inner-awareness.png",text:"A dedicated space specially for members of the film and entertainment industry to slow down, reconnect, and return within. Combining mindful movement, conscious breathing, and effective meditation techniques, the sessions help cultivate body awareness, release tension, and deepen the connection to the present moment."},
  {name:"Skills Training",icon:"creative-expression.png",text:"Diverse range of skill-based training programs, immersive sessions, and exclusive masterclasses designed to nurture talent and build professional excellence. These programs are conducted by invited faculty, industry experts, and accomplished professionals who bring with them rich experience, practical insights, and real-world knowledge. These programs help develop and strengthen skills in various creative disciplines and empower with confidence, craft, and competence required to grow in the chosen field."},
  {name:"Value Based Plays and Short Films",icon:"storytelling.png",text:"A platform to bring together established and upcoming, like-hearted individuals from the fraternity to collaborate on meaningful plays, films and performances which are rooted in strong values to encourage positivity and a deeper sense of purpose in the audience. We present stories which awaken hearts, inspire friendships and nurtures a better more compassionate and values-driven society."},
  {name:"Fellowship Programme",icon:"community.png",text:"In a world full of competition and chaos an upcoming artist often finds it to be intimidating and demotivating to continue to express their art. This fellowship programme inspires, helps and supports true artists to stay motivated towards their journey of creating art and expressing their talent."},
  {name:"Events",icon:"film-media.png",text:"Bringing together individuals from various fields of the industry through events such as movie screenings and discussions, creating opportunities to connect and bond over the true essence of art. Our aim is to return to the roots, stay grounded in the truth and ensure that amidst the material world we stay connected in the deeper artistic as well as human values."},
  {name:"Awards",icon:"cultural-roots.png",text:"Recognising and honouring individuals, artists and groups who create meaningful art that has a positive impact on the human mind, crediting those who produce work which not only reflects excellence in the craft but also inspires society in a constructive and uplifting way. We celebrate artists who perform and express their art in a unique manner while contributing positively to the cultural fabric of society."},
  {name:"Collaborations",icon:"emotional-harmony.png",text:"Meaningful collaborations with esteemed institutions of the film and entertainment industry to integrate our offerings for the wellbeing of their faculty."}
];

const trustees = [
  {name:"Smita Jayakar",role:"Actor & Spiritual Healer",image:"smita-jayakar.webp",profile:"Smita Jayakar has been a part of the Indian Film Industry for over 35 years. She has worked in 23 blockbuster Bollywood films, contributing pivotal roles in Devdas, Hum Dil De Chuke Sanam, Sarfarosh, Mujhse Dosti Karoge, Ek Vivaah Aisa Bhi, and Ajab Prem Ki Ghazab Kahani. She is the author of three life-changing books and a transformative speaker, inspiring countless lives through her wisdom and presence. Her life's purpose is to support the vision of Maitreya Dadashreeji, in transforming humanity.",quote:"As actors we are always wearing masks of the characters we play. We never get to really meet ourselves. We get lost in the roles and paparazzi. We only meet ourselves when we get older or when there is no work. By then it is very difficult to deal with that situation when people don’t recognise you anymore, people don’t give you work anymore… So you need to meet yourself at the right time, early on and this happens only on the spiritual path. Spirituality is most essential for actors to be true to themselves and deal with, not just the highs but also to face the lows of this career path."},
  {name:"Makarand Deshpande",role:"Actor, Writer & Director",image:"makarand-deshpande-portrait.webp",profile:"Makarand Deshpande is an Indian actor, writer, and director in Hindi, Kannada, Marathi, Telugu, Malayalam, Tamil films, and Indian theatre. He is often seen in supporting pivotal roles in films like Jungle, Sarfarosh, Swades, Makdee and Satya. He made his English-language debut in the 2024 film Monkey Man, directed by Dev Patel. He has directed five films and has contributed to theatre with over 50 short plays and 40 full-length plays, including Sir Sir Sirla, Joke, Maa In Transit, Krishna Kidding, Shakespearcha Mhatara and more. He founded the Ansh Theatre Group in the year 1993."},
  {name:"Kajal Aggarwal",role:"Actor & Entrepreneur",image:"kajal-aggrawal.webp",profile:"Kajal Aggarwal is a leading Indian film actor known for her work across Telugu, Tamil and Hindi cinema. With a career spanning nearly two decades, and more than 70 movies, she has built a reputation for versatility, grace, and strong screen presence. She seamlessly balances mainstream success with meaningful, character-driven roles. Beyond films, Kajal is admired for her elegance, discipline, and grounded worldview. She is also an entrepreneur and a voice for mindful living and conscious choices. As an artist, she believes cinema should entertain, reflect society, and carry emotional truth.",quote:"Films don’t just entertain, they teach us how to feel, love, and become. Without sanskārs – values, art turns into content. With them, cinema becomes conscience. And in returning to our roots, we don’t go back, we go deeper!"},
  {name:"Addinath Kothare",role:"Actor, Writer & Director",image:"addinath-kothare.webp",profile:"Addinath M. Kothare is an Indian actor, director, writer and producer who predominantly works in the Marathi and Hindi feature films, web series, TV shows and theatre industry. He has received numerous accolades, including a National Film Award, a Maharashtra State Film Award, three Filmfare Marathi Awards and four Zee Chitra Gaurav Puraskar.",quote:"Creativity is heavily dependant on the most miraculous piece of machinery called the mind. To evolve in our creativity we first need to evolve our mind. The most user friendly application that I have come across to help me achieve this is – Spirituality! The spiritual path guided by Maitreya Dadashreeji has helped me open the doors and windows of my mind to the universe which has helped me harness my creative flow. If creativity is like the Earth then spirituality is the Sun to our Earth."},
  {name:"Aaditi Pohankar",role:"Actor",image:"aaditi-pohankar.webp",profile:"Aaditi Pohankar is a talented Indian actress celebrated for her powerful and nuanced performances. She marked her screen debut with the Marathi blockbuster Lai Bhaari. Her breakthrough came with the acclaimed Netflix series She, where she won praise for her compelling portrayal of Bhumi. Known for her fearless choices and authentic screen presence, she stands out among her peers. Aaditi continues to emerge as one of the most promising and dynamic talents in India’s digital and film landscape.",quote:"The struggle ends. The struggle to win, to be famous, to be rich. When you meet your higher self within and realize that your life’s purpose is beyond this maze—where it is easy to get lost, lose confidence, and where your integrity is constantly tested—you are left with no guidance. That’s when a strong value system helps you realize that I am just an actor and this is my work, but there is more to my life’s purpose."},
  {name:"Shaan Uttamsingh",role:"Entrepreneur",image:"shaan-uttamsingh.webp",profile:"Shaan Uttamsingh is an entrepreneur deeply involved in the media and entertainment industry. He is the grandson of the pioneer GP Sippy, and building on this legacy, Shaan has helped shape the evolution of trademark and intellectual property rights within the film industry. His formative years were spent in the United States, after which he returned to India to complete his graduation and further connect with the culture and values of the country.|||He has led and managed companies such as Sippy Films Pvt. Ltd. and Sholay Media & Entertainment Pvt. Ltd., contributing toward vision, growth, and long-term value creation. With over 26 years of experience in building and running companies in the industry, he has played a significant role in creating, protecting, and strengthening valuable intellectual properties.|||Alongside his professional journey, he has remained deeply engaged in philanthropic and spiritual initiatives. He has been associated with Maitreya Dadashreeji since 2013 and is currently presiding over multiple trusts, reflecting his commitment to selfless service, leadership, and an objective perspective toward collective growth. His approach is rooted in bringing people and purpose together through thoughtful guidance and responsible stewardship. He continues to inspire collaborative progress by balancing vision with integrity and action with compassion."},
  {name:"Maitreyi Saundarya",role:"Spiritual Guide & Speaker",image:"maitreyi-saundarya.webp",profile:"Maitreyi Saundarya is a Spiritual Guide and Speaker at MaitriBodh Parivaar. Her journey of self-exploration and finding her purpose of life led her towards the spiritual path and later to meet Maitreya Dadashreeji in 2013, a meeting which changed the course of her life.|||Under Dadashreeji’s guidance, her inner potential was unlocked leading to a tremendous positive shift. Through the development of the bond with the inner Divine (Higher Sacred Self) and strengthening of her inner voice she discovered her true calling or purpose of life. Ever since, she has devoted herself to Dadashreeji’s mission to Transform Humanity and establish One World One Family, One Truth by spreading true knowledge which frees an individual from within enabling them lead a wholesome life.|||Maitreyi Saundarya has been guiding influencers, leaders, celebrities, professionals, youth and individuals from all walks of life to incorporate spirituality as a very powerful means to an end. She has been invited to conduct sessions on national and international platforms such as TEDx, the CiO Klub, Tibet Hope Centre, Cathedral & John Connon school, Ficci Flo and more. Through her guidance, people have found their own paths, addressed and overcome blocks, mended relationships, incorporated the right lifestyle, and experienced a state of internal peace, positivity and happiness.",quote:"Spirituality is not a separate path of life but an added strength to live the same life in a better way."}
];

const formDefinitions = {
  member:{title:"Become a member",description:"Tell us about your journey in the film and entertainment fraternity.",fields:[{name:"industry_role",label:"Industry role",type:"text"},{name:"experience",label:"Years of experience",type:"text"},{name:"areas_of_interest",label:"Areas of interest",type:"text"}]},
  volunteer:{title:"Volunteer with us",description:"Share how you would like to offer your time and skills.",fields:[{name:"skills",label:"Skills",type:"text"},{name:"availability",label:"Availability",type:"text"},{name:"preferred_contribution",label:"Preferred contribution",type:"text"}]},
  collaborate:{title:"Collaborate with us",description:"Introduce your organisation or creative proposal.",fields:[{name:"organization",label:"Organisation",type:"text"},{name:"collaboration_type",label:"Collaboration type",type:"text"},{name:"proposal_summary",label:"Proposal summary",type:"textarea"}]},
  support:{title:"Support the mission",description:"Tell us how you would like to support the mission.",fields:[{name:"support_type",label:"Type of support",type:"text"},{name:"preferred_contact_method",label:"Preferred contact method",type:"select",options:["Email","Phone","WhatsApp"]}]}
};

const offeringGrid=document.querySelector("#offering-grid");
offerings.forEach((item,index)=>{const article=document.createElement("article");article.className="offering-card reveal";article.style.setProperty("--delay",`${(index%3)*55}ms`);article.innerHTML=`<span class="offering-head"><img src="assets/icons/${item.icon}" width="116" height="116" alt=""></span><h3>${item.name}</h3><p>${item.text}</p>`;offeringGrid.append(article)});

const trusteeGrid=document.querySelector("#trustee-grid");
const detail=document.querySelector("#trustee-detail");
let activeTrustee=0;
trustees.forEach((person,index)=>{const button=document.createElement("button");button.className="trustee-card reveal";button.type="button";button.setAttribute("aria-controls","trustee-detail");button.setAttribute("aria-label",`View ${person.name}'s trustee profile`);button.style.setProperty("--delay",`${(index%4)*55}ms`);button.innerHTML=`<span class="trustee-photo"><img src="assets/images/${person.image}" width="900" height="1200" loading="lazy" alt="${person.name}"></span><span class="trustee-meta"><h3>${person.name}</h3><p>${person.role}</p></span>`;button.addEventListener("click",()=>showTrustee(index,true));trusteeGrid.append(button)});
trusteeGrid.querySelectorAll("img").forEach(image=>image.src+=image.src.includes("?")?"&pdf=2":"?pdf=2");
function showTrustee(index,shouldScroll=false){
  const movement=index===activeTrustee?0:index>activeTrustee?1:-1;
  activeTrustee=(index+trustees.length)%trustees.length;
  const person=trustees[activeTrustee];
  const profileIntro=person.profile.split("|||").map(p=>"<p>"+p+"</p>").join(""),profileMore="";
  trusteeGrid.querySelectorAll("button").forEach((item,itemIndex)=>{const half=Math.floor(trustees.length/2);const offset=((itemIndex-activeTrustee+trustees.length+half)%trustees.length)-half;const distance=Math.abs(offset);item.classList.toggle("active",itemIndex===activeTrustee);item.setAttribute("aria-current",itemIndex===activeTrustee?"true":"false");item.style.setProperty("--arc-x",`${offset*88}%`);item.style.setProperty("--arc-y",`${distance*24}px`);item.style.setProperty("--arc-turn",`${offset*-9}deg`);item.style.setProperty("--arc-scale",String(1-distance*.075));item.style.setProperty("--arc-opacity",String(1-distance*.16));item.style.zIndex=String(10-distance)});
  detail.classList.remove("profile-enter");void detail.offsetWidth;
  detail.dataset.direction=movement<0?"previous":"next";
  detail.innerHTML=`<figure class="trustee-detail-portrait"><img src="assets/images/${person.image}" width="900" height="1200" alt="${person.name}"></figure><div class="trustee-detail-copy"><div class="trustee-identity"><h3>${person.name}</h3><p class="trustee-role">${person.role}</p></div><div class="trustee-biography">${profileIntro}${profileMore||person.quote?`<details><summary>Read full profile</summary>${profileMore?`<p>${profileMore}</p>`:""}${person.quote?`<blockquote>"${person.quote}"</blockquote>`:""}</details>`:""}</div></div>`;
  detail.querySelector("img").src+="?pdf=2";
  detail.querySelector("details")?.setAttribute("open","");
  detail.classList.add("profile-enter");
  if(shouldScroll&&matchMedia("(max-width: 900px)").matches)detail.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center"});
}
showTrustee(0);

document.querySelectorAll(".value-button").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll(".value-button").forEach(item=>item.classList.remove("active"));button.classList.add("active");const art=document.querySelector("#active-value-art");art.classList.add("is-changing");setTimeout(()=>{art.src=`assets/values/${button.dataset.image}`;art.classList.remove("is-changing")},180)}));

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
