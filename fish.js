function search(){
    //var elementrecherche = $(#zone_recherche).val;
    var elementrecherche = document.getElementById("zone_recherche").value;
    elementrecherche = encodeURIComponent(elementrecherche);
    elementrecherche = elementrecherche.replace(" ","-");
    elementrecherche = elementrecherche.toLowerCase();
    alert(elementrecherche);
}
