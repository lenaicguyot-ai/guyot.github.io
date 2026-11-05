<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lénaïc GUYOT | Portfolio BTS SIO SISR</title>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#02030a;--panel:#070b1c;--panel2:#0b1230;
  --blue:#2b6cff;--cyan:#27c4ff;--red:#ff1744;--red-soft:#ff4d6d;
  --text:#e9eeff;--muted:#8d97b8;--line:rgba(80,120,255,.22);
  --glow-red:0 0 12px rgba(255,23,68,.65),0 0 36px rgba(255,23,68,.35);
  --glow-blue:0 0 18px rgba(43,108,255,.45);
}
html{scroll-behavior:smooth}
body{font-family:'Manrope',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;line-height:1.6}
body::before{content:'';position:fixed;inset:0;z-index:-2;
  background:radial-gradient(900px 500px at 85% -5%,rgba(43,108,255,.22),transparent 60%),
             radial-gradient(700px 500px at -5% 60%,rgba(255,23,68,.10),transparent 60%),
             linear-gradient(rgba(80,120,255,.05) 1px,transparent 1px) 0 0/48px 48px,
             linear-gradient(90deg,rgba(80,120,255,.05) 1px,transparent 1px) 0 0/48px 48px,var(--bg)}
h1,h2,h3,h4,.logo{font-family:'Chakra Petch',sans-serif}
a:focus-visible,button:focus-visible,.card:focus-visible{outline:2px solid var(--cyan);outline-offset:3px}

#progress{position:fixed;top:0;left:0;height:2px;width:0;background:linear-gradient(90deg,var(--blue),var(--red));box-shadow:var(--glow-red);z-index:200}

nav{position:fixed;top:0;width:100%;z-index:100;display:flex;justify-content:space-between;align-items:center;
  padding:16px 7%;background:rgba(2,3,10,.65);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.logo{font-weight:700;font-size:1.05rem;letter-spacing:.04em}
.logo i{color:var(--red);font-style:normal;text-shadow:var(--glow-red)}
.nav-links a{color:var(--muted);text-decoration:none;margin-left:26px;font-size:.9rem;font-weight:500;position:relative;transition:color .2s}
.nav-links a::after{content:'';position:absolute;left:0;bottom:-6px;height:2px;width:0;background:var(--red);box-shadow:var(--glow-red);transition:width .25s}
.nav-links a:hover{color:var(--text)}.nav-links a:hover::after{width:100%}

.hero{min-height:100vh;display:flex;align-items:center;padding:100px 7% 60px}
.hero-inner{max-width:920px}
.status{display:inline-flex;align-items:center;gap:10px;padding:7px 16px;border:1px solid var(--line);border-radius:99px;
  background:rgba(11,18,48,.6);font-size:.85rem;color:var(--muted);margin-bottom:30px}
.status b{width:8px;height:8px;border-radius:50%;background:var(--red);box-shadow:var(--glow-red);animation:pulse 1.6s infinite}
@keyframes pulse{50%{opacity:.35;transform:scale(.8)}}
.hero h1{font-size:clamp(3.2rem,10vw,8rem);line-height:.95;font-weight:700;letter-spacing:-.02em;margin-bottom:28px}
.hero h1 .l1{display:block;color:var(--text)}
.hero h1 .l2{display:block;color:var(--red);text-shadow:var(--glow-red);animation:flicker 5s infinite 1.2s}
@keyframes flicker{0%,18%,22%,62%,100%{opacity:1}20%{opacity:.55}24%{opacity:.8}64%{opacity:.6}66%{opacity:1}}
.role{font-family:'Chakra Petch',sans-serif;font-size:clamp(1.1rem,2.2vw,1.5rem);color:var(--cyan);margin-bottom:18px;min-height:2em}
.role::after{content:'▌';color:var(--red);margin-left:4px;animation:blink 1s steps(2) infinite}
@keyframes blink{50%{opacity:0}}
.hero-desc{max-width:560px;color:var(--muted);margin-bottom:40px}
.hero-desc strong{color:var(--text)}
.ctas{display:flex;gap:14px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;padding:14px 30px;border-radius:8px;font-weight:700;font-size:.95rem;text-decoration:none;transition:.25s;font-family:'Chakra Petch',sans-serif}
.btn-red{background:var(--red);color:#fff;box-shadow:var(--glow-red)}
.btn-red:hover{transform:translateY(-3px);box-shadow:0 0 22px rgba(255,23,68,.9),0 0 60px rgba(255,23,68,.45)}
.btn-ghost{border:1px solid var(--blue);color:var(--text);background:rgba(43,108,255,.08)}
.btn-ghost:hover{background:rgba(43,108,255,.2);box-shadow:var(--glow-blue);transform:translateY(-3px)}

section{padding:110px 7%}
.sec-title{font-size:clamp(2rem,4.2vw,3rem);font-weight:700;letter-spacing:-.01em;margin-bottom:14px;display:flex;align-items:center;gap:18px}
.sec-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--red),var(--blue) 40%,transparent)}
.sec-sub{color:var(--muted);max-width:780px;margin-bottom:46px}
.sec-sub strong{color:var(--text)}

