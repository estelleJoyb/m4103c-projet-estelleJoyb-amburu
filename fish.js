var proxyUrl ="https://api.allorigins.win/get?url=";
var apiUrl = "https://www.fishwatch.gov/api/species/";
var Data;
var elementRecherche;
var url;
var blocResultat = document.querySelector('#bloc-resultats');
var fav = document.querySelector("#btn-favoris");
var etoile = document.getElementById("etoile");
var blocFav = document.getElementById("liste-favoris");
var listeFav = new Array();
var poissonLi;

function onLoad(){
  fav.onclick=function(){favoris()};
}

function search(){
    elementRecherche = document.getElementById("zone_recherche").value;
    elementRecherche = elementRecherche.replace(/ /g,"-");
    elementRecherche = elementRecherche.toLowerCase();
    elementRecherche = encodeURIComponent(elementRecherche);
    url = proxyUrl+encodeURIComponent(apiUrl+elementRecherche);
    loadJSON(url, myData,'jsonp');
    for(i = 0; i < listeFav.length; i++){
      if(elementRecherche != listeFav[i]){
        etoile.setAttribute('src','images/etoile-vide.svg');
        etoile.setAttribute('alt','Etoile Vide');
      }
    }
    if(blocResultat != null){
      blocResultat.innerHTML = " ";
    }
}

function affiche(i,nom){
    var valeur = document.createElement("section");
    valeur.innerHTML = i;
    blocResultat.appendChild(valeur);
    valeur.classList.add(nom);
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
      //if(res["Species Name"] == elementRecherche) {
        affiche(res["Species Name"], "name");
        affiche(" - ", "name2");
        affiche(res["Scientific Name"], "name3")
        affiche("Habitat :" +res["Habitat"], "habitat");
        afficheImage(res["Species Illustration Photo"].src, "illu");
        
    }
  }
//D'après Lori :
//faire fichier JSON ou on stok array

//localStorage.setItem("favori",stringify(objJSON))
  function favoris(){
    if(listeFav.length === 0){
      //si il n'y a pas de poisson en favoris
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine');
      localStorage.setItem(elementRecherche,elementRecherche);
      listeFav[0] = elementRecherche;
      ajouteFav(elementRecherche);
    } else if (localStorage.getItem(elementRecherche) == elementRecherche){
      //si le poisson actuel est déjà en favoris
      etoile.setAttribute('src','images/etoile-vide.svg');
      etoile.setAttribute('alt','Etoile Vide');
      localStorage.removeItem(elementRecherche,elementRecherche);
      suppFav(elementRecherche);
    } else {
      //si il y a déjà des favoris mais pas le poisson actuel
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine'); 
      localStorage.setItem(elementRecherche,elementRecherche);
      listeFav.push(elementRecherche);
      ajouteFav(elementRecherche);
    }
  }

  function ajouteFav(elem){
    if(listeFav.length == 0){
    //si la liste des favoris est vide
      var valeur = document.createElement("p");
      valeur.innerHTML = "( &empty; Aucune recherche enregistrée )";
      document.getElementById("liste-favoris").appendChild(valeur);
    } else {
        for(var i = 0; i < listeFav.length; i++){
            //Pour chaque élément de listeFav, on crée un élément li poissonLi de classe unFavori
            poissonLi = document.createElement("li");
            poissonLi.classList.add("unFavori");

            //On crée un élément span poissonActuel et une imageCroix de suppression dans chaque li
            var poissonActuel = document.createElement("span");
            var imageCroix = document.createElement("img");
            
            //On donne leur valeur aux éléments créés
            poissonActuel.innerHTML = listeFav[i];

            imageCroix.src = "images/croix.svg";
            imageCroix.alt = "Croix";
            imageCroix.title = "Cliquez pour supprimer le favori";
            imageCroix.width = "15";
            imageCroix.classList.add("croix");

            imageCroix.onclick=function(){
              poissonLi.remove();
              suppFav(elem)
            };

            poissonLi.appendChild(poissonActuel);
            poissonLi.appendChild(imageCroix);
            blocFav.appendChild(poissonLi);
        }
      }
    }

  function suppFav(elem){
    localStorage.removeItem(elem);
    for(i = 0; i <= listeFav.length; i++){
      if(listeFav[i]==elem){
        listeFav.splice(i,1);
        poissonLi.remove();
        etoile.setAttribute('src','images/etoile-vide.svg');
        etoile.setAttribute('alt','Etoile Vide');
      }
    }
  }

