<?php
include('public/conexion/conexion.php');   

$ciudad=$_POST["ciudad"];

$city_name = $ciudad;
$apikey = "1bda2245c8332d0ffff2681f492a9090";
$api_url = "https://api.openweathermap.org/data/2.5/weather?q=$city_name&appid=$apikey";

$weather_data = json_decode(file_get_contents($api_url),true);

$temperature = $weather_data['main']['temp'];
$temperature_in_celcius = round($temperature - 273.15);
$temperature_latitude = $weather_data['coord']['lat'];//Latitude
$temperature_longitude = $weather_data['coord']['lon'];//Longitud
$temperature_humedad = $weather_data['main']['humidity'];//Humidity
$temperature_pressure = $weather_data['main']['pressure'];//Pressure
$temperature_current_weather_description = $weather_data['weather'][0]['description'];//descripción
$temperature_current_weather_icon = $weather_data['weather'][0]['icon'];

$sql = "INSERT INTO `clima` (`id_clima`, `ciudad`, `icono`, `temperatura`, `latitude`, `longitud`, `humedad`, `presion`) VALUES (Null, '$ciudad', '$temperature_current_weather_icon', '$temperature_in_celcius', '$temperature_latitude', '$temperature_longitude', '$temperature_humedad', '$temperature_pressure')";
if ($conexion->query($sql) === TRUE)

$conexion->close();

echo "<img src='http://openweathermap.org/img/wn/".$temperature_current_weather_icon."@2x.png' style='background: #a7a7a7;'>";

?>

<table  class="table table-hover">
    <tr>
        <td>Temperatura: <?php echo $temperature_in_celcius; ?></td>
    </tr>
    <tr>
        <td>Latitude: <?php echo $temperature_latitude; ?></td>
        <td>Longitude  <?php echo $temperature_longitude; ?></td>
    </tr>
    <tr>
        <td>Humidity: <?php echo $temperature_humedad; ?></td>
        <td>Pressure  <?php echo $temperature_pressure; ?></td>
    </tr>
</table>
