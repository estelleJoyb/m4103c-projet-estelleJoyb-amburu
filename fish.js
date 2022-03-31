var proxyUrl ="https://api.allorigins.win/get?url=";
var apiUrl = "https://www.fishwatch.gov/api/species/";
var Data;
var blocResultat = document.querySelector('#bloc-resultats');
var blocFav = document.getElementById("section-favoris");
var elementrecherche;
var ilyafav;

function search(){
    elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = elementrecherche.replace(" ","-");
    elementrecherche = elementrecherche.toLowerCase();
    elementrecherche = encodeURIComponent(elementrecherche);
    var url = proxyUrl+encodeURIComponent(apiUrl+elementrecherche);
    loadJSON(url, myData,'jsonp');
}

function affiche(i){
    var valeur = document.createElement("section");
    valeur.innerHTML = i;
    blocResultat.appendChild(valeur);
    valeur.classList.add("res");
}
function afficheFav(i){
  var leLi = document.createElement("li");
  blocFav.appendChild(leLi);
  var valeur = document.createElement("span");
  valeur.innerHTML = i;
  leLi.appendChild(valeur);
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
        affiche(res["Species Name"]);
        affiche(res["Scientific Name"]);
        affiche("Habitat :" +res["Habitat"]);
        afficheImage(res["Species Illustration Photo"].src);
        
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
        affiche(elementrecherche,"span",)
      }
    }else{
      elem.setAttribute('src','images/etoile-vide.svg');
      elem.setAttribute('alt','Etoile Vide');
    }
  }