.about-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
.about-text p{color:var(--muted);margin-bottom:18px}
.about-text strong{color:var(--text)}
.goal{border-left:3px solid var(--red);padding:16px 20px;background:linear-gradient(90deg,rgba(255,23,68,.12),transparent);border-radius:0 10px 10px 0;box-shadow:-6px 0 24px -10px var(--red)}
.info-blocks{display:grid;gap:14px}
.info{padding:20px 24px;background:linear-gradient(145deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:12px;transition:.3s}
.info:hover{border-color:var(--blue);box-shadow:var(--glow-blue);transform:translateX(6px)}
.info h4{font-size:.9rem;color:var(--cyan);margin-bottom:2px}
.info p{font-weight:700;font-size:1.05rem}
.info span{color:var(--muted);font-size:.86rem}

#skills{background:linear-gradient(180deg,transparent,rgba(11,18,48,.55),transparent)}
.pills{display:flex;flex-wrap:wrap;gap:12px}
.pill{padding:12px 22px;border:1px solid var(--line);border-radius:8px;background:var(--panel);font-weight:600;font-size:.92rem;transition:.25s}
.pill:hover{border-color:var(--red);color:var(--red-soft);box-shadow:var(--glow-red);transform:translateY(-3px)}

.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:22px}
.card{position:relative;overflow:hidden;padding:30px;background:linear-gradient(150deg,var(--panel),var(--panel2));border:1px solid var(--line);
  border-radius:14px;cursor:pointer;transition:transform .3s,border-color .3s,box-shadow .3s;text-align:left;color:inherit;font:inherit}
.card::before{content:'';position:absolute;inset:0;opacity:0;transition:.3s;
  background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%),rgba(255,23,68,.18),transparent 70%)}
.card:hover{transform:translateY(-6px);border-color:var(--red);box-shadow:0 0 0 1px rgba(255,23,68,.4),0 18px 50px -18px rgba(255,23,68,.5)}
.card:hover::before{opacity:1}
.card>*{position:relative}
.ico{font-size:2rem;display:block;margin-bottom:14px;filter:drop-shadow(0 0 10px rgba(43,108,255,.7))}
.card h3{font-size:1.2rem;margin-bottom:8px}
.card p{color:var(--muted);font-size:.9rem}
.tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.tag{padding:3px 11px;border:1px solid rgba(39,196,255,.35);background:rgba(39,196,255,.08);color:var(--cyan);border-radius:5px;font-size:.76rem;font-weight:600}
.more{display:block;margin-top:16px;color:var(--red-soft);font-weight:700;font-size:.85rem}

.modal{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(0,2,10,.85);backdrop-filter:blur(10px)}
.modal.on{display:flex}
.mbox{position:relative;width:100%;max-width:660px;max-height:86vh;overflow:auto;padding:38px;background:linear-gradient(150deg,var(--panel),var(--panel2));
  border:1px solid var(--blue);border-radius:16px;box-shadow:var(--glow-blue),0 0 0 1px rgba(255,23,68,.25);animation:pop .25s ease}
