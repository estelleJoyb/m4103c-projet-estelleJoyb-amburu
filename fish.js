var proxyUrl ="https://api.allorigins.win/get?url=";
var apiUrl = "https://www.fishwatch.gov/api/species/";
var Data;
var blocResultat = document.querySelector('#bloc-resultats');
var blocFav = document.getElementById("liste-favoris");
var elementrecherche;
var ilyafav;
var url;
var etoile = document.getElementById("etoile");
var cookies = new Array();
var fav;

function search(id){
    if(id == undefined){
    blocResultat.innerHTML = " ";

    elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = elementrecherche.replace(/ /g,"-");
    elementrecherche = elementrecherche.toLowerCase();
    elementrecherche = encodeURIComponent(elementrecherche);
    url = proxyUrl+encodeURIComponent(apiUrl+elementrecherche);
    
    // if(localStorage.getItem(elementrecherche)==url){//alors on l'a en favori
    //   if(etoile.getAttribute('src') == "images/etoile-vide.svg"){
    //     etoile.setAttribute('src','images/etoile-pleine.svg');
    //     etoile.setAttribute('alt','Etoile Pleine');}
    // }else{
    //   if(etoile.getAttribute('src') == "images/etoile-pleine.svg"){
    //     etoile.setAttribute('src','images/etoile-vide.svg');
    //     etoile.setAttribute('alt','Etoile Vide');}
    // }
    loadJSON(url, myData,'jsonp');
    }else{
      elementrecherche = id;
      search();
    }
}



function affiche(i,nom){
    var valeur = document.createElement("section");
    valeur.innerHTML = i;
    blocResultat.appendChild(valeur);
    valeur.classList.add(nom);
}
function afficheFav(){
  blocFav.innerHTML = " ";
  if(cookies.length == 0){
    var valeur = document.createElement("p");
    valeur.innerHTML = "( &empty; Aucune recherche enregistrée )";
    document.getElementById("favori-null").appendChild(valeur);
    valeur.classList.add("info-vide");
  }else{
    document.getElementById("favori-null").innerHTML = " ";
    for(var i = 0; i< cookies.length; i++){
      var leLi = document.createElement("li");
      blocFav.appendChild(leLi);
      var valeur = document.createElement("span");
      valeur.onclick = function(){search(cookies[i].nom)};
      valeur.innerHTML = cookies[i].nom;
      leLi.appendChild(valeur);
      leLi.innerHTML += "<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" onclick=\"suppFav("+cookies.nom+")\" width=15 title=\"Cliquer pour supprimer le favori\">";
      valeur.classList.add("poissonFav");
      valeur.title = title="Cliquer pour relancer la recherche";
    }
  }
}

function afficheImage(i){
  var valeur = document.createElement('section');
  valeur.innerHTML = "<img src="+i+">";
  blocResultat.appendChild(valeur);
  valeur.classList.add("image");
}


// loadJSON method to open the JSON file.
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          success(xhr.responseText);
        }
        else {
          error(xhr);
        }
      }
    };
    xhr.open('GET', path, true);
    xhr.send();
  }
  

  
  function myData(Data)
  {
    var resultat = JSON.parse(Data);
    var resultat2 = JSON.parse(resultat.contents);

    for(var res of resultat2){
      //if(res["Species Name"] == elementrecherche) {
        affiche(res["Species Name"], "name");
        affiche(" - ", "name2");
        affiche(res["Scientific Name"], "name3")
        affiche("Habitat :" +res["Habitat"], "habitat");
        afficheImage(res["Species Illustration Photo"].src, "illu");
        
    }
  }

class Favori {
  constructor(nom, url) {
    this.nom = nom;
    this.url = url;
  }
}

  function Fav(){
    if(elementrecherche == undefined){
        alert("Vous n'avez pas encore fait de recherche !");
    }else{
        
        if(etoile.getAttribute('src') == "images/etoile-vide.svg"){
          etoile.setAttribute('src','images/etoile-pleine.svg');
          etoile.setAttribute('alt','Etoile Pleine');
          console.log("ajout en favori de " +elementrecherche);
          fav = new Favori(elementrecherche,url);
          localStorage.setItem(elementrecherche,fav);
          var favori = localStorage.getItem(elementrecherche);
          
          
          cookies.push(fav);

          //cookies.push(favori);
          console.log(cookies);
          afficheFav();
        }else{
          etoile.setAttribute('src','images/etoile-vide.svg');
          etoile.setAttribute('alt','Etoile Vide');
          localStorage.removeItem(elementrecherche);
          //cookies.splice(elementrecherche, 1);
          cookies.splice(fav,1);
          console.log("suppression en favori de " +elementrecherche);
          afficheFav();
        }
    }
  
  }
