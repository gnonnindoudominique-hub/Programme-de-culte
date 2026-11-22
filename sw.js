window.onerror=function(m){alert("Erreur: "+m);};
var CULTES=[]; var OFFICIERS=[]; var MEMBRES=[];
var data=[]; var culteChoisi=null; var editIndex=-1; var editFideleIndex=-1;
var DEFAUT_CULTES=[
{id:"dim10",nom:"Culte Dimanche Matin - 10h",jour:"Dimanche 10h",type:"culte"},
{id:"dim19",nom:"Culte du Soir Dimanche - 19h",jour:"Dimanche 19h",type:"priere"},
{id:"mer09",nom:"Culte Femmes Steriles - Mercredi 09h",jour:"Mercredi 09h",type:"special"},
{id:"mer19",nom:"Culte du Soir Mercredi - 19h",jour:"Mercredi 19h",type:"priere"},
{id:"jeu09",nom:"Culte Femmes Enceintes - Jeudi 09h",jour:"Jeudi 09h",type:"special"},
{id:"ven13",nom:"Culte Vendredi 13h - Sanctification",jour:"Vendredi 13h",type:"culte"},
{id:"ven19",nom:"Culte du Soir Vendredi - 19h",jour:"Vendredi 19h",type:"priere"},
{id:"matin06",nom:"Priere du Matin - 06h",jour:"Tous les jours 06h",type:"priere"},
{id:"mariage",nom:"Culte de Mariage",jour:"Sur demande",type:"special"},
{id:"sortie",nom:"Sortie d Enfant",jour:"Sur demande",type:"special"},
{id:"enterrement",nom:"Enterrement",jour:"Sur demande",type:"special"}
];
var DEFAUT_OFF=[
{poste:"Conducteur",nom:"Vn.Sn.w. Joseph"},
{poste:"Encensement",nom:"Ev. Dominique GNONNINDOU"},
{poste:"Priere 1",nom:"Samuel HIUSSINOU"},
{poste:"Priere 2",nom:"Sn.M. Alice AZONSSI"},
{poste:"Priere 3",nom:"Ev. Dominique GNONNINDOU"},
{poste:"Lecteur 1",nom:"Samuel HIUSSINOU"},
{poste:"Lecteur 2",nom:"Benedicte GBENOU"},
{poste:"Predication",nom:"Papa"},
{poste:"Quete Homme",nom:"un papa"},
{poste:"Quete Femme",nom:"une mama"},
{poste:"Priere sur quete",nom:"un dev"},
{poste:"Priere Cloture",nom:"Mn GODONOU Mariette"}
];
var DEFAUT_MEM=[
{nom:"Benedicte GBENOU",tel:""},
{nom:"Ev. Dominique GNONNINDOU",tel:"0173970092"},
{nom:"Mn GODONOU Mariette",tel:""},
{nom:"Papa",tel:""},
{nom:"Samuel HIUSSINOU",tel:""},
{nom:"Sn.M. Alice AZONSSI",tel:""},
{nom:"un dev",tel:""},
{nom:"un papa",tel:""},
{nom:"une mama",tel:""},
{nom:"Vn.Sn.w. Joseph",tel:""}
];
function triAlpha(){MEMBRES.sort(function(a,b){return a.nom.toLowerCase().localeCompare(b.nom.toLowerCase());});}
function toggleAjout(){var b=document.getElementById("boxAjout");if(b.classList.contains("cache")){b.classList.remove("cache");document.getElementById("btnAjout").innerText="➖ CACHER";}else{b.classList.add("cache");document.getElementById("btnAjout").innerText="➕ AJOUTER DES FIDELES - Appuie ici";}}
function toggleCultes(){var b=document.getElementById("boxCultes");if(b.classList.contains("cache")){b.classList.remove("cache");renderCultes();}else{b.classList.add("cache");}}
function toggleOff(){var b=document.getElementById("boxOff");if(b.classList.contains("cache")){b.classList.remove("cache");renderOff();}else{b.classList.add("cache");}}
function renderCultes(){var h="";CULTES.forEach(function(c){h+='<button class="culteBtn" onclick="choisirCulte(\''+c.id+'\')">'+c.nom+'</button>';});document.getElementById("listeCultesBtns").innerHTML=h;}
function choisirCulte(id){var c=null;for(var i=0;i<CULTES.length;i++){if(CULTES[i].id===id)c=CULTES[i];}if(!c)return;culteChoisi=c;document.getElementById("formBox").style.display="block";document.getElementById("formTitle").innerText="➕ "+c.nom;document.getElementById("partCulte").style.display=c.type==="culte"?"block":"none";document.getElementById("partPriere").style.display=c.type==="priere"?"block":"none";document.getElementById("partSpecial").style.display=c.type==="special"?"block":"none";remplir();document.getElementById("date").value=new Date().toISOString().slice(0,10);document.getElementById("boxCultes").classList.add("cache");window.scrollTo(0,0);}
function getOff(p){for(var i=0;i<OFFICIERS.length;i++){if(OFFICIERS[i].poste===p)return OFFICIERS[i].nom;}return "";}
function setVal(id,v){var e=document.getElementById(id);if(e)e.value=v||"";}
function getVal(id){var e=document.getElementById(id);return e?e.value.trim():"";}
function remplir(){setVal("conducteur",getOff("Conducteur"));setVal("conducteurP",getOff("Conducteur"));setVal("conducteurS",getOff("Conducteur"));setVal("encensement",getOff("Encensement"));setVal("p1",getOff("Priere 1"));setVal("p1P",getOff("Priere 1"));setVal("p2",getOff("Priere 2"));setVal("p2P",getOff("Priere 2"));setVal("p3",getOff("Priere 3"));setVal("p3P",getOff("Priere 3"));setVal("lect1",getOff("Lecteur 1"));setVal("lectP",getOff("Lecteur 1"));setVal("lect2",getOff("Lecteur 2"));setVal("predication",getOff("Predication"));setVal("predicationP",getOff("Predication"));setVal("queteH",getOff("Quete Homme"));setVal("queteHP",getOff("Quete Homme"));setVal("queteF",getOff("Quete Femme"));setVal("priereQuete",getOff("Priere sur quete"));setVal("priereQueteP",getOff("Priere sur quete"));setVal("priereClot",getOff("Priere Cloture"));setVal("priereClotP",getOff("Priere Cloture"));}
function ajouterNom(){var nom=getVal("nouveauNom"),tel=getVal("nouveauTel");if(!nom){alert("Mets le nom");return;}var ex=false;for(var i=0;i<MEMBRES.length;i++){if(MEMBRES[i].nom.toLowerCase()===nom.toLowerCase())ex=true;}if(!ex){MEMBRES.push({nom:nom,tel:tel});triAlpha();localStorage.setItem("eglise_membres_final",JSON.stringify(MEMBRES));}setVal("nouveauNom","");setVal("nouveauTel","");renderFideles();renderOff();alert("Fidele ajoute: "+nom);}
function ajouterEnMasse(){var txt=document.getElementById("nomsEnMasse").value;if(!txt.trim()){alert("Colle d abord les noms");return;}var aj=0;txt.split("\n").forEach(function(l){var nom=l.trim();if(nom.length<2)return;var ex=false;for(var i=0;i<MEMBRES.length;i++){if(MEMBRES[i].nom.toLowerCase()===nom.toLowerCase())ex=true;}if(!ex){MEMBRES.push({nom:nom,tel:""});aj++;}});triAlpha();localStorage.setItem("eglise_membres_final",JSON.stringify(MEMBRES));document.getElementById("nomsEnMasse").value="";renderFideles();renderOff();alert(aj+" fideles ajoutes !");}
function renderFideles(){triAlpha();var rech=(document.getElementById("rechFidele").value||"").toLowerCase();var h="",lettre="";MEMBRES.forEach(function(m,i){if(rech&&m.nom.toLowerCase().indexOf(rech)<0)return;var L=m.nom.charAt(0).toUpperCase();if(L!==lettre){lettre=L;h+='<div class="lettre">'+lettre+'</div>';}h+='<div class="fideleRow"><b>'+m.nom+' '+(m.tel?'<span style="color:#64748b;font-weight:normal">- '+m.tel+'</span>':'')+'</b><button class="btnEdit" onclick="ouvrirEditFidele('+i+')">✏️ Modifier</button><button class="btnDel" onclick="suppMembre('+i+')">🗑️</button></div>';});document.getElementById("listeFideles").innerHTML=h||"Aucun fidele";document.getElementById("nbFideles").innerText=MEMBRES.length;var dl=document.getElementById("listeNoms");dl.innerHTML="";MEMBRES.forEach(function(m){var o=document.createElement("option");o.value=m.nom;dl.appendChild(o);});}
function ouvrirEditFidele(i){editFideleIndex=i;var m=MEMBRES[i];document.getElementById("boxEditFidele").style.display="block";document.getElementById("editAncien").value=m.nom;document.getElementById("editNouveau").value=m.nom;document.getElementById("editTel").value=m.tel||"";document.getElementById("boxEditFidele").scrollIntoView();}
function validerEditFidele(){if(editFideleIndex<0)return;var nouveau=getVal("editNouveau"),tel=getVal("editTel");if(!nouveau){alert("Mets le nouveau nom");return;}var ancien=MEMBRES[editFideleIndex].nom;MEMBRES[editFideleIndex].nom=nouveau;MEMBRES[editFideleIndex].tel=tel;for(var i=0;i<OFFICIERS.length;i++){if(OFFICIERS[i].nom===ancien)OFFICIERS[i].nom=nouveau;}triAlpha();localStorage.setItem("eglise_membres_final",JSON.stringify(MEMBRES));localStorage.setItem("eglise_officiers_final",JSON.stringify(OFFICIERS));editFideleIndex=-1;document.getElementById("boxEditFidele").style.display="none";renderFideles();renderOff();alert("Corrige : "+ancien+" -> "+nouveau);}
function annulerEditFidele(){editFideleIndex=-1;document.getElementById("boxEditFidele").style.display="none";}
function suppMembre(i){if(confirm("Supprimer "+MEMBRES[i].nom+" ?")){MEMBRES.splice(i,1);localStorage.setItem("eglise_membres_final",JSON.stringify(MEMBRES));renderFideles();renderOff();}}
function renderOff(){var h="";OFFICIERS.forEach(function(o,i){h+='<div class="officielRow"><b>'+o.poste+'</b><select id="off-'+i+'">';MEMBRES.forEach(function(m){h+='<option value="'+m.nom+'" '+(m.nom===o.nom?"selected":"")+'>'+m.nom+'</option>';});h+='<option value="">-- Vide --</option></select><button onclick="remplacer('+i+')">Remplacer</button></div>';});document.getElementById("listeOfficiers").innerHTML=h;}
function remplacer(i){var sel=document.getElementById("off-"+i);OFFICIERS[i].nom=sel.value;localStorage.setItem("eglise_officiers_final",JSON.stringify(OFFICIERS));renderOff();alert("Remplace: "+OFFICIERS[i].poste+" = "+sel.value);}
function sauver(){if(!culteChoisi){alert("Choisis d abord un culte en haut");return;}var theme=getVal("theme");if(!theme){alert("Mets le theme");return;}var o={type:culteChoisi.type,jour:culteChoisi.jour,nomCulte:culteChoisi.nom,date:getVal("date"),theme:theme,conducteur:getVal("conducteur"),encensement:getVal("encensement"),p1:getVal("p1"),p2:getVal("p2"),p3:getVal("p3"),texte1:getVal("texte1"),lect1:getVal("lect1"),texte2:getVal("texte2"),lect2:getVal("lect2"),predication:getVal("predication"),prierePred:getVal("prierePred"),annonces:getVal("annonces"),queteH:getVal("queteH"),queteF:getVal("queteF"),priereQuete:getVal("priereQuete"),actionGrace:getVal("actionGrace"),priereClot:getVal("priereClot"),conducteurP:getVal("conducteurP"),p1P:getVal("p1P"),p2P:getVal("p2P"),p3P:getVal("p3P"),texteP:getVal("texteP"),lectP:getVal("lectP"),predicationP:getVal("predicationP"),prierePredP:getVal("prierePredP"),annoncesP:getVal("annoncesP"),queteHP:getVal("queteHP"),priereQueteP:getVal("priereQueteP"),priereClotP:getVal("priereClotP"),conducteurS:getVal("conducteurS"),concerneS:getVal("concerneS"),p1S:getVal("p1S"),p2S:getVal("p2S"),texteS:getVal("texteS"),lectS:getVal("lectS"),predicationS:getVal("predicationS"),prierePredS:getVal("prierePredS"),queteS:getVal("queteS"),priereQueteS:getVal("priereQueteS"),priereClotS:getVal("priereClotS"),detailsS:getVal("detailsS"),note:getVal("note")};if(editIndex>=0){data[editIndex]=o;editIndex=-1;}else{data.unshift(o);}localStorage.setItem("programme_final",JSON.stringify(data));document.getElementById("formBox").style.display="none";alert("Enregistre: "+o.nomCulte);afficher();}
function toggleDetail(i){var d=document.getElementById("detail-"+i);d.style.display=(d.style.display==="block")?"none":"block";}
function textePartage(c){var t="⛪ PROGRAMME DE CULTE PAROISSE JESOUDEGBE D'ABOUABOUT PORT BOUET GONZAGUVILLE\n📞 TEL : 225 01 72 82 00 46\n"+c.nomCulte+" - "+c.jour+" "+c.date+"\nTheme: "+c.theme+"\n\n";if(c.type==="priere"){return t+"Conducteur: "+c.conducteurP+"\nPriere: "+c.p1P+", "+c.p2P+", "+c.p3P+"\nTEXTE: "+c.texteP+" Lecteur: "+c.lectP+"\nPredication: "+c.predicationP+"\nQuete: "+c.queteHP+"\nCloture: "+c.priereClotP;}if(c.type==="special"){return t+"Conducteur: "+c.conducteurS+"\nConcerne: "+c.concerneS+"\nLecture: "+c.texteS+"\nPredication: "+c.predicationS+"\nQuete: "+c.queteS;}return t+"Conducteur: "+c.conducteur+"\nEncensement: "+c.encensement+"\nPriere: "+c.p1+", "+c.p2+", "+c.p3+"\n1er: "+c.texte1+" Lecteur: "+c.lect1+"\n2eme: "+c.texte2+" Lecteur: "+c.lect2+"\nPredication: "+c.predication+"\nQuete H: "+c.queteH+" F: "+c.queteF+"\nCloture: "+c.priereClot;}
function afficher(){var r=(document.getElementById("rech").value||"").toLowerCase();var html="";data.forEach(function(c,i){if(!((c.theme+" "+c.nomCulte).toLowerCase().indexOf(r)>=0))return;var cond=c.type==="priere"?c.conducteurP:c.type==="special"?c.conducteurS:c.conducteur;var det="";if(c.type==="priere"){det="Conducteur: "+c.conducteurP+"<br>Priere: "+c.p1P+", "+c.p2P+", "+c.p3P+"<br>TEXTE: "+c.texteP+"<br>Predication: "+c.predicationP+"<br>Quete: "+c.queteHP;}else if(c.type==="special"){det="Conducteur: "+c.conducteurS+"<br>Concerne: "+c.concerneS+"<br>Lecture: "+c.texteS+"<br>Predication: "+c.predicationS+"<br>Quete: "+c.queteS;}else{det="Conducteur: "+c.conducteur+"<br>Priere: "+c.p1+", "+c.p2+", "+c.p3+"<br>1er: "+c.texte1+"<br>2eme: "+c.texte2+"<br>Predication: "+c.predication+"<br>Quete: "+c.queteH+" / "+c.queteF;}html+='<div class="prog"><div class="centre"><span class="badge">'+c.nomCulte+'</span></div><div class="grosTitre">'+c.theme+'</div><div class="centre">'+c.date+' - '+cond+'</div><button onclick="toggleDetail('+i+')" style="background:#0f766e;color:#fff;margin-top:10px">👁️ VOIR LE PROGRAMME</button><div class="detail" id="detail-'+i+'">'+det+'<br><br><div class="btns"><a class="wa" href="https://api.whatsapp.com/send?text='+encodeURIComponent(textePartage(c))+'" target="_blank">WhatsApp</a><a class="sms" href="sms:?body='+encodeURIComponent(textePartage(c))+'">SMS</a><button class="print" onclick="window.print()">Imprimer</button></div><div class="btns"><button class="edit" onclick="modifier('+i+')">Modifier</button><button class="copy" onclick="copier('+i+')">Copier</button><button class="del" onclick="supp('+i+')">Supprimer</button></div></div></div>';});document.getElementById("liste").innerHTML=html||"Aucun programme";}
function modifier(i){var c=data[i];editIndex=i;var cc=null;for(var k=0;k<CULTES.length;k++){if(CULTES[k].nom===c.nomCulte)cc=CULTES[k];}culteChoisi=cc||{type:c.type,nom:c.nomCulte,jour:c.jour};document.getElementById("formBox").style.display="block";document.getElementById("formTitle").innerText="Modifier: "+c.nomCulte;document.getElementById("partCulte").style.display=c.type==="culte"?"block":"none";document.getElementById("partPriere").style.display=c.type==="priere"?"block":"none";document.getElementById("partSpecial").style.display=c.type==="special"?"block":"none";setVal("date",c.date);setVal("theme",c.theme);var ids=["conducteur","encensement","p1","p2","p3","texte1","lect1","texte2","lect2","predication","prierePred","annonces","queteH","queteF","priereQuete","actionGrace","priereClot","conducteurP","p1P","p2P","p3P","texteP","lectP","predicationP","prierePredP","annoncesP","queteHP","priereQueteP","priereClotP","conducteurS","concerneS","p1S","p2S","texteS","lectS","predicationS","prierePredS","queteS","priereQueteS","priereClotS","detailsS","note"];ids.forEach(function(id){setVal(id,c[id]);});window.scrollTo(0,0);}
function copier(i){var c=data[i];modifier(i);editIndex=-1;setVal("date",new Date().toISOString().slice(0,10));alert("Copie - change la date");}
function supp(i){if(confirm("Supprimer ?")){data.splice(i,1);localStorage.setItem("programme_final",JSON.stringify(data));afficher();}}
function demarrer(){
  try{var s=localStorage.getItem("eglise_membres_final");if(s)MEMBRES=JSON.parse(s);}catch(e){}
  try{var s2=localStorage.getItem("eglise_officiers_final");if(s2)OFFICIERS=JSON.parse(s2);}catch(e){}
  try{var s3=localStorage.getItem("programme_final");if(s3)data=JSON.parse(s3);}catch(e){}
  if(!MEMBRES.length)MEMBRES=DEFAUT_MEM.slice();
  if(!OFFICIERS.length)OFFICIERS=DEFAUT_OFF.slice();
  if(!CULTES.length)CULTES=DEFAUT_CULTES.slice();
  if(!data.length)data=[{type:"culte",jour:"Dimanche 10h",nomCulte:"Culte Dimanche Matin - 10h",date:"2026-11-22",theme:"Relation entre la mort et le peche",conducteur:"Vn.Sn.w. Joseph",encensement:"Ev. Dominique GNONNINDOU",p1:"Samuel HIUSSINOU",p2:"Sn.M. Alice AZONSSI",p3:"Ev. Dominique GNONNINDOU",texte1:"1 Samuel 25:32-38",lect1:"Samuel HIUSSINOU",texte2:"Romain 1:24-32",lect2:"Benedicte GBENOU",predication:"Papa",prierePred:"",annonces:"",queteH:"un papa",queteF:"une mama",priereQuete:"un dev",actionGrace:"",priereClot:"Mn GODONOU Mariette",note:""}];
  fetch("data.json").then(function(r){return r.json();}).then(function(j){
    if(!localStorage.getItem("eglise_membres_final")&&j.fideles)MEMBRES=j.fideles;
    if(!localStorage.getItem("eglise_officiers_final")&&j.officiers)OFFICIERS=j.officiers;
    if(j.cultes)CULTES=j.cultes;
    document.getElementById("date").value=new Date().toISOString().slice(0,10);
    triAlpha();renderFideles();renderOff();afficher();
  }).catch(function(){
    document.getElementById("date").value=new Date().toISOString().slice(0,10);
    triAlpha();renderFideles();renderOff();afficher();
  });
}
demarrer();