@keyframes pop{from{opacity:0;transform:scale(.95) translateY(10px)}}
.x{position:absolute;top:14px;right:16px;background:none;border:0;color:var(--muted);font-size:1.8rem;cursor:pointer;line-height:1}
.x:hover{color:var(--red)}
.mbox h3{font-size:1.7rem;margin-bottom:4px}
.msub{color:var(--red-soft);font-weight:600;font-size:.9rem;margin-bottom:20px}
.mbody{color:var(--muted);font-size:.95rem}
.mbody strong{color:var(--text)}
.mbody ul{margin:10px 0 14px 20px}.mbody li{margin-bottom:8px}
.src{display:inline-block;margin-top:14px;padding:10px 18px;border:1px solid var(--red);color:var(--red-soft);border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;transition:.25s}
.src:hover{background:var(--red);color:#fff;box-shadow:var(--glow-red)}

#contact{text-align:center}
#contact .sec-title{justify-content:center}#contact .sec-title::after{display:none}
.cbox{max-width:640px;margin:0 auto;padding:50px 30px;border:1px solid var(--line);border-radius:18px;
  background:radial-gradient(500px 220px at 50% 0,rgba(43,108,255,.18),transparent),var(--panel)}
.cbox p{color:var(--muted);margin-bottom:30px}
.clinks{display:flex;justify-content:center;gap:16px;flex-wrap:wrap}
footer{padding:26px 7%;border-top:1px solid var(--line);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;color:var(--muted);font-size:.84rem}

.rv{opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s}.rv.v{opacity:1;transform:none}
@media(max-width:800px){.about-grid{grid-template-columns:1fr}.nav-links{display:none}section{padding:80px 6%}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}}

.duo{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.panel{padding:34px;background:linear-gradient(150deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:16px;position:relative;overflow:hidden}
.panel::before{content:'';position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,var(--blue),transparent)}
.panel.red::before{background:linear-gradient(90deg,var(--red),transparent);box-shadow:var(--glow-red)}
.panel .kick{color:var(--cyan);font-size:.88rem;font-weight:600;margin-bottom:4px}
.panel h3{font-size:1.7rem;margin-bottom:14px}
.panel p{color:var(--muted);font-size:.94rem;margin-bottom:14px}.panel p strong{color:var(--text)}
.facts{list-style:none;display:grid;gap:10px;margin-top:18px}
.facts li{display:flex;gap:12px;font-size:.9rem;color:var(--muted);padding-top:10px;border-top:1px solid var(--line)}
.facts li b{color:var(--text);min-width:112px;font-weight:600}
.grp{font-size:1.2rem;color:var(--cyan);margin:40px 0 16px}
.card.todo{border-style:dashed}
.tag.todo{border-color:rgba(255,23,68,.5);color:var(--red-soft);background:rgba(255,23,68,.08)}
@media(max-width:800px){.duo{grid-template-columns:1fr}.facts li{flex-direction:column;gap:2px}}

.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:0;position:relative}
.step{position:relative;padding:26px 24px 0 0}
.step::before{content:'';position:absolute;top:6px;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--blue),var(--red))}
.step::after{content:'';position:absolute;top:0;left:0;width:14px;height:14px;border-radius:50%;background:var(--red);box-shadow:var(--glow-red)}
.step h3{font-size:1.15rem;margin-bottom:4px}.step span{color:var(--cyan);font-size:.85rem;font-weight:600}.step p{color:var(--muted);font-size:.9rem;margin-top:6px}
@media(max-width:800px){.steps{grid-template-columns:1fr;gap:10px}.step{padding-bottom:14px}.step::before{display:none}}
</style>
</head>
<body>
<div id="progress"></div>

<nav>
  <span class="logo">LG<i>/</i>SISR</span>
  <div class="nav-links">
    <a href="#about">À propos</a><a href="#ecole">École &amp; entreprise</a><a href="#epreuves">Épreuves</a><a href="#veille">Veille</a><a href="#contact">Contact</a>
  </div>
</nav>

<header class="hero">
  <div class="hero-inner">
    <div class="status"><b></b>BTS SIO option SISR, alternance 2025/2026</div>
    <h1><span class="l1">Lénaïc</span><span class="l2">GUYOT</span></h1>
    <div class="role" id="role" aria-label="Systèmes, réseaux, cybersécurité"></div>
    <p class="hero-desc">Étudiant en alternance passionné par les <strong>systèmes, les réseaux et la cybersécurité</strong>. En formation à <strong>H3 Hitema</strong>, en poste chez <strong>WAAT</strong>.</p>
    <div class="ctas">
      <a href="#epreuves" class="btn btn-red">Voir mes épreuves</a>
      <a href="#contact" class="btn btn-ghost">Me contacter</a>
    </div>
  </div>
