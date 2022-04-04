<?php
    $str = $_POST['data'];
    $fich = fopen('favori.json', 'w');
    // Ecriture de la chaine récupérée dans le fichier favori.json
    fputs($fich, $str);
    fclose($fich);
  ?>
