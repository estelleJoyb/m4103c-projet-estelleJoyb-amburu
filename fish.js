var proxyUrl ="https://api.allorigins.win/get?url=";
var apiUrl = "https://www.fishwatch.gov/api/species/";
var Data;
var blocResultat = document.querySelector('#bloc-resultats');
var elementrecherche;

function search(){
    elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = elementrecherche.replace(" ","-");
    elementrecherche = elementrecherche.toLowerCase();
    elementrecherche = encodeURIComponent(elementrecherche);
    var url = proxyUrl+encodeURIComponent(apiUrl+elementrecherche);
    loadJSON(url, myData,'jsonp');
}

function affiche(i){
    // // crée un nouvel élément div
    // var newp = document.createElement("p");
    // // et lui donne un peu de contenu
    // var newContent = document.createTextNode(i);
    // // ajoute le nœud texte au nouveau div créé
    // newp.appendChild(newContent);

    // // ajoute le nouvel élément créé et son contenu dans le DOM
    // var currentp = document.getElementById('res');
    // document.getElementById("bloc-resultats").insertBefore(newp, currentp);
    // newp.classList.add("res");
    var valeur = document.createElement('section');
    valeur.innerHTML = i;
    blocResultat.appendChild(valeur);
    valeur.classList.add("res");
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
        var images = (res["Image Gallery"]);
        for(var im of images){
          afficheImage(im.src);
        //}
      }
    }
  }