</header>

<section id="about">
  <h2 class="sec-title rv">À propos</h2>
  <div class="about-grid">
    <div class="about-text rv">
      <p>Je m'appelle <strong>Lénaïc GUYOT</strong>, étudiant en <strong>2<sup>e</sup> année de BTS SIO option SISR</strong> (Solutions d'Infrastructure, Systèmes et Réseaux), en alternance chez <strong>WAAT</strong> et formé à <strong>H3 Hitema</strong>. L'alternance me permet d'acquérir des compétences concrètes en administration systèmes, réseau et cybersécurité.</p>
      <p><strong>Mon rôle en entreprise :</strong> je participe au support des utilisateurs (tickets, comptes et droits) et à l'administration du parc : déploiement de configurations avec Intune, automatisation avec Power Automate, déploiement de scripts pour vider les dossiers temporaires des postes, intervention sur l'infrastructure réseau.</p>
      <div class="goal">Mon objectif : évoluer vers un poste d'<strong>administrateur systèmes et réseaux</strong>.</div>
      <div class="ctas" style="margin-top:26px"><a class="btn btn-red" href="CV.pdf" target="_blank" rel="noopener">Télécharger mon CV</a></div>
    </div>
    <div class="info-blocks rv">
      <div class="info"><h4>Le diplôme</h4><p>BTS SIO, option SISR</p><span>Diplôme national Bac +2 en deux ans. L'option SISR couvre trois blocs : support et mise à disposition de services, administration des systèmes et réseaux, cybersécurité. Il est validé par les épreuves E5 (production et fourniture de services) et E6 (administration des systèmes et réseaux).</span></div>
      <div class="info"><h4>Formation précédente</h4><p>Bac SN (Systèmes Numériques), obtenu</p><span>Préparation, installation et maintenance des systèmes interconnectés et des réseaux informatiques.</span></div>
      <div class="info"><h4>Compétences clés</h4><p>Autonomie · Tickets · Utilisateurs et droits</p><span>Organisation, communication avec les utilisateurs, gestion des tickets, des utilisateurs et des droits d'accès.</span></div>
    </div>
  </div>
</section>

<section id="parcours">
  <h2 class="sec-title rv">Parcours et outils</h2>
  <div class="steps rv">
    <div class="step"><span>Obtenu</span><h3>Bac Systèmes Numériques</h3><p>Installation et maintenance de systèmes interconnectés et de réseaux.</p></div>
    <div class="step"><span>2025 / 2026</span><h3>BTS SIO option SISR</h3><p>Deuxième année en alternance à H3 Hitema.</p></div>
    <div class="step"><span>Alternance</span><h3>WAAT</h3><p>Support utilisateurs, administration du parc et automatisation.</p></div>
  </div>
  <h3 class="grp">Outils et technologies utilisés</h3>
  <div class="pills rv">
    <span class="pill">Microsoft 365</span><span class="pill">Intune</span><span class="pill">Power Automate</span><span class="pill">Microsoft Forms</span><span class="pill">Teams</span><span class="pill">Microsoft Edge</span><span class="pill">Scripts de maintenance</span><span class="pill">Câblage RJ45</span>
  </div>
</section>

