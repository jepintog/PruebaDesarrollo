function consultar()
{
            var url8 = "http://localhost/pruebas/buscar.php";  
            var form = document.getElementById('formulario_clima');
            var formData = new FormData(form);
            var ciudad = document.getElementById('ciudad').value;
            
            
            if(ciudad == null || ciudad.length == 0 || /^\s+$/.test(ciudad))
            {

          
                Swal.fire(
                'Advertencia',
                'El campo ciudad es obligatorio',
                'error'
                );        
                return false;
            } 

            $.ajax({

                type:"POST",
                url:url8,
                data:("ciudad="+ciudad)
                }).done(function(respuesta){
                document.getElementById("actualizar_datos_clima").innerHTML=respuesta;
                jQuery('#modal_datos_clima').modal('show');
            })
}

function historial()
{
            var url8 = "http://localhost/pruebas/buscarHistorial.php";  
            
            $.ajax({

                type:"POST",
                url:url8
                }).done(function(respuesta){
                document.getElementById("actualizar_historial_clima").innerHTML=respuesta;
                jQuery('#modal_historial_clima').modal('show');
            })
}