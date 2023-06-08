<?php
//SI esta colocada la cookie "Recuerdame", la elimina 
if(isset($_COOKIE['recuerdame'])):
    // echo "Existo, y mi deber es borrarme";
    setcookie('recuerdame', '', time()-7000000);
endif;
?>