<section id="ecole">
  <h2 class="sec-title rv">École et entreprise</h2>
  <p class="sec-sub rv">Mon alternance : une école d'informatique pour la théorie, un opérateur de bornes de recharge pour la pratique.</p>
  <div class="duo">
    <article class="panel rv">
      <div class="kick">Mon école</div>
      <h3>H3 Hitema</h3>
      <p><strong>École d'informatique en alternance</strong> située à Paris (Issy-les-Moulineaux), qui forme aux métiers du numérique depuis 2005. Elle fait partie du groupe H3 Éducation, actif dans l'enseignement supérieur depuis 1970.</p>
      <p>Son cursus va du <strong>BTS au Bac +5</strong> et vise une double compétence : informatique et management du système d'information. École-CFA, elle propose des contrats d'apprentissage et de professionnalisation et accompagne les étudiants dans leur recherche d'alternance.</p>
      <ul class="facts">
        <li><b>Rythme</b>Une semaine à l'école, deux semaines en entreprise</li>
        <li><b>Diplômes</b>BTS, Bachelor et Mastère, titres RNCP reconnus par l'État</li>
        <li><b>Après le BTS</b>Poursuite possible en Bachelor puis en Bac +5 dans la même école</li>
      </ul>
    </article>
    <article class="panel red rv">
      <div class="kick">Mon entreprise</div>
      <h3>WAAT</h3>
      <p><strong>Opérateur français de bornes de recharge pour véhicules électriques</strong>, fondé en 2018 par Yann Evin et Patrick Kic. WAAT s'est positionné sur l'environnement privé : copropriétés, bureaux et sites tertiaires, bailleurs sociaux, promoteurs immobiliers et gestionnaires de flottes.</p>
      <p>Son métier : <strong>installer, maintenir et superviser</strong> des infrastructures de recharge (IRVE). Les gestionnaires pilotent leurs bornes via l'application <strong>MyWAAT</strong>. L'entreprise a annoncé une levée de 100 millions d'euros en 2025 pour accélérer son déploiement.</p>
      <ul class="facts">
        <li><b>Activités</b>Installation, maintenance, supervision, solutions numériques</li>
        <li><b>Clients</b>Copropriétés, tertiaire, bailleurs, promotion immobilière, flottes</li>
        <li><b>Intérêt pour un SISR</b>Parc informatique à administrer, outils cloud Microsoft 365, support utilisateurs</li>
      </ul>
    </article>
  </div>
</section>

<section id="epreuves">
  <h2 class="sec-title rv">Épreuves</h2>
  <h3 class="grp">E6 · Fiche de situation 1 : Réseau</h3>
  <div class="grid" id="g-e6a"></div>
  <h3 class="grp">E6 · Fiche de situation 2 : Système</h3>
  <div class="grid" id="g-e6b"></div>
</section>

<section id="veille">
  <h2 class="sec-title rv">Veille technologique et juridique</h2>
  <p class="sec-sub rv">Je suis les <strong>dernières fuites de données (data breaches)</strong> dans le monde. J'utilise <strong>LinkedIn</strong> pour centraliser et analyser en continu les retours d'experts et les alertes de sécurité, et je relie ces incidents au cadre juridique du <strong>RGPD</strong>.</p>
  <div class="grid" id="g-veille"></div>
</section>

<section id="contact">
  <h2 class="sec-title rv">Travaillons ensemble</h2>
  <div class="cbox rv">
    <p>Disponible pour échanger autour de mes projets ou d'une opportunité. N'hésitez pas à me contacter.</p>
    <div class="clinks">
      <a class="btn btn-red" href="mailto:lenaicguyot@gmail.com">lenaicguyot@gmail.com</a>
      <a class="btn btn-ghost" href="https://www.linkedin.com/in/lénaïc-guyot-9a80b9306?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer">Profil LinkedIn</a>
    </div>
  </div>
</section>

<footer><span>© 2026 Lénaïc GUYOT</span><span>BTS SIO SISR · H3 Hitema · WAAT</span></footer>

<div id="modal" class="modal" role="dialog" aria-modal="true"><div class="mbox" id="mbox"></div></div>

