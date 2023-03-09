<?php
include('public/index.php');   

?>
    <section style="text-align: center;border: 0px solid #ccc;border-radius: 5px;margin-left: -2%;">
        <form method="POST" id='formulario_clima' enctype="multipart/form-data">
            <table style="text-align: center;margin-left: 44%;">
                <tr>
                    <tr>
                        <td>
                            <h1>El clima</h1><br>
                        </td>
                    </tr>
                </tr>
                <tr>
                    <tr>
                        <td>
                            <img src='http://localhost/pruebas/public/images/mundo.jpg' style="width: 184px;">
                        </td>
                    </tr>
                </tr>
                <tr>
                    <tr>
                        <td>
                            <input class="form-control" type="text" id="ciudad" name="ciudad" placeholder="Por favor digite la Ciudad">
                        </td>
                    </tr>
                </tr>
                <tr>
                    <tr style="text-align: initial;">
                        <td><button type="button" class="btn btn-primary" onclick="consultar()">Consultar</button></td>
                    </tr>
                </tr>
                <tr>
                    <tr style="text-align: initial;">
                        <td><button type="button" class="btn btn-primary" onclick="historial()">Historial</button></td>
                    </tr>
                </tr>
                
            </table>
            
        </form>
    </section>


    <!-- Modal Datos-->
    <div class="modal fade" id="modal_datos_clima" tabindex="-1" aria-labelledby="modal_datos_clima_activosLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 132%;">
                <div style="background: #0a58ca;" class="modal-header">
                    <h5 class="modal-title" id="modal_datos_clima_activosLabel" style="color: white;text-align: center">Datos del clima</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="actualizar_datos_clima">

                    </div>
                </div>
            </div>
        </div>
    </div>


      <!-- Modal Historial-->
      <div class="modal fade" id="modal_historial_clima" tabindex="-1" aria-labelledby="modal_historial_clima_activosLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 132%;">
                <div style="background: #0a58ca;" class="modal-header">
                    <h5 class="modal-title" id="modal_historial_clima_activosLabel" style="color: white;text-align: center">Historial del clima</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="actualizar_historial_clima">

                    </div>
                </div>
            </div>
        </div>
    </div>


   
