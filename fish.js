var proxyUrl ="https://api.allorigins.win/get?url=";
var apiUrl = "https://www.fishwatch.gov/api/species/";
var Data;
var blocResultat = document.querySelector('#bloc-resultats');
var blocFav = document.getElementById("liste-favoris");
var elementrecherche;
var ilyafav;
var url;

function search(){
    blocResultat.value ="";
    elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = elementrecherche.replace(" ","-");
    elementrecherche = elementrecherche.toLowerCase();
    elementrecherche = encodeURIComponent(elementrecherche);
    url = proxyUrl+encodeURIComponent(apiUrl+elementrecherche);
    
    loadJSON(url, myData,'jsonp');
}

function rechercheByFav(name){
  var barre = document.getElementById("zone_recherche");
  barre.value = name;
}

function affiche(i,nom){
    var valeur = document.createElement("section");
    valeur.innerHTML = i;
    blocResultat.appendChild(valeur);
    valeur.classList.add(nom);
}
function afficheFav(i){
  var leLi = document.createElement("li");
  blocFav.appendChild(leLi);
  var valeur = document.createElement("span");
  valeur.innerHTML = i+" ";
  leLi.appendChild(valeur);
  leLi.innerHTML += "<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" width=15 title=\"Cliquer pour supprimer le favori\">";
  valeur.title = title="Cliquer pour relancer la recherche";
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

  function Fav(){
    var elem = document.getElementById("etoile");
    
    if(elem.getAttribute('src') == "images/etoile-vide.svg"){
      elem.setAttribute('src','images/etoile-pleine.svg');
      elem.setAttribute('alt','Etoile Pleine');
      if(elementrecherche == undefined){
        alert("Vous n'avez pas encore fait de recherche !");
      }else{
        afficheFav(elementrecherche,"span");
        console.log(url);
        setCookie(elementrecherche, url);
      }
    }else{
      elem.setAttribute('src','images/etoile-vide.svg');
      elem.setAttribute('alt','Etoile Vide');
    }
  }
