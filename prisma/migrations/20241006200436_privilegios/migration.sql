-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Formulario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomform` VARCHAR(191) NOT NULL,
    `estado` CHAR(1) NULL,
    `abr` VARCHAR(20) NULL,

    UNIQUE INDEX `Formulario_nomform_key`(`nomform`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preguntas` (
    `nompreg` VARCHAR(191) NOT NULL,
    `nomform_preg` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nompreg`, `nomform_preg`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoArchivo` (
    `nompreg_ta` VARCHAR(191) NOT NULL,
    `contenido_ta` VARCHAR(191) NOT NULL,
    `nomform_ta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nompreg_ta`, `contenido_ta`, `nomform_ta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoCasillas` (
    `nompreg_tc` VARCHAR(191) NOT NULL,
    `contenido_tc` INTEGER NOT NULL,
    `nomform_tc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`contenido_tc`, `nompreg_tc`, `nomform_tc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoDesplegable` (
    `nompreg_td` VARCHAR(191) NOT NULL,
    `contenido_td` VARCHAR(191) NOT NULL,
    `nomform_td` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nompreg_td`, `contenido_td`, `nomform_td`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoFecha` (
    `nompreg_tf` VARCHAR(191) NOT NULL,
    `contenido_tf` DATETIME(3) NOT NULL,
    `nomform_tf` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nompreg_tf`, `contenido_tf`, `nomform_tf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoParrafo` (
    `nompreg_tp` VARCHAR(191) NOT NULL,
    `contenido_tp` VARCHAR(191) NULL,
    `nomform_tp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nomform_tp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoVariasOpciones` (
    `nompreg_vo` VARCHAR(191) NOT NULL,
    `contenido_vo` INTEGER NOT NULL,
    `nomform_vo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nompreg_vo`, `nomform_vo`, `contenido_vo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleCasillas` (
    `contenidodcas` VARCHAR(191) NOT NULL,
    `tipocasillas_contenido` INTEGER NOT NULL,
    `nompreg_tc` VARCHAR(191) NOT NULL,
    `nomform_tc` VARCHAR(191) NOT NULL,
    `estado` CHAR(1) NULL,

    PRIMARY KEY (`tipocasillas_contenido`, `nompreg_tc`, `nomform_tc`, `contenidodcas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleDesplegable` (
    `contenidotdes` VARCHAR(191) NOT NULL,
    `nompreg_td` VARCHAR(191) NOT NULL,
    `contenido_td` VARCHAR(191) NOT NULL,
    `nomform_td` VARCHAR(191) NOT NULL,
    `estado` CHAR(1) NULL,

    PRIMARY KEY (`nompreg_td`, `contenido_td`, `nomform_td`, `contenidotdes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleVariasOpciones` (
    `contenidodvp` VARCHAR(191) NOT NULL,
    `nompreg_vp` VARCHAR(191) NOT NULL,
    `nomform_vp` VARCHAR(191) NOT NULL,
    `contenido_vp` INTEGER NOT NULL,
    `estado` CHAR(1) NULL,

    PRIMARY KEY (`nompreg_vp`, `nomform_vp`, `contenido_vp`, `contenidodvp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `n_rol` VARCHAR(191) NOT NULL,
    `abreviatura` VARCHAR(191) NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permiso` (
    `id_per` INTEGER NOT NULL AUTO_INCREMENT,
    `n_per` VARCHAR(191) NOT NULL,
    `abreviatura` VARCHAR(191) NULL,

    PRIMARY KEY (`id_per`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetallePermiso` (
    `id_dpe` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rol` INTEGER NOT NULL,
    `id_per` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_dpe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `dni` CHAR(8) NOT NULL,
    `n_usu` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `password` VARCHAR(191) NOT NULL,
    `rol_id` INTEGER NOT NULL,
    `subunidad_id_subuni` INTEGER NOT NULL,

    PRIMARY KEY (`dni`, `rol_id`, `subunidad_id_subuni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subunidad` (
    `id_subuni` INTEGER NOT NULL AUTO_INCREMENT,
    `n_subuni` VARCHAR(191) NOT NULL,
    `abreviatura` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_subuni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Preguntas` ADD CONSTRAINT `Preguntas_nomform_preg_fkey` FOREIGN KEY (`nomform_preg`) REFERENCES `Formulario`(`nomform`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoArchivo` ADD CONSTRAINT `TipoArchivo_nompreg_ta_nomform_ta_fkey` FOREIGN KEY (`nompreg_ta`, `nomform_ta`) REFERENCES `Preguntas`(`nompreg`, `nomform_preg`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoCasillas` ADD CONSTRAINT `TipoCasillas_nompreg_tc_nomform_tc_fkey` FOREIGN KEY (`nompreg_tc`, `nomform_tc`) REFERENCES `Preguntas`(`nompreg`, `nomform_preg`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoDesplegable` ADD CONSTRAINT `TipoDesplegable_nompreg_td_nomform_td_fkey` FOREIGN KEY (`nompreg_td`, `nomform_td`) REFERENCES `Preguntas`(`nompreg`, `nomform_preg`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoFecha` ADD CONSTRAINT `TipoFecha_nompreg_tf_nomform_tf_fkey` FOREIGN KEY (`nompreg_tf`, `nomform_tf`) REFERENCES `Preguntas`(`nompreg`, `nomform_preg`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoParrafo` ADD CONSTRAINT `TipoParrafo_nompreg_tp_nomform_tp_fkey` FOREIGN KEY (`nompreg_tp`, `nomform_tp`) REFERENCES `Preguntas`(`nompreg`, `nomform_preg`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoVariasOpciones` ADD CONSTRAINT `TipoVariasOpciones_nompreg_vo_nomform_vo_fkey` FOREIGN KEY (`nompreg_vo`, `nomform_vo`) REFERENCES `Preguntas`(`nompreg`, `nomform_preg`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleCasillas` ADD CONSTRAINT `DetalleCasillas_tipocasillas_contenido_nompreg_tc_nomform_t_fkey` FOREIGN KEY (`tipocasillas_contenido`, `nompreg_tc`, `nomform_tc`) REFERENCES `TipoCasillas`(`contenido_tc`, `nompreg_tc`, `nomform_tc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleDesplegable` ADD CONSTRAINT `DetalleDesplegable_nompreg_td_contenido_td_nomform_td_fkey` FOREIGN KEY (`nompreg_td`, `contenido_td`, `nomform_td`) REFERENCES `TipoDesplegable`(`nompreg_td`, `contenido_td`, `nomform_td`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleVariasOpciones` ADD CONSTRAINT `DetalleVariasOpciones_nompreg_vp_nomform_vp_contenido_vp_fkey` FOREIGN KEY (`nompreg_vp`, `nomform_vp`, `contenido_vp`) REFERENCES `TipoVariasOpciones`(`nompreg_vo`, `nomform_vo`, `contenido_vo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetallePermiso` ADD CONSTRAINT `DetallePermiso_id_per_fkey` FOREIGN KEY (`id_per`) REFERENCES `Permiso`(`id_per`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetallePermiso` ADD CONSTRAINT `DetallePermiso_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Rol`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Rol`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_subunidad_id_subuni_fkey` FOREIGN KEY (`subunidad_id_subuni`) REFERENCES `Subunidad`(`id_subuni`) ON DELETE RESTRICT ON UPDATE CASCADE;