<script>
const DATA={
p1:{i:'🗄️',t:"Brassage d'une baie réseau",s:'Infrastructure réseau et câblage',d:"Intervention sur une baie informatique en salle serveur : brassage des câbles RJ45 et étiquetage.",tags:['Câblage','Brassage','Infrastructure'],
 b:`<p><strong>Objectif technique :</strong> assurer l'interconnexion des équipements en salle serveur avec un brassage propre et documenté.</p><ul><li><strong>Liaisons :</strong> brassage des câbles RJ45 entre les switches et les panneaux de brassage.</li><li><strong>Maintenabilité :</strong> étiquetage systématique de chaque câble pour une infrastructure lisible et des dépannages plus rapides.</li></ul><p><strong>Compétences :</strong> intervention sur une infrastructure physique, rigueur et documentation réseau.</p>`},
p2:{i:'⚡',t:'Automatisation avec Power Automate',s:'Modern Workplace et gain de temps',d:"Flux automatisé de bout en bout pour la génération et l'envoi de fiches utilisateurs M365.",tags:['Power Automate','Forms','M365'],
 b:`<p><strong>Conception du flux :</strong></p><ul><li><strong>Étape 1 :</strong> saisie des informations dans un formulaire <strong>Microsoft Forms</strong>.</li><li><strong>Étape 2 :</strong> un workflow <strong>Power Automate</strong> se déclenche et récupère les données.</li><li><strong>Étape 3 :</strong> remplissage d'un modèle Word, conversion en PDF et envoi par email à <strong>l'utilisateur de l'entreprise</strong>.</li><li><strong>Étape 4 :</strong> notification dans le canal Teams de l'équipe informatique pour la traçabilité.</li></ul><p><strong>Résultat :</strong> moins d'erreurs de saisie et une intégration fluide dans le tenant de l'entreprise.</p>`},
p3:{i:'🛡️',t:'Stratégie Intune : déploiement',s:'Gestion de parc et administration centralisée',d:"Création d'une stratégie pour déployer la barre des favoris de l'entreprise sur Microsoft Edge.",tags:['Intune','MDM','Déploiement'],
 b:`<p><strong>Objectif :</strong> uniformiser l'environnement de travail des utilisateurs, sur site ou à distance, en gérant les postes Windows depuis le cloud.</p><ul><li><strong>Configuration :</strong> stratégie Intune qui déploie automatiquement la barre des favoris avec les outils internes sur <strong>Microsoft Edge</strong>.</li><li><strong>Méthode :</strong> profil de configuration appliqué à des groupes basés sur Entra ID (Azure AD).</li><li><strong>Intérêt SISR :</strong> plus d'intervention manuelle sur chaque poste, stratégies appliquées dès la première connexion.</li></ul>`},
v1:{i:'🌐',t:'Sourcing via LinkedIn',s:"Méthodologie et outils de veille",d:"Flux d'information LinkedIn pour capter les dernières fuites publiées par les experts.",
 b:`<p>J'ai structuré mon fil <strong>LinkedIn</strong> pour en faire un vrai centre de veille.</p><ul><li><strong>Hashtags suivis :</strong> #Cybersécurité, #DataBreach, #CyberNews, #Infosec.</li><li><strong>Sources suivies :</strong><br>• Agences officielles : <strong>CNIL</strong> et <strong>ANSSI</strong> pour les alertes en France.<br>• Chercheurs et journalistes reconnus (Troy Hunt) et médias spécialisés comme <em>Le Monde Informatique</em>.</li></ul><p><strong>Pourquoi LinkedIn ?</strong> La communauté y partage les détails d'une faille en quelques minutes, dès qu'une base est repérée en vente sur un forum cybercriminel.</p>`},
v2:{i:'⚠️',t:'Analyse des incidents',s:"Vecteurs d'attaque et risques",d:"Étude des vecteurs récurrents : scraping, serveurs cloud non sécurisés, identifiants compromis.",
 b:`<p>Mes lectures m'ont permis d'identifier les origines récurrentes des fuites :</p><ul><li><strong>Erreurs de configuration :</strong> bases de données (Elasticsearch, buckets AWS S3) accessibles publiquement sans mot de passe.</li><li><strong>Scraping :</strong> collecte automatisée de données publiques, compilées en masse en fichiers exploitables.</li><li><strong>Impact majeur, le spear-phishing :</strong> avec nom, prénom et poste, les attaquants rédigent des emails d'hameçonnage très crédibles.</li></ul>`},
v3:{i:'🔒',t:'Outils de remédiation',s:'Défense en profondeur',d:"Techniques de protection fondamentales et audit de comptes avec Have I Been Pwned.",
 b:`<p>Pour un profil d'administrateur SISR, une fuite impose des contre-mesures strictes :</p><ul><li><strong>Chiffrement :</strong> données sensibles chiffrées au repos et en transit.</li><li><strong>Audit avec Have I Been Pwned :</strong> vérifier si des adresses professionnelles apparaissent dans des bases piratées.</li><li><strong>Politiques d'accès :</strong> MFA obligatoire et principe du moindre privilège.</li></ul><a class="src" href="https://haveibeenpwned.com/" target="_blank" rel="noopener noreferrer">Ouvrir Have I Been Pwned</a>`}
};
Object.assign(DATA,{
s1:{i:'🧹',t:'Scripts de nettoyage des postes',s:'Administration des systèmes',d:`Déploiement de scripts pour vider les dossiers temporaires des postes.`,tags:['Scripts','Maintenance','Postes de travail'],todo:1,
 b:`<p><strong>Objectif :</strong> libérer de l'espace et garder les postes propres en vidant automatiquement les dossiers temporaires.</p><p><strong>Réalisation :</strong> déploiement de scripts sur les postes de l'entreprise.</p><p style="color:var(--red-soft)">À compléter : langage du script, méthode de déploiement, résultat obtenu.</p>`},
v4:{i:'⚖️',t:'RGPD et CNIL',s:'Veille juridique',d:`Ce que la loi impose à une organisation en cas de fuite de données.`,
 b:`<p>Le <strong>RGPD</strong>, applicable depuis mai 2018, encadre le traitement des données personnelles en Europe. La <strong>CNIL</strong> en contrôle l'application en France.</p><ul><li><strong>Violation de données :</strong> elle doit être notifiée à la CNIL dans les 72 heures après sa découverte, et aux personnes concernées si le risque est élevé.</li><li><strong>Sanctions :</strong> jusqu'à 20 millions d'euros ou 4 % du chiffre d'affaires mondial.</li><li><strong>Côté administrateur :</strong> registre des traitements, droits d'accès limités, journalisation et chiffrement.</li></ul><a class="src" href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer">Ouvrir le site de la CNIL</a>`},
v5:{i:'🔐',t:'Cryptographie',s:'Veille technique',d:`Chiffrement et hachage : ce qui protège les données quand une base fuite.`,
 b:`<ul><li><strong>Chiffrement symétrique (AES) :</strong> une même clé chiffre et déchiffre, rapide pour les données au repos.</li><li><strong>Chiffrement asymétrique (RSA, courbes elliptiques) :</strong> clé publique et clé privée, utilisé pour l'échange de clés et les certificats.</li><li><strong>TLS :</strong> protège les données en transit sur le réseau.</li><li><strong>Hachage des mots de passe (bcrypt, Argon2) :</strong> dans une fuite, un mot de passe haché avec sel est bien plus difficile à exploiter qu'un mot de passe en clair.</li></ul>`}
});
Object.assign(DATA.p1,{tags:['Réseau','Câblage','Brassage']});
const mk=id=>{const d=DATA[id];return `<button class="card rv${d.todo?' todo':''}" data-id="${id}"><span class="ico">${d.i}</span><h3>${d.t}</h3><p>${d.d}</p><div class="tags">${(d.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}${d.todo?'<span class="tag todo">À compléter</span>':''}</div><span class="more">Voir les détails</span></button>`};
const fill=(id,ids)=>document.getElementById(id).innerHTML=ids.map(mk).join('');
fill('g-e6a',['p1']);fill('g-e6b',['p3','p2','s1']);fill('g-veille',['v1','v2','v3','v4','v5']);

