<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";

		// echo "Today is " . date("d/m/Y") . "<br>";

		$bd1->query("CREATE TABLE `usuarios` (
			`id` int NOT NULL AUTO_INCREMENT,
			`email` varchar(250) NOT NULL UNIQUE,
			`nombreCompleto` varchar(255) NOT NULL,
			`username` varchar(255) NOT NULL,
			`password` varchar(255) NOT NULL,
			`descripcion` TEXT,
			`imagenUsuario` varchar(255) NOT NULL,
			`userTwitter` varchar(255),
			`userFacebook` varchar(255),
			`userInstagram` varchar(255),
			`esDeveloper` varchar(1) NOT NULL,
			`esAdmin` varchar(1) NOT NULL,
			`solicitaAscenso` varchar(1) NOT NULL,
			`codedPasswd` varchar(255) NOT NULL,
			PRIMARY KEY (`id`)
		);");

		$bd1->query("CREATE TABLE `juegos` (
			`id` int NOT NULL AUTO_INCREMENT,
			`idUsuario` int NOT NULL,
			`nombreJuego` varchar(255) NOT NULL,
			`descripcion` varchar(255),
			`enlaceJuego` varchar(250) NOT NULL UNIQUE,
			`precio` double NOT NULL,
			`miniatura` varchar(255) NOT NULL,
			`video` varchar(255),
			`enlaceDemo` varchar(255),
			`validado` varchar(1) NOT NULL,
			PRIMARY KEY (`id`)
		);");

		$bd1->query("CREATE TABLE `genero` (
			`id` int NOT NULL AUTO_INCREMENT,
			`nombreGenero` varchar(255) NOT NULL,
			`descripcion` varchar(255),
			PRIMARY KEY (`id`)
		);");

		$bd1->query("CREATE TABLE `comentarios` (
			`id` int NOT NULL AUTO_INCREMENT,
			`idUsuario` int NOT NULL,
			`idJuego` int NOT NULL,
			`comentario` varchar(255) NOT NULL,
			`subidoEn` varchar(255) NOT NULL,
			PRIMARY KEY (`id`)
		);");

		$bd1->query("CREATE TABLE `favoritos` (
			`idUsuario` int NOT NULL,
			`idJuego` int NOT NULL
		);");

		$bd1->query("CREATE TABLE `ventas` (
			`id` int NOT NULL AUTO_INCREMENT,
			`idUsuario` int NOT NULL,
			`fecha` varchar(10) NOT NULL,
			`precioTotal` double NOT NULL,
			PRIMARY KEY (`id`)
		);");

		$bd1->query("CREATE TABLE `detalleVenta` (
			`id` int NOT NULL AUTO_INCREMENT,
			`idJuego` int NOT NULL,
			`idVenta` int NOT NULL,
			PRIMARY KEY (`id`)
		);");

		$bd1->query("CREATE TABLE `puntuaje` (
			`id` int NOT NULL AUTO_INCREMENT,
			`idUsuario` int NOT NULL,
			`idJuego` int NOT NULL,
			`puntuacion` int NOT NULL,
			`fechaPublicacion` varchar(255) NOT NULL,
			PRIMARY KEY (`id`)
		);");

		$bd1->query("CREATE TABLE `juegosComprados` (
			`idUsuario` int NOT NULL,
			`idJuego` int NOT NULL
		);");

		$bd1->query("CREATE TABLE `generoPorJuego` (
			`idJuego` int NOT NULL,
			`idGenero` int NOT NULL
		);");

		$bd1->query("CREATE TABLE `imagenSecund` (
			`id` int NOT NULL AUTO_INCREMENT,
			`idJuego` int NOT NULL,
			`rutaImagen` varchar(255) NOT NULL,
			PRIMARY KEY (`id`)
		);");

		$bd1->query("CREATE TABLE `juegoPorDeveloper` (
			`idUsuario` int NOT NULL,
			`idJuego` int NOT NULL,
			`fechaSubida` varchar(10) NOT NULL
		);");

		// $bd1->query("CREATE TABLE `recuperarPassword` (
		// 	`email` varchar(250) NOT NULL UNIQUE,
		// 	`passwordCode` varchar(255) NOT NULL
		// );");

		$bd1->query("ALTER TABLE `juegos` ADD CONSTRAINT `juegos_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`);");

		$bd1->query("ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`);");

		$bd1->query("ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_fk1` FOREIGN KEY (`idJuego`) REFERENCES `juegos`(`id`);");

		$bd1->query("ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_fk2` FOREIGN KEY (`contestaA`) REFERENCES `comentarios`(`id`);");
		
		$bd1->query("ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`);");

		$bd1->query("ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_fk1` FOREIGN KEY (`idJuego`) REFERENCES `juegos`(`id`);");

		$bd1->query("ALTER TABLE `ventas` ADD CONSTRAINT `ventas_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`);");

		$bd1->query("ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_fk0` FOREIGN KEY (`idJuego`) REFERENCES `juegos`(`id`);");

		$bd1->query("ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_fk1` FOREIGN KEY (`idVenta`) REFERENCES `ventas`(`id`);");

		$bd1->query("ALTER TABLE `puntuaje` ADD CONSTRAINT `puntuaje_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`);");

		$bd1->query("ALTER TABLE `puntuaje` ADD CONSTRAINT `puntuaje_fk1` FOREIGN KEY (`idJuego`) REFERENCES `juegos`(`id`);");

		$bd1->query("ALTER TABLE `juegosComprados` ADD CONSTRAINT `juegosComprados_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`);");

		$bd1->query("ALTER TABLE `juegosComprados` ADD CONSTRAINT `juegosComprados_fk1` FOREIGN KEY (`idJuego`) REFERENCES `juegos`(`id`);");

		// $bd1->query("ALTER TABLE `solicitudAscenso` ADD CONSTRAINT `solicitudAscenso_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`);");

		$bd1->query("ALTER TABLE `generoPorJuego` ADD CONSTRAINT `generoPorJuego_fk0` FOREIGN KEY (`idJuego`) REFERENCES `juegos`(`id`);");

		$bd1->query("ALTER TABLE `generoPorJuego` ADD CONSTRAINT `generoPorJuego_fk1` FOREIGN KEY (`idGenero`) REFERENCES `genero`(`id`);");

		$bd1->query("ALTER TABLE `imagenSecund` ADD CONSTRAINT `imagenSecund_fk0` FOREIGN KEY (`idJuego`) REFERENCES `juegos`(`id`);");

		$bd1->query("ALTER TABLE `juegoPorDeveloper` ADD CONSTRAINT `juegoPorDeveloper_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`);");

		$bd1->query("ALTER TABLE `juegoPorDeveloper` ADD CONSTRAINT `juegoPorDeveloper_fk1` FOREIGN KEY (`idJuego`) REFERENCES `juegos`(`id`);");

		// $bd1->query("ALTER TABLE `recuperarPassword` ADD CONSTRAINT `recuperarPassword_fk0` FOREIGN KEY (`email`) REFERENCES `usuarios`(`email`);");
    }   
?>  