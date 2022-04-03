var proxyUrl ="https://api.allorigins.win/get?url=";
var apiUrl = "https://www.fishwatch.gov/api/species/";
var Data;
var elementRecherche;
var url;
var isFav = false;
var blocResultat = document.querySelector('#bloc-resultats');
var fav = document.querySelector("#btn-favoris");
var etoile = document.getElementById("etoile");
var blocFav = document.getElementById("liste-favoris");
var listeFav = new Array();

function onLoad(){
  fav.onclick=function(){favoris()};
}

function search(){
    blocResultat.innerHTML = " ";
    elementRecherche = document.getElementById("zone_recherche").value;
    elementRecherche = elementRecherche.replace(/ /g,"-");
    elementRecherche = elementRecherche.toLowerCase();
    elementRecherche = encodeURIComponent(elementRecherche);
    url = proxyUrl+encodeURIComponent(apiUrl+elementRecherche);
    loadJSON(url, myData,'jsonp');
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


  function favoris(){
    if(listeFav.length === 0){
      //si il n'y a pas de poisson en favoris
      isFav = true;
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine');
      listeFav[0] = elementRecherche;
      console.log("if");

    } else if (!isFav){
      //si il y a déjà des favoris mais pas le poisson actuel
      isFav = true;
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine');
      listeFav[listeFav.length] = elementRecherche;
      localStorage.setItem("listeFav", JSON.stringify(listeFav));
    } else {
      //si le poisson est déjà favori
      for(i = 0; i < listeFav.length; i++){
        if(elementRecherche == listeFav[i]){
          suppFav(listeFav, listeFav[i]);
        }
      }
    }
    ajouteFav(elementRecherche);
  }

  function ajouteFav(elem){
    if(listeFav.length == 0){
    //si la liste des favoris est vide
      var valeur = document.createElement("p");
      valeur.innerHTML = "( &empty; Aucune recherche enregistrée )";
      document.getElementById("liste-favoris").appendChild(valeur);
    } else {
      for(var i = 0; i< listeFav.length; i++){
        //Pour chaque élément de listeFav, on crée un élément li poissonLi de classe unFavori
        var poissonLi = document.createElement("li");
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

        imageCroix.onclick=function(){suppFav(elem)};

        poissonLi.appendChild(poissonActuel);
        poissonLi.appendChild(imageCroix);
        blocFav.appendChild(poissonLi);
      }
      }
    }

  function suppFav(listeFav, index){
    var isExecuted = confirm("Etes vous certain de vouloir supprimer ce favori ?");
    if(isExecuted){
      listeFav.splice(index,1);
      localStorage.setItem("favoris",JSON.stringify(listeFav));
      etoile.setAttribute('src','images/etoile-vide.svg');
      etoile.setAttribute('alt','Etoile Vide');
      isFav = false;
    }

    
   /*  console.log(elem);
    blocFav.innerHTML = " ";
    localStorage.removeItem(elem); */
/*     for(i = 0; i <= listeFav.length; i++){
      if(listeFav[i]==elem){
        listeFav = listeFav.slice(i,i+1);
        etoile.setAttribute('src','images/etoile-vide.svg');
        etoile.setAttribute('alt','Etoile Vide');
      }
    } */
  }
