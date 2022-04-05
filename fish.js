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

function onLoad(){
  fav.onclick=function(){favoris()};
  var contenuFav = localStorage.getItem('favoris');
  if(contenuFav == null || contenuFav == ""){
    localStorage.setItem('favoris', JSON.stringify([]));
  } else {
    listeFav = JSON.parse(contenuFav);
  }
  afficheFavoris();
  var zoneRecherche = document.getElementById("zone_recherche");
  zoneRecherche.addEventListener('keyup', function() {majEtoile(this.value)});
  zoneRecherche.addEventListener('keyup', function(event){if (event.keyCode === 13){search();}})
}

function majEtoile(elem){
  console.log(elem);
  if(elem == ""){
    //si la barre de recherche est vide
    etoile.setAttribute('src','images/etoile-vide.svg');
    etoile.setAttribute('alt','Etoile Vide');
    etoile.setAttribute('disabled', true);
  } else {
    elem = elem.replace(/ /g,"-");
    elem = elem.toLowerCase();
    if(listeFav.indexOf(elem) != -1){
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine');
      etoile.removeAttribute('disabled');
    } else {
      etoile.setAttribute('src','images/etoile-vide.svg');
      etoile.setAttribute('alt','Etoile Vide');
    }
  }
}

function search(id){
  if(id == undefined){
    elementRecherche = document.getElementById("zone_recherche").value;
    elementRecherche = elementRecherche.replace(/ /g,"-");
    elementRecherche = elementRecherche.toLowerCase();
    elementRecherche = encodeURIComponent(elementRecherche);
    url = proxyUrl+encodeURIComponent(apiUrl+elementRecherche);
    loadJSON(url, myData,'jsonp');

    if(listeFav.indexOf(elementRecherche) != -1){
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine');
    } else {
      etoile.setAttribute('src','images/etoile-vide.svg');
      etoile.setAttribute('alt','Etoile Vide');
    }
    if(blocResultat != null){
      blocResultat.innerHTML = " ";
    }
  } else {
    elementRecherche = document.getElementById("zone_recherche").value = id;
    elementRecherche = encodeURIComponent(elementRecherche);
    url = proxyUrl+encodeURIComponent(apiUrl+elementRecherche);
    loadJSON(url, myData,'jsonp');

    if(listeFav.indexOf(elementRecherche) != -1){
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine');
    } else {
      etoile.setAttribute('src','images/etoile-vide.svg');
      etoile.setAttribute('alt','Etoile Vide');
    }
    if(blocResultat != null){
      blocResultat.innerHTML = " ";
    }
  }
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
  
  //gestion d'affichage des résultats
  function myData(Data)
  {
    var resultat = JSON.parse(Data);
    var resultat2 = JSON.parse(resultat.contents);

    for(var res of resultat2){

        var sectionResultat = document.createElement("section");
        sectionResultat.classList.add("conteneur_resultats"); 

        var nom = document.createElement("span");
        nom.innerHTML = res["Species Name"]+" - "+res["Scientific Name"]+"<br></br>";
        sectionResultat.appendChild(nom);

        var habitatImage = document.createElement("section");
        habitatImage.classList.add("section_habitat_image");
 
        if(res["Habitat"] == null){
          var habitatVide = document.createElement("span");
          habitatVide.innerHTML = "Il n'y a pas d'informations sur l'habitat de ce poisson.";
          habitatImage.appendChild(habitatVide);
        } else {
          var habitat = document.createElement("span");
          habitat.innerHTML = "Habitat :" +res["Habitat"], "habitat";
          habitatImage.appendChild(habitat);
        }
        if(res["Species Illustration Photo"] == null){
          var imageVide = document.createElement("p");
          imageVide.innerHTML = "L'image n'est pas disponible.";
          habitatImage.appendChild(imageVide);
        } else {
          var image = document.createElement("img");
          image.src = res["Species Illustration Photo"].src;
          habitatImage.appendChild(image);
        } 
        sectionResultat.appendChild(habitatImage);
        blocResultat.appendChild(sectionResultat); 
    }
  }

  function favoris(){
    //lorsqu'on clique sur l'étoile
    if(elementRecherche == null){
      return;
    }
    if(listeFav.length === 0){
      //si il n'y a pas de poisson en favoris
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine');
      listeFav[0] = elementRecherche;
      localStorage.setItem('favoris', JSON.stringify(listeFav));
      afficheFavoris();
      //ajouteFav(elementRecherche);
    } else if (listeFav.indexOf(elementRecherche) != -1){
      //si le poisson actuel est déjà en favoris
      etoile.setAttribute('src','images/etoile-vide.svg');
      etoile.setAttribute('alt','Etoile Vide');
      suppFav(elementRecherche);
      afficheFavoris();
    } else {
      //si il y a déjà des favoris mais pas le poisson actuel
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine'); 
      listeFav.push(elementRecherche);
      localStorage.setItem('favoris', JSON.stringify(listeFav));
      afficheFavoris();
      //ajouteFav(elementRecherche);
    }
  }

  function afficheFavoris(){
    if(listeFav.length == 0){
    //si la liste des favoris est vide
      blocFav.innerHTML = " ";
      var valeur = document.createElement("p");
      valeur.innerHTML = "( &empty; Aucune recherche enregistrée )";
      document.getElementById("liste-favoris").appendChild(valeur);
    } else {
      blocFav.innerHTML = " ";
        for(var i = 0; i < listeFav.length; i++){
            //Pour chaque élément de listeFav, on crée un élément li poissonLi de classe unFavori
            const poissonLi = document.createElement("li");
            poissonLi.classList.add("unFavori");

            //On crée un élément span poissonActuel et une imageCroix de suppression dans chaque li
            var poissonActuel = document.createElement("span");
            var imageCroix = document.createElement("img");
            
            //On donne leur valeur aux éléments créés
            poissonActuel.innerHTML = listeFav[i];
            const contenuspan = new String(listeFav[i]);//const car sinon ça prends toujours la dernière valeur de listFav
            poissonActuel.onclick=function(){
              search(contenuspan);
            }
            imageCroix.src = "images/croix.svg";
            imageCroix.alt = "Croix";
            imageCroix.title = "Cliquez pour supprimer le favori";
            imageCroix.width = "15";
            imageCroix.classList.add("croix");
            imageCroix.onclick=function(){
              suppFav(contenuspan);
            };
            poissonLi.appendChild(poissonActuel);
            poissonLi.appendChild(imageCroix);
            blocFav.appendChild(poissonLi);
        }
      }
    }

  function suppFav(elem){
    elem = elem.toString();
    var index = listeFav.indexOf(elem);
    var isExecuted = confirm("Etes-vous certains de vouloir supprimer ce poisson de vos favoris ?");
    if(isExecuted){
      if(index != -1){
        listeFav.splice(index,1);
        localStorage.setItem('favoris', JSON.stringify(listeFav));
        afficheFavoris();
      }
      if(document.getElementById("zone_recherche").value == elem){
        etoile.setAttribute('src','images/etoile-vide.svg');
        etoile.setAttribute('alt','Etoile Vide');
      }
    }
  }

