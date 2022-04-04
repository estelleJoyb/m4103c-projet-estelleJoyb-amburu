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
}

function search(){
  //recherche
  blocResultat.innerHTML = " ";
  elementRecherche = document.getElementById("zone_recherche").value;
  elementRecherche = elementRecherche.replace(/ /g,"-");
  elementRecherche = elementRecherche.toLowerCase();
  elementRecherche = encodeURIComponent(elementRecherche);
  url = proxyUrl+encodeURIComponent(apiUrl+elementRecherche);
  loadJSON(url, myData,'jsonp');
  //traitement de l'etoile
  var favoris = JSON.parse(localStorage.getItem("favoris"));
  if(favoris == null){//on a pas de favoris donc l'etoile est forcement vide
    etoile.setAttribute('src','images/etoile-vide.svg');
    etoile.setAttribute('alt','Etoile Vide');
  }else{
    var index = favoris.findIndex(obj => obj.id==elementRecherche);
    if(index != -1){//donc l'element qu'on recherche est en favori, l etoile est pleine
      etoile.setAttribute('src','images/etoile-pleine.svg');
      etoile.setAttribute('alt','Etoile Pleine');
    }
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

  function favoris(){
    var favoris = JSON.parse(localStorage.getItem("favoris"));
    if(favoris ==null){//on a pas encore de favoris
      save(elementRecherche);
      afficheFav();
    }else{//on a des favoris
      var index = favoris.findIndex(obj => obj.id==elementRecherche);
      if(index == -1){//on a pas l'element qu'on recherche en favori
        etoile.setAttribute('src','images/etoile-pleine.svg');
        etoile.setAttribute('alt','Etoile Pleine');
        save(elementRecherche);
        afficheFav();
      }else{//on a déjà l'élement qu'on recherche en favori donc on le supprime
        etoile.setAttribute('src','images/etoile-vide.svg');
        etoile.setAttribute('alt','Etoile Vide');
        supp(elementRecherche);
        afficheFav();
      }
    }
    
  }

  function afficheFav(elem){
    var favoris = JSON.parse(localStorage.getItem("favoris"));
    if(favoris ==null){//on a pas encore de favoris
      blocFav.innerHTML =" ";//on vide la section des favoris
      var valeur = document.createElement("p");
      valeur.innerHTML = "( &empty; Aucune recherche enregistrée )";
      document.getElementById("liste-favoris").appendChild(valeur);
    }else{//il ya des éléments dedans
      blocFav.innerHTML =" ";//on vide la section des favoris
      for(fav in favoris){//on ajoute chaque favoris à la section des favoris
        //on crée un element li de classe "unFavori"
        var poissonLi = document.createElement("li");
        poissonLi.classList.add("unFavori");
        //on crée un element span et une image par poisson favori
        var poissonActuel = document.createElement("span");
        var imageCroix = document.createElement("img");
        //On donne leur valeur aux éléments créés
        poissonActuel.innerHTML = fav;

        imageCroix.src = "images/croix.svg";
        imageCroix.alt = "Croix";
        imageCroix.title = "Cliquez pour supprimer le favori";
        imageCroix.width = "15";
        imageCroix.classList.add("croix");
        //on ajoute la méthode onclick pour la suppression de l'élement des favoris
        imageCroix.onclick=function(){supp(fav.id)};
        //on ajoute l'image et le span au li de classe "unFavori"
        poissonLi.appendChild(poissonActuel);
        poissonLi.appendChild(imageCroix);
        blocFav.appendChild(poissonLi);
      }
    }
  }
  function save(elem){
    var data = toJSON(elem);
    ajax_post_request(null,"sauvegarde-serveur.php",true, data);
  }

  function supp(elem){
    var favoris = JSON.parse(localStorage.getItem("favoris"));
    var index = favoris.findIndex(obj => obj.id==elem);
    delete favoris[index];
  }


  function toJSON(elem){
    var favoris = JSON.parse(localStorage.getItem("favoris"));
    var objEtat = {favoris:[]};
    if(favoris != null){
      for (fav in favoris) {
        objEtat.favoris.push({"id":fav});
      }
    }
    objEtat.favoris.push({"id":elem});
    localStorage.setItem("favoris",JSON.stringify(favoris));
    return JSON.stringify(objEtat);
  }

  function ajax_post_request(callback, url, async = true, data = null) {
    // Instanciation d'un objet XHR
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (callback && xhr.readyState == XMLHttpRequest.DONE
        && (xhr.status == 200 || xhr.status == 0))
      {
        // => On appelle la fonction callback
        callback(xhr.responseText);
      }
    };
  
    // Initialisation de l'objet
    // (avec la définition du format des données envoyées)
    xhr.open("POST", url, async);
    xhr.setRequestHeader("Content-Type",
      "application/x-www-form-urlencoded");
  
    // Envoi de la requête (avec ou sans paramètre)
    if(data === null){
      xhr.send(null);
    } else {
      xhr.send("data=" + data);
    }
  }
    function ajax_get_request(callback, url, async = true) {
      // Instanciation d'un objet XHR
      var xhr = new XMLHttpRequest();
    
      // Définition de la fonction à exécuter à chaque changement d'état
      xhr.onreadystatechange = function(){
        if (callback && xhr.readyState == XMLHttpRequest.DONE
            && (xhr.status == 200 || xhr.status == 0))
        {
          // Si une fonction callback est définie + que le serveur a fini son travail
          // + que le code d'état indique que tout s'est bien passé
          // => On appelle la fonction callback en passant en paramètre
          //		les données récupérées sous forme de texte brut
          callback(xhr.responseText);
    
        }
      };
    
      // Initialisation de l'objet puis envoi de la requête
      xhr.open("GET", url, async);
      xhr.send();
    }
