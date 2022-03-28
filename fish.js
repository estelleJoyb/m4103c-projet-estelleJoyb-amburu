function search(){
    var elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = elementrecherche.replace(" ","-");
    elementrecherche = elementrecherche.toLowerCase();
    elementrecherche = encodeURIComponent(elementrecherche);
    alert(elementrecherche);
    affiche(elementrecherche);
}

function affiche(i){
    var blocres = document.getElementById("bloc-resultats");
    if(blocres != null){
        getElementsByClassName("res").value = i.value;
    }
   // crée un nouvel élément div
  //var newP = document.createElement("p");
  // et lui donne un peu de contenu
  //var newContent = document.createTextNode(i);
  // ajoute le nœud texte au nouveau div créé
  //newP.appendChild(newContent);

  // ajoute le nouvel élément créé et son contenu dans le DOM
  //var currentP = document.getElementById('res');
  //document.getElementById("bloc-resultats").insertBefore(newP, currentP);
  }