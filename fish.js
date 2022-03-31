var proxyUrl ="https://api.allorigins.win/get?url=";
var apiUrl = "https://www.fishwatch.gov/api/species/";
var Data;
var blocResultat = document.querySelector('#bloc-resultats');
var blocFav = document.getElementById("liste-favoris");
var elementrecherche;
var ilyafav;
var url;
var etoile = document.getElementById("etoile");
var cookies =[];

function search(){
    blocResultat.innerHTML = " ";

    elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = elementrecherche.replace(/ /g,"-");
    elementrecherche = elementrecherche.toLowerCase();
    elementrecherche = encodeURIComponent(elementrecherche);
    url = proxyUrl+encodeURIComponent(apiUrl+elementrecherche);
    
    if(getCookie(elementrecherche)!=""){//alors on l'a en favori
      if(etoile.getAttribute('src') == "images/etoile-vide.svg"){
        etoile.setAttribute('src','images/etoile-pleine.svg');
        etoile.setAttribute('alt','Etoile Pleine');}
    }else{//pas en favori
      if(etoile.getAttribute('src') =='images/etoile-pleine.svg'){
        etoile.setAttribute('src','images/etoile-vide.svg');
        etoile.setAttribute('alt','Etoile Vide');
      }
    }
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
function afficheFav(){
  blocFavResultat.innerHTML = " ";
  for(var cookie in cookies){
    var leLi = document.createElement("li");
    blocFav.appendChild(leLi);
    var valeur = document.createElement("span");
    valeur.innerHTML = cookie.nom+" ";
    leLi.appendChild(valeur);
    leLi.innerHTML += "<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" width=15 title=\"Cliquer pour supprimer le favori\">";
    valeur.classList.add("poissonFav");
    valeur.title = title="Cliquer pour relancer la recherche";
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

  function Fav(){
    if(elementrecherche == undefined){
        alert("Vous n'avez pas encore fait de recherche !");
    }else{
        
        if(etoile.getAttribute('src') == "images/etoile-vide.svg"){
          etoile.setAttribute('src','images/etoile-pleine.svg');
          etoile.setAttribute('alt','Etoile Pleine');
          afficheFav();
          console.log(url);
          var cookie = setCookie(elementrecherche, url);
          cookies.push(cookie);
        }else{
          etoile.setAttribute('src','images/etoile-vide.svg');
          etoile.setAttribute('alt','Etoile Vide');
          cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }
    if(etoile.getAttribute('src') == "images/etoile-vide.svg"){
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine');
    }else{
      etoile.setAttribute('src','images/etoile-vide.svg');
      etoile.setAttribute('alt','Etoile Vide');
            
    }
  }
