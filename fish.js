var url = "https://www.fishwatch.gov/api/species/";

function search(){
    var elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = elementrecherche.replace(" ","-");
    elementrecherche = elementrecherche.toLowerCase();
    elementrecherche = encodeURIComponent(elementrecherche);
    
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
