<?php
require_once(explode("wp-content", __FILE__)[0] . "wp-config.php");
global $wpdb;

/* =========================Listar Consulta Estado============================================= */

$queryTipoEstado = $wpdb->get_results( "SELECT id_tipo_estado,tipo_estado FROM {$wpdb->prefix}tipo_estado where estado='Activo'" , ARRAY_A);

$listTipoEstado = "";
foreach ( $queryTipoEstado as $resultadoTipoEstado ) {
    $listTipoEstado .= " <option value='" . $resultadoTipoEstado['id_tipo_estado'] . "'>" . $resultadoTipoEstado['tipo_estado'] . "</option>";
}

/* =========================Listar Consulta Canal============================================= */
/*
$queryCanal = $wpdb->get_results( "SELECT id_canal,canal FROM {$wpdb->prefix}cv_natur_canal where estado_canal='Activo'" , ARRAY_A);

$listCanal = "";
foreach ( $queryCanal as $resultadoCanal ) {
    $listCanal .= " <option value='" . $resultadoCanal['id_canal'] . "'>" . $resultadoCanal['canal'] . "</option>";
}
*/