var url = "https://www.fishwatch.gov/api/species/";

function search(){
    var elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = elementrecherche.replace(" ","-");
    elementrecherche = elementrecherche.toLowerCase();
    elementrecherche = encodeURIComponent(elementrecherche);
    loadJSON(url, myData,'jsonp');
    affiche(elementrecherche);
}

function affiche(i){
    // crée un nouvel élément div
    var newp = document.createElement("p");
    // et lui donne un peu de contenu
    var newContent = document.createTextNode(i);
    // ajoute le nœud texte au nouveau div créé
    newp.appendChild(newContent);

    // ajoute le nouvel élément créé et son contenu dans le DOM
    var currentp = document.getElementById('res');
    document.getElementById("bloc-resultats").insertBefore(newp, currentp);
    newp.classList.add("res");
}

// loadJSON method to open the JSON file.
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
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
  
    // Output only the details on the first post
    console.log(Data[0]);

  }