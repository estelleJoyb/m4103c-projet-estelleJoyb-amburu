function search(){
    //var elementrecherche = $(#zone_recherche).val;
    var elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = elementrecherche.replace(" ","-");
    elementrecherche = elementrecherche.toLowerCase();
    elementrecherche = encodeURIComponent(elementrecherche);
    alert(elementrecherche);
}
