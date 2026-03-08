(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=t(a);fetch(a.href,l)}})();function J(e){return`
    <div class="lang-switch d-flex align-items-center" role="group" aria-label="Language switch">
      <button class="lang-btn ${e==="fr"?"active":""}" data-lang="fr" type="button">FR</button>
      <button class="lang-btn ${e==="ar"?"active":""}" data-lang="ar" type="button">AR</button>
    </div>
  `}function Y(e){return`
    <header class="mupsa-header">
      <div class="mupsa-header-top"></div>
      <div class="mupsa-header-bar card border-0">
        <div class="mupsa-header-logos" aria-label="Institutions partenaires">
          <img src="/logo/omsa.png" alt="OMSA" onerror="this.style.display='none'" />
          <img src="/logo/praps.jpg" alt="PRAPS" onerror="this.style.display='none'" />
        </div>
        ${J(e)}
      </div>
    </header>
  `}const M={fr:{title:"MuPsA",subtitle:"Guide terrain pour le personnel de la santé animale",diseases:"Maladies",procedures:"Procédures",symptoms:"Symptômes",search:"Recherche",loading:"Chargement...",error:"Erreur de chargement",home:"Accueil",back:"Retour",noData:"Aucune donnée",noResults:"Aucun résultat",species:"Espèces",allSpecies:"Toutes",close:"Fermer",content:"Contenu",sources:"Sources",notes:"Notes",likelyDiseases:"Maladies probables",clinicalSigns:"Signes cliniques",lesions:"Lésions",transmission:"Transmission",samples:"Prélèvements",treatment:"Traitement",generalNotes:"Notes générales",actionGuidance:"Conduite à tenir",openImage:"Galerie d'images",imageGallery:"Galerie d'images",diseaseSearchPlaceholder:"Rechercher une maladie",procedureSearchPlaceholder:"Rechercher une procédure",symptomSearchPlaceholder:"Rechercher un symptôme",searchPlaceholder:"Rechercher dans les maladies, procédures et symptômes",groupedDiseases:"Maladies",groupedProcedures:"Procédures",groupedSymptoms:"Symptômes",diseaseCount:"maladies",symptomCount:"symptômes associés",sectionFilter:"Filtrer",sectionResults:"Résultats",noImage:"Aucune image disponible",noNotes:"Aucune note",noSources:"Source non renseignée",quickAccess:"Accès rapide",mobileGuide:"Application terrain mobile-first pour l'aide à la décision vétérinaire.",installCta:"Installez MuPsA pour un accès rapide, même hors connexion.",installButton:"Installer l'application",installHint:"Sur Chrome Android : ouvrez le menu puis choisissez Installer l'application."},ar:{title:"MuPsA",subtitle:"دليل ميداني لصحة الحيوان",diseases:"الأمراض",procedures:"الإجراءات",symptoms:"الأعراض",search:"البحث",loading:"جار التحميل...",error:"خطأ في التحميل",home:"الرئيسية",back:"رجوع",noData:"لا توجد بيانات",noResults:"لا توجد نتائج",species:"الأنواع",allSpecies:"الكل",close:"إغلاق",content:"المحتوى",sources:"المصادر",notes:"ملاحظات",likelyDiseases:"الأمراض المحتملة",clinicalSigns:"العلامات السريرية",lesions:"الآفات",transmission:"الانتقال",samples:"العينات",treatment:"العلاج",generalNotes:"ملاحظات عامة",actionGuidance:"التدابير",openImage:"معرض الصور",imageGallery:"معرض الصور",diseaseSearchPlaceholder:"ابحث عن مرض",procedureSearchPlaceholder:"ابحث عن إجراء",symptomSearchPlaceholder:"ابحث عن عرض",searchPlaceholder:"ابحث في الأمراض والإجراءات والأعراض",groupedDiseases:"الأمراض",groupedProcedures:"الإجراءات",groupedSymptoms:"الأعراض",diseaseCount:"مرض",symptomCount:"أعراض مرتبطة",sectionFilter:"التصفية",sectionResults:"النتائج",noImage:"لا توجد صور",noNotes:"لا توجد ملاحظات",noSources:"لا توجد مصادر",quickAccess:"الوصول السريع",mobileGuide:"تطبيق ميداني للهاتف الذكي لدعم القرار البيطري.",installCta:"ثبت MuPsA للوصول السريع حتى بدون اتصال.",installButton:"تثبيت التطبيق",installHint:"على Chrome Android: افتح القائمة ثم اختر تثبيت التطبيق."}};let P="fr";function K(e){P=e==="ar"?"ar":"fr",document.documentElement.lang=P,document.documentElement.dir=P==="ar"?"rtl":"ltr"}function i(e){return M[P]?.[e]??M.fr[e]??e}function _(e,s){return s==="home"?e==="home"?"active":"":s==="diseases"?e==="diseases"||e==="disease"?"active":"":s==="procedures"?e==="procedures"||e==="procedure"?"active":"":s==="symptoms"?e==="symptoms"||e==="symptom"?"active":"":s==="search"&&e==="search"?"active":""}function Z(e){return`
    <nav class="bottom-nav" aria-label="Navigation principale">
      <a href="#/home" class="bottom-nav-item ${_(e,"home")}">
        <i class="bi bi-house-door"></i>
        <span>${i("home")}</span>
      </a>
      <a href="#/diseases" class="bottom-nav-item ${_(e,"diseases")}">
        <i class="bi bi-shield-plus"></i>
        <span>${i("diseases")}</span>
      </a>
      <a href="#/procedures" class="bottom-nav-item ${_(e,"procedures")}">
        <i class="bi bi-clipboard2-pulse"></i>
        <span>${i("procedures")}</span>
      </a>
      <a href="#/symptoms" class="bottom-nav-item ${_(e,"symptoms")}">
        <i class="bi bi-activity"></i>
        <span>${i("symptoms")}</span>
      </a>
      <a href="#/search" class="bottom-nav-item ${_(e,"search")}">
        <i class="bi bi-search"></i>
        <span>${i("search")}</span>
      </a>
    </nav>
  `}function X({available:e=!1,installed:s=!1,showFallback:t=!1}){return s?"":e?`
      <section class="install-banner card border-0" aria-label="pwa-install-banner">
        <div class="install-banner-body">
          <div class="install-banner-copy">
            <i class="bi bi-phone-vibrate"></i>
            <p class="mb-0">${i("installCta")}</p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-success btn-sm" data-install-app>${i("installButton")}</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-install-dismiss>${i("close")}</button>
          </div>
        </div>
      </section>
    `:t?`
      <section class="install-hint card border-0" aria-label="pwa-install-hint">
        <div class="install-banner-copy">
          <i class="bi bi-download"></i>
          <p class="mb-0">${i("installHint")}</p>
        </div>
      </section>
    `:""}const ee=/^\s*\.{3,}\s*$/gm,se=/^\s*(?:\.\s*){3,}\s*$/gm,te=/(?:\.\s*){3,}\s*\d+\s*$/gm,ae=/^\d+\s*$/gm,ie=/^\s*[a-zA-Z]\s*$/gm,re=/\bM\.?\s*U\.?\s*P\.?\s*S\.?\s*A(?:\s*\d+)?\b/gi;function D(e){return String(e??"").replace(/\r\n?/g,`
`).replace(ee,"").replace(se,"").replace(te,"").replace(ae,"").replace(re,"").replace(ie,"").replace(/[ \t]{2,}/g," ").split(`
`).map(t=>t.trim()).filter(Boolean).join(`
`).trim()}const S={fr:null,ar:null};let T="fr";function O(e){if(!e||typeof e!="string")return"";const s=e.replaceAll("\\","/");return s.startsWith("output/images/")?`/${s.replace("output/images/","images/")}`:s.startsWith("output/thumbs/")?`/${s.replace("output/thumbs/","thumbs/")}`:s.startsWith("/")?s:`/${s}`}function g(e){return D(String(e??""))}function d(e){return(Array.isArray(e)?e:[]).map(s=>g(s)).filter(Boolean)}function ne(e){return d(e).filter(s=>{const t=s.toLowerCase();return!t.includes("mesures")&&!t.includes("recommandations")&&!t.includes("mupsa")})}function le(e={}){return{...e,title:g(e.title),summary:g(e.summary),content:d(e.content),notes:d(e.notes),clinical_signs:d(e.clinical_signs),lesions:d(e.lesions)}}function oe(e={}){return{...e,title:g(e.title),summary:g(e.summary),content:d(e.content),notes:d(e.notes),clinical_signs:d(e.clinical_signs),lesions:d(e.lesions)}}function ce(e={}){return{...e,title:g(e.title),symptom_title:g(e.symptom_title),summary:g(e.summary),content:d(e.content),notes:d(e.notes),clinical_signs:d(e.clinical_signs),lesions:d(e.lesions),likely_diseases:ne(e.likely_diseases)}}function I(e,s){return(Array.isArray(e)?e:[]).map(t=>({...s(t||{}),images:(Array.isArray(t?.images)?t.images:[]).map(a=>({...a,file:O(a?.file||""),thumb:O(a?.thumb||"")}))}))}function de(e){return{...e,diseases:I(e?.diseases,le),procedures:I(e?.procedures,oe),symptom_maps:I(e?.symptom_maps,ce)}}async function ue(e){const s=e==="ar"?"ar":"fr";if(T=s,!S[s]){const t=await fetch(`/data/pwa_content.${s}.final.json`,{cache:"no-cache"});if(!t.ok)throw new Error(`Impossible de charger /data/pwa_content.${s}.final.json (${t.status})`);const r=await t.json();S[s]=de(r),console.info("[data] language loaded",s)}return S[s]}function z(e,s=3){return(Array.isArray(e)?e:[]).map(t=>String(t||"").trim()).filter(Boolean).slice(0,s)}function x(e){const s=Array.isArray(e?.images)?e.images:[];if(!s.length)return null;const t=s[0],r=t?.thumb||t?.file||"",a=t?.file||t?.thumb||"";return!r&&!a?null:{thumb:r,file:a}}function me(e=[]){const s=new Set;return(Array.isArray(e)?e:[]).forEach(t=>{(Array.isArray(t?.species)?t.species:[]).forEach(r=>{const a=String(r||"").trim();a&&s.add(a)})}),[...s].sort((t,r)=>t.localeCompare(r,"fr"))}function pe(e,s){const t=String(s||"").trim().toLowerCase();if(!t)return{diseases:[],procedures:[],symptom_maps:[]};const r=e||S[T]||S.fr||S.ar||{},a=l=>JSON.stringify(l||{}).toLowerCase().includes(t);return{diseases:(Array.isArray(r.diseases)?r.diseases:[]).filter(a),procedures:(Array.isArray(r.procedures)?r.procedures:[]).filter(a),symptom_maps:(Array.isArray(r.symptom_maps)?r.symptom_maps:[]).filter(a)}}function he(e){return(e||"#/home").replace(/^#/,"").trim()||"/home"}function ge(e){const s=e.replace(/\/+$/,"")||"/home";if(s==="/"||s==="/home")return{name:"home",params:{}};if(s==="/diseases")return{name:"diseases",params:{}};if(s==="/procedures")return{name:"procedures",params:{}};if(s==="/symptoms")return{name:"symptoms",params:{}};if(s==="/search")return{name:"search",params:{}};const t=s.match(/^\/disease\/([^/]+)$/);if(t)return{name:"disease",params:{id:decodeURIComponent(t[1])}};const r=s.match(/^\/procedure\/([^/]+)$/);if(r)return{name:"procedure",params:{id:decodeURIComponent(r[1])}};const a=s.match(/^\/symptom\/([^/]+)$/);return a?{name:"symptom",params:{id:decodeURIComponent(a[1])}}:{name:"home",params:{}}}function fe(e=window.location.hash){return ge(he(e))}function be(e){const s=()=>e(fe());window.addEventListener("hashchange",s),s()}const R=new Set,h={lang:"fr",content:null,loading:!0,error:""};function k(e){Object.assign(h,e),R.forEach(s=>s(h))}function ye(e){return R.add(e),()=>R.delete(e)}function m(e){return Array.isArray(e)?e:[]}function n(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function A(e){return m(e).map(s=>`<li>${n(s)}</li>`).join("")}function N(e){return m(e).map(s=>`${n(s?.pdf||"source")} - p.${n(s?.page??"?")}`).join("<br>")}function f({title:e,message:s}){return`
    <section class="empty-state card border-0">
      <div class="empty-icon"><i class="bi bi-inbox"></i></div>
      <h3>${n(e||"-")}</h3>
      ${s?`<p>${n(s)}</p>`:""}
    </section>
  `}function j({images:e=[]}){const s=m(e);return s.length?`
    <section class="gallery-grid">
      ${s.map((t,r)=>`
        <button class="gallery-item" data-gallery-open="${n(t.file||t.thumb||"")}" data-gallery-alt="${n(t.image_id||`img-${r}`)}" type="button">
          <img src="${n(t.thumb||t.file||"")}" alt="${n(t.image_id||`image-${r}`)}" loading="lazy" />
        </button>
      `).join("")}
    </section>

    <div class="media-modal" id="image-modal" hidden>
      <div class="media-modal-backdrop" data-gallery-close></div>
      <div class="media-modal-panel">
        <button class="btn close-modal-btn" data-gallery-close type="button">
          <i class="bi bi-x-lg"></i> ${i("close")}
        </button>
        <img id="image-modal-content" src="" alt="" />
      </div>
    </div>
  `:`<div class="empty-inline">${i("noData")}</div>`}function $e(e){return String(e||"").replaceAll("-"," ").replaceAll(/\s+/g," ").trim()}function $(e,s,t="bi-dot"){const r=m(s).map(a=>String(a||"").trim()).filter(Boolean);return r.length?`
    <section class="detail-section card border-0">
      <h3><i class="bi ${t}"></i> ${n(e)}</h3>
      <ul class="detail-list">${A(r)}</ul>
    </section>
  `:""}function ve(e,s){const t=m(e?.images),r=t[0]?.file||t[0]?.thumb||"";return r?`
    <section class="hero-image card border-0">
      <img src="${n(r)}" alt="${n(s)}" loading="lazy" />
    </section>
  `:""}function we({disease:e}){if(!e)return f({title:i("noData"),message:i("diseases")});const s=$e(e?.title)||"-",t=m(e.species).map(r=>`<span class="species-badge">${n(r)}</span>`).join("");return`
    <section class="detail-topbar card border-0 d-flex align-items-center justify-content-between">
      <a class="back-btn" href="#/diseases"><i class="bi bi-arrow-left"></i> ${i("back")}</a>
      <button class="fav-btn" type="button" aria-label="favorite"><i class="bi bi-bookmark"></i></button>
    </section>

    ${ve(e,s)}

    <section class="detail-summary card border-0">
      <h2>${n(s)}</h2>
      <div class="species-badges">${t||'<span class="muted">-</span>'}</div>
    </section>

    ${$(i("clinicalSigns"),e.clinical_signs,"bi-activity")}
    ${$(i("lesions"),e.lesions,"bi-bandaid")}
    ${$(i("transmission"),e.transmission,"bi-arrow-left-right")}
    ${$(i("samples"),e.samples,"bi-eyedropper")}
    ${$(i("treatment"),e.treatment,"bi-capsule-pill")}
    ${$(i("generalNotes"),e.general_notes,"bi-journal-text")}
    ${$(i("actionGuidance"),e.actions,"bi-shield-check")}

    <section class="detail-section card border-0">
      <h3><i class="bi bi-link-45deg"></i> ${i("sources")}</h3>
      <p class="sources-text">${N(e.source_pages)||"-"}</p>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-images"></i> ${i("openImage")}</h3>
      ${j({images:e.images})}
    </section>
  `}function Se(e){return String(e||"").replaceAll("-"," ").replaceAll(/\s+/g," ").trim()}function q({disease:e,excerpt:s=[],cover:t}){const r=Array.isArray(e?.species)?e.species.filter(Boolean):[],a=Se(e?.title)||"-";return`
    <a class="entity-card card border-0" href="#/disease/${encodeURIComponent(e?.id||"")}">
      <div class="entity-card-content d-flex align-items-center gap-3">
        <div class="entity-main flex-grow-1">
          <h3 class="entity-title mb-1">${n(a)}</h3>
          <p class="entity-subtitle mb-2">${r.length?n(r.join(" • ")):"-"}</p>
          ${s.length?`<ul class="entity-list">${A(s.slice(0,3))}</ul>`:""}
        </div>

        ${t?`<img class="entity-thumb" src="${n(t.thumb)}" alt="${n(a)}" loading="lazy" />`:'<div class="entity-thumb entity-thumb-empty"><i class="bi bi-image"></i></div>'}
      </div>
      <i class="bi bi-chevron-right entity-chevron" aria-hidden="true"></i>
    </a>
  `}function C({id:e,value:s="",placeholder:t="",label:r=""}){return`
    <label class="search-shell" for="${n(e)}">
      <span class="visually-hidden">${n(r||t)}</span>
      <i class="bi bi-search"></i>
      <input
        id="${n(e)}"
        class="form-control search-input"
        type="search"
        value="${n(s)}"
        placeholder="${n(t)}"
        autocomplete="off"
      />
    </label>
  `}function Ae({selected:e="all",options:s=[]}){return`
    <label class="filter-shell" for="species-filter">
      <span class="filter-label">${i("species")}</span>
      <select id="species-filter" class="form-select species-select">
        <option value="all" ${e==="all"?"selected":""}>${i("allSpecies")}</option>
        ${s.map(t=>`<option value="${n(t)}" ${e===t?"selected":""}>${n(t)}</option>`).join("")}
      </select>
    </label>
  `}function _e({content:e,diseaseQuery:s="",speciesFilter:t="all"}){const r=Array.isArray(e?.diseases)?e.diseases:[],a=s.trim().toLowerCase(),l=r.filter(y=>{const V=t==="all"||Array.isArray(y?.species)&&y.species.some(W=>String(W||"").toLowerCase()===t.toLowerCase()),U=!a||JSON.stringify(y||{}).toLowerCase().includes(a);return V&&U}),o=`
    <section class="view-head card border-0">
      <h2 class="view-title">${i("diseases")}</h2>
      <div class="d-flex flex-column gap-2">
        ${C({id:"disease-search",value:s,placeholder:i("diseaseSearchPlaceholder"),label:i("diseaseSearchPlaceholder")})}
        ${Ae({selected:t,options:me(r)})}
      </div>
    </section>
  `;return l.length?`
    ${o}
    <section class="view-list d-flex flex-column gap-3">
      ${l.map(y=>q({disease:y,excerpt:z(y?.clinical_signs,3),cover:x(y)})).join("")}
    </section>
  `:`${o}${f({title:i("noResults"),message:i("diseases")})}`}function Le(e){return`
    <section class="state-view card border-0 error-view">
      <div class="state-icon"><i class="bi bi-exclamation-triangle"></i></div>
      <h3>${i("error")}</h3>
      <p>${e||""}</p>
    </section>
  `}function Pe(){return`
    <section class="hero-card home-hero card border-0">
      <div class="hero-logos" aria-hidden="true">
        <img src="/logo/omsa.png" alt="" onerror="this.style.display='none'" />
        <img src="/logo/praps.jpg" alt="" onerror="this.style.display='none'" />
      </div>
      <h2 class="hero-title">MuPsA</h2>
      <p class="hero-subtitle">${i("subtitle")}</p>
    </section>

    <section class="tiles-grid row g-3">
      <div class="col-6">
        <a class="home-tile tile-beige" href="#/diseases">
          <i class="bi bi-shield-plus"></i>
          <span>${i("diseases")}</span>
        </a>
      </div>
      <div class="col-6">
        <a class="home-tile tile-green" href="#/procedures">
          <i class="bi bi-clipboard2-pulse"></i>
          <span>${i("procedures")}</span>
        </a>
      </div>
      <div class="col-6">
        <a class="home-tile tile-blue" href="#/symptoms">
          <i class="bi bi-activity"></i>
          <span>${i("symptoms")}</span>
        </a>
      </div>
      <div class="col-6">
        <a class="home-tile tile-cream" href="#/search">
          <i class="bi bi-search"></i>
          <span>${i("search")}</span>
        </a>
      </div>
    </section>
  `}function xe(){return`
    <section class="state-view card border-0">
      <div class="spinner-border text-success" role="status" aria-hidden="true"></div>
      <p>${i("loading")}</p>
    </section>
  `}function Ce(e){return D(String(e||"")).replaceAll("diagnostic_or_field_procedure","Procédure de terrain").replaceAll("_"," ").replaceAll(/\s+/g," ").trim()}function Ie(e){return/^(?:\.\s*){3,}$/.test(String(e||"").trim())}function ke({procedure:e}){if(!e)return f({title:i("noData"),message:i("procedures")});const s=m(e.content).map(a=>Ce(a)).filter(a=>a&&!Ie(a)),t=m(e.images),r=t[0]?.file||t[0]?.thumb||"";return`
    <section class="detail-topbar card border-0 d-flex align-items-center justify-content-between">
      <a class="back-btn" href="#/procedures"><i class="bi bi-arrow-left"></i> ${i("back")}</a>
      <span class="chip chip-blue"><i class="bi bi-clipboard2-pulse"></i> ${n(e.section||"Procédure")}</span>
    </section>

    ${r?`<section class="hero-image card border-0"><img src="${n(r)}" alt="${n(e.title||"")}" loading="lazy" /></section>`:""}

    <section class="detail-summary card border-0">
      <h2>${n(e.title||"-")}</h2>
      <p class="muted mb-0">${n(e.section||"")}</p>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-list-check"></i> ${i("content")}</h3>
      ${s.length?`<ul class="detail-list">${A(s)}</ul>`:"<p>-</p>"}
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-link-45deg"></i> ${i("sources")}</h3>
      <p class="sources-text">${N(e.source_pages)||"-"}</p>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-images"></i> ${i("openImage")}</h3>
      ${j({images:e.images})}
    </section>
  `}function Ee(e){return D(String(e)).replaceAll("diagnostic_or_field_procedure","Procédure de terrain").replaceAll("_"," ").replaceAll(/\s+/g," ").trim()}function G({procedure:e,cover:s,summary:t=""}){return`
    <a class="entity-card card border-0" href="#/procedure/${encodeURIComponent(e?.id||"")}">
      <div class="entity-card-content d-flex align-items-center gap-3">
        <div class="entity-main flex-grow-1">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="chip chip-blue"><i class="bi bi-clipboard2-pulse"></i> ${n(e?.section||"Procédure")}</span>
          </div>
          <h3 class="entity-title mb-1">${n(e?.title||"-")}</h3>
          <p class="entity-subtitle mb-0">${n(Ee(t||"-"))}</p>
        </div>

        ${s?`<img class="entity-thumb" src="${n(s.thumb)}" alt="${n(e?.title||"")}" loading="lazy" />`:'<div class="entity-thumb entity-thumb-empty"><i class="bi bi-file-text"></i></div>'}
      </div>
      <i class="bi bi-chevron-right entity-chevron" aria-hidden="true"></i>
    </a>
  `}function Re({content:e,query:s=""}){const t=Array.isArray(e?.procedures)?e.procedures:[],r=s.trim().toLowerCase(),a=t.filter(o=>!r||JSON.stringify(o||{}).toLowerCase().includes(r)),l=`
    <section class="view-head card border-0">
      <h2 class="view-title">${i("procedures")}</h2>
      ${C({id:"procedure-search",value:s,placeholder:i("procedureSearchPlaceholder")})}
    </section>
  `;return a.length?`
    ${l}
    <section class="view-list d-flex flex-column gap-3">
      ${a.map(o=>G({procedure:o,cover:x(o),summary:(o?.content||[]).slice(0,2).join(" ")||"-"})).join("")}
    </section>
  `:`${l}${f({title:i("noResults"),message:i("procedures")})}`}function De(e){const s=String(e||"").trim(),t=s.toLowerCase();return!(!s||t.includes("mesures")||t.includes("recommandations")||t.includes("mupsa"))}function Q({symptom:e}){const s=(Array.isArray(e?.likely_diseases)?e.likely_diseases:[]).map(a=>String(a||"").trim()).filter(De),t=s.slice(0,3),r=s.length;return`
    <a class="entity-card card border-0" href="#/symptom/${encodeURIComponent(e?.id||"")}">
      <div class="entity-card-content d-flex align-items-center gap-3">
        <div class="entity-main flex-grow-1">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="chip chip-sand"><i class="bi bi-exclamation-diamond"></i> ${n(String(r))}</span>
          </div>
          <h3 class="entity-title mb-1">${n(e?.symptom_title||"-")}</h3>
          ${t.length?`<ul class="entity-list">${A(t)}</ul>`:""}
        </div>
        <div class="entity-thumb entity-thumb-empty"><i class="bi bi-activity"></i></div>
      </div>
      <i class="bi bi-chevron-right entity-chevron" aria-hidden="true"></i>
    </a>
  `}function Ne({content:e,query:s=""}){const t=s.trim(),r=`
    <section class="view-head card border-0">
      <h2 class="view-title">${i("search")}</h2>
      ${C({id:"global-search",value:s,placeholder:i("searchPlaceholder"),label:i("searchPlaceholder")})}
    </section>
  `;if(!t)return`${r}${f({title:i("search"),message:i("searchPlaceholder")})}`;const a=pe(e,t);return a.diseases.length+a.procedures.length+a.symptom_maps.length?`
    ${r}

    <section class="result-group card border-0">
      <h3>${i("groupedDiseases")} <span class="chip chip-cream">${a.diseases.length}</span></h3>
      <div class="d-flex flex-column gap-3">
        ${a.diseases.map(o=>q({disease:o,excerpt:z(o?.clinical_signs,3),cover:x(o)})).join("")||`<p class="muted">${i("noResults")}</p>`}
      </div>
    </section>

    <section class="result-group card border-0">
      <h3>${i("groupedProcedures")} <span class="chip chip-blue">${a.procedures.length}</span></h3>
      <div class="d-flex flex-column gap-3">
        ${a.procedures.map(o=>G({procedure:o,cover:x(o),summary:(o?.content||[]).slice(0,2).join(" ")})).join("")||`<p class="muted">${i("noResults")}</p>`}
      </div>
    </section>

    <section class="result-group card border-0">
      <h3>${i("groupedSymptoms")} <span class="chip chip-sand">${a.symptom_maps.length}</span></h3>
      <div class="d-flex flex-column gap-3">
        ${a.symptom_maps.map(o=>Q({symptom:o})).join("")||`<p class="muted">${i("noResults")}</p>`}
      </div>
    </section>
  `:`${r}${f({title:i("noResults"),message:t})}`}function je(e){const s=String(e||"").trim(),t=s.toLowerCase();return!(!s||t.includes("mesures")||t.includes("recommandations")||t.includes("mupsa"))}function Me({symptom:e}){if(!e)return f({title:i("noData"),message:i("symptoms")});const s=m(e.likely_diseases).map(l=>String(l||"").trim()).filter(je),t=m(e.notes).map(l=>String(l||"").trim()).filter(Boolean),r=m(e.images),a=r[0]?.file||r[0]?.thumb||"";return`
    <section class="detail-topbar card border-0 d-flex align-items-center justify-content-between">
      <a class="back-btn" href="#/symptoms"><i class="bi bi-arrow-left"></i> ${i("back")}</a>
      <span class="chip chip-sand"><i class="bi bi-exclamation-diamond"></i> ${n(String(s.length))}</span>
    </section>

    ${a?`<section class="hero-image card border-0"><img src="${n(a)}" alt="${n(e.symptom_title||"")}" loading="lazy" /></section>`:""}

    <section class="detail-summary card border-0">
      <h2>${n(e.symptom_title||"-")}</h2>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-diagram-3"></i> ${i("likelyDiseases")}</h3>
      ${s.length?`<ul class="detail-list">${A(s)}</ul>`:"<p>-</p>"}
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-journal-text"></i> ${i("notes")}</h3>
      ${t.length?`<ul class="detail-list">${A(t)}</ul>`:"<p>-</p>"}
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-link-45deg"></i> ${i("sources")}</h3>
      <p class="sources-text">${N(e.source_pages)||"-"}</p>
    </section>

    <section class="detail-section card border-0">
      <h3><i class="bi bi-images"></i> ${i("openImage")}</h3>
      ${j({images:e.images})}
    </section>
  `}function Oe({content:e,query:s=""}){const t=Array.isArray(e?.symptom_maps)?e.symptom_maps:[],r=s.trim().toLowerCase(),a=t.filter(o=>!r||JSON.stringify(o||{}).toLowerCase().includes(r)),l=`
    <section class="view-head card border-0">
      <h2 class="view-title">${i("symptoms")}</h2>
      ${C({id:"symptom-search",value:s,placeholder:i("symptomSearchPlaceholder")})}
    </section>
  `;return a.length?`
    ${l}
    <section class="view-list d-flex flex-column gap-3">
      ${a.map(o=>Q({symptom:o})).join("")}
    </section>
  `:`${l}${f({title:i("noResults"),message:i("symptoms")})}`}let p,u={name:"home",params:{}};const B=new Map;let w=null;const v={diseaseQuery:"",speciesFilter:"all",procedureQuery:"",symptomQuery:"",searchQuery:""},c={available:!1,installed:!1,showFallback:!1,dismissed:!1};function Be(){const e=localStorage.getItem("mupsa-lang");return e==="fr"||e==="ar"?e:navigator.language?.toLowerCase().startsWith("ar")?"ar":"fr"}function E(e,s){return(Array.isArray(e)?e:[]).find(t=>String(t?.id||"")===String(s||""))}function Fe(){return/android/i.test(navigator.userAgent||"")}function Te(){return window.matchMedia?.("(display-mode: standalone)")?.matches||window.navigator.standalone===!0}function ze(){if(h.loading)return xe();if(h.error)return Le(h.error);const e=h.content||{};return u.name==="diseases"?_e({content:e,diseaseQuery:v.diseaseQuery,speciesFilter:v.speciesFilter}):u.name==="disease"?we({disease:E(e.diseases,u.params?.id)}):u.name==="procedures"?Re({content:e,query:v.procedureQuery}):u.name==="procedure"?ke({procedure:E(e.procedures,u.params?.id)}):u.name==="symptoms"?Oe({content:e,query:v.symptomQuery}):u.name==="symptom"?Me({symptom:E(e.symptom_maps,u.params?.id)}):u.name==="search"?Ne({content:e,query:v.searchQuery}):Pe()}function b(){const e=ze(),s=X({available:c.available&&!c.dismissed,installed:c.installed,showFallback:c.showFallback&&!c.dismissed});p.innerHTML=`
    <div class="mupsa-app">
      ${Y(h.lang)}
      ${s}
      <main class="mupsa-main">${e}</main>
      ${Z(u.name)}
    </div>
  `}async function H(e){try{k({loading:!0,error:""}),K(e);const s=await ue(e);localStorage.setItem("mupsa-lang",e),k({lang:e,content:s,loading:!1,error:""})}catch(s){k({loading:!1,error:s?.message||String(s)})}}function L(e,s,t=240){const r=B.get(e);r&&window.clearTimeout(r),B.set(e,window.setTimeout(()=>{v[e]=s,b()},t))}function qe(e,s){const t=p.querySelector("#image-modal"),r=p.querySelector("#image-modal-content");!t||!r||(r.src=e||"",r.alt=s||"",t.hidden=!1)}function F(){const e=p.querySelector("#image-modal"),s=p.querySelector("#image-modal-content");!e||!s||(e.hidden=!0,s.src="",s.alt="")}async function Ge(){if(w){w.prompt();try{await w.userChoice}catch{}w=null,c.available=!1,b()}}function Qe(){c.installed=Te(),c.showFallback=!c.installed&&Fe(),window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),w=e,c.available=!0,c.showFallback=!1,b()}),window.addEventListener("appinstalled",()=>{w=null,c.available=!1,c.installed=!0,c.showFallback=!1,b()})}function He(){p.addEventListener("click",e=>{const s=e.target.closest("[data-lang]");if(s){const l=s.getAttribute("data-lang");l&&l!==h.lang&&H(l);return}if(e.target.closest("[data-install-app]")){Ge();return}if(e.target.closest("[data-install-dismiss]")){c.dismissed=!0,b();return}const a=e.target.closest("[data-gallery-open]");if(a){qe(a.getAttribute("data-gallery-open"),a.getAttribute("data-gallery-alt"));return}e.target.closest("[data-gallery-close]")&&F()}),p.addEventListener("input",e=>{const s=e.target;s instanceof HTMLInputElement&&(s.id==="disease-search"&&L("diseaseQuery",s.value),s.id==="procedure-search"&&L("procedureQuery",s.value),s.id==="symptom-search"&&L("symptomQuery",s.value),s.id==="global-search"&&L("searchQuery",s.value))}),p.addEventListener("change",e=>{const s=e.target;s instanceof HTMLSelectElement&&s.id==="species-filter"&&(v.speciesFilter=s.value||"all",b())}),document.addEventListener("keydown",e=>{e.key==="Escape"&&F()})}function Ve(e){p=e,Qe(),He(),ye(()=>b()),be(s=>{u=s,b()}),H(Be())}Ve(document.getElementById("app"));"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").catch(()=>{})});
