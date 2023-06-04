<?php
if(isset($_COOKIE['recuerdame'])):
    echo "Existo, y mi deber es borrarme";
    setcookie('recuerdame', '', time()-7000000);
endif;
?>