const modal=document.getElementById('modal'),mbox=document.getElementById('mbox');let last;
function openM(id){const d=DATA[id];last=document.activeElement;
 mbox.innerHTML=`<button class="x" aria-label="Fermer">×</button><span class="ico">${d.i}</span><h3>${d.t}</h3><div class="msub">${d.s}</div><div class="mbody">${d.b}</div>`;
 modal.classList.add('on');document.body.style.overflow='hidden';mbox.querySelector('.x').focus()}
function closeM(){modal.classList.remove('on');document.body.style.overflow='';last&&last.focus()}
document.addEventListener('click',e=>{const c=e.target.closest('.card');if(c)openM(c.dataset.id);
 if(e.target===modal||e.target.closest('.x'))closeM()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card');if(!c)return;
 const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')});

/* Reveal + barre de progression */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(r=>io.observe(r));
const bar=document.getElementById('progress');
addEventListener('scroll',()=>{bar.style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%'},{passive:true});

/* Machine à écrire */
(function(){const el=document.getElementById('role'),w=['Systèmes','Réseaux','Cybersécurité','Administration SI'];let i=0,j=0,del=false;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;if(reduce){el.textContent=w.join(' · ');return}
 (function t(){const s=w[i];el.textContent=s.slice(0,j);
  if(!del&&j===s.length){del=true;return setTimeout(t,1400)}
  if(del&&j===0){del=false;i=(i+1)%w.length}
  j+=del?-1:1;setTimeout(t,del?40:80)})()})();

</script>
</body>
</html>
