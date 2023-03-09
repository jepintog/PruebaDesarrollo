<?php
include('public/conexion/conexion.php');   

$consulta_clima = "SELECT * FROM clima";
$resultado = $conexion->query($consulta_clima);



?>

<table  class="table table-hover">
    <?php
    while ($activos = mysqli_fetch_array($resultado))  
    {
        
    ?>
    <tr>
        <td><?php echo "<img src='http://openweathermap.org/img/wn/".$activos["icono"]."@2x.png' style='background: #a7a7a7;'>"; ?></td>
    </tr>
    <tr>
        <td>Ciudad: <?php echo $activos["ciudad"]; ?></td>
        <td>Fecha Consulta: <?php echo $activos["fecha"]; ?></td>
    </tr>
    <tr>
        <td>Latitude: <?php echo $activos["latitude"]; ?></td>
        <td>Longitude  <?php echo $activos["longitud"]; ?></td>
    </tr>
    <tr>
        <td>Humidity: <?php echo $activos["humedad"]; ?></td>
        <td>Pressure  <?php echo $activos["presion"]; ?></td>
    </tr>
    <?php
    }
    ?>
</table>
