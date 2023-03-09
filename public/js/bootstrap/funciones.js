var urles = '..';



function registrar_motivos()
{

        var form = document.getElementById('formulario_registrar_motivos');
        var formData = new FormData(form);
        var url_principal = document.getElementById('url_principal').value;
        var motivos = document.getElementById('motivos').value;
        var url = url_principal+"/admin/motivos/registrar.php";

        var banderaRBTN = false;



    
        if(motivos == null || motivos.length == 0 || /^\s+$/.test(motivos))
        {

      
            Swal.fire(
            'Advertencia',
            'El campo motivo es obligatorio',
            'error'
            );        
            return false;
        } 
    
          $.ajax({
            type:"POST",
            url:url,
            data:formData,
            contentType:false,
            processData:false,
            success:function(respuesta)
      
            {
            if (respuesta==1) 
            {
                
                Swal.fire(
                'Éxito',
                'Se ha registrado de manera correcta',
                'success'
                );
                
            
                $("#formulario_registrar_motivos")[0].reset();
                
               
            }
             else
             {

                Swal.fire(
                'Advertencia',
                respuesta,
                'error'
                );

             }
            }
          })
        
}

function consultar_motivos ()
{
        $.fn.dataTable.ext.errMode = 'throw';
        var consulta_estado = document.getElementById('consulta_estado').value;
        var url_principal = document.getElementById('url_principal').value;
        var url8 = url_principal+"/admin/motivos/listar_motivos.php?consulta_estado="+consulta_estado;

        
        if(consulta_estado == null || consulta_estado.length == 0 || /^\s+$/.test(consulta_estado))
        {
                Swal.fire(
                'Advertencia',
                'El campo estado es obligatorio',
                'error'
                );        
                return false;
        } 


        tabla = $('#listado_motivos_filtro').DataTable({
          "bProcessing": true,
          destroy: true,
          "sAjaxSource": url8,
          "aoColumns": [
                { mData: 'id_motivos' },
                { mData: 'motivos' },
                { mData: 'estado' },
                { mData: 'edicion' },
                { mData: 'accion_editar' }
              ],
          //retrieve: true,
          dom: 'Blfrtip',
          "pageLength": 5,
          buttons: [ 
             {
               extend: 'excelHtml5',
               text: 'Generar reporte'
             }           
          ],
          "language": {
            "sProcessing":     "",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "oPaginate": {
              "sFirst":    "Primero",
              "sLast":     "Último",
              "sNext":     "Siguiente",
              "sPrevious": "Anterior"
            },
            "oAria": {
              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
              "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
          }
        });

        $("div[name$='tabla_oculta']").css("display","block");      
}


function listar_generico_motivos(id_motivos,url_principal)
{
    var url_principal = url_principal;
    
    var url8 = url_principal+"/motivos/buscar.php";
    $.ajax({
    type:"POST",
    url:url8,
    data: {"id_motivos": id_motivos, "url_principal": url_principal}
  }).done(function(respuesta){
    document.getElementById("actualizar_datos_motivos").innerHTML=respuesta;
  })
}  


function modificar_datos_motivos()
{
          var form = document.getElementById('editar_formulario_motivos');
          var formData = new FormData(form);
          var url_principal = document.getElementById('url_principal').value;
          var url8 = url_principal+"admin/motivos/modificar.php";
            
          $.ajax({
          type:"POST",
          url:url8, 
          data:formData,
          contentType:false,
          processData:false,
          success:function(respuesta)

          {
                if (respuesta==1) 
                {
                      Swal.fire(
                      'Éxito',
                      'Se ha modificado de manera correcta',
                      'success'
                      );
                      setTimeout(consultar_motivos,1000);
                      $("#editar_formulario_motivos")[0].reset();
                  
                }
                else
                {
                    
                      Swal.fire(
                      'Advertencia',
                      respuesta,
                      'error'
                      );
                    
                }
          }
          })
}


function activo_motivos(id_motivos,url_principal) 
{

      var url8 = url_principal+"motivos/activar.php";  


        Swal.fire({
        title: 'Advertencia',
        text: "¿Está seguro de activar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cancelar',
        cancelButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) 
        {


          Swal.fire(
            'Cancelado',
            'Se ha cancelado la acción de activar',
            'error'
          )
          
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {

                $.ajax({
                url: url8,
                type: "POST",
                data:"id_motivos="+id_motivos,
                dataType: "html",
                success: function () 
                {
                    Swal.fire(
                      '¡EXITO!',
                      'Se ha activado de manera correcta',
                      'success'
                    )
                    setTimeout(consultar_motivos,1000);
              
                }
                });
        

          }
      })


}




function inactivo_motivos(id_motivos,url_principal) 
{

      
        var url8 = url_principal+"motivos/inactivar.php";  

        Swal.fire({
        title: 'Advertencia',
        text: "¿Está seguro de inactivar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cancelar',
        cancelButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) 
        {


          Swal.fire(
            'Cancelado',
            'Se ha cancelado la acción de inactivar',
            'error'
          )
          
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {

                $.ajax({
                url: url8,
                type: "POST",
                data:"id_motivos="+id_motivos,
                dataType: "html",
                success: function () 
                {
                    Swal.fire(
                      '¡EXITO!',
                      'Se ha inactivado de manera correcta',
                      'success'
                    )
                    setTimeout(consultar_motivos,1000);
              
                }
                });
        

          }
      })


}



function registrar_perfiles()
{

        var form = document.getElementById('formulario_registrar_perfiles');
        var formData = new FormData(form);
        var perfiles = document.getElementById('perfiles').value;
        var url_principal = document.getElementById('url_principal').value;
        var url = url_principal+"/admin/perfiles/registrar.php";

        var banderaRBTN = false;
    
        if(perfiles == null || perfiles.length == 0 || /^\s+$/.test(perfiles))
        {

      
            Swal.fire(
            'Advertencia',
            'El campo perfil es obligatorio',
            'error'
            );        
            return false;
        } 
    
          $.ajax({
            type:"POST",
            url:url,
            data:formData,
            contentType:false,
            processData:false,
            success:function(respuesta)
      
            {
            if (respuesta==1) 
            {
                
                Swal.fire(
                'Éxito',
                'Se ha registrado de manera correcta',
                'success'
                );
                
            
                $("#formulario_registrar_perfiles")[0].reset();
                
               
            }
             else
             {

                Swal.fire(
                'Advertencia',
                respuesta,
                'error'
                );

             }
            }
          })
        
}

function consultar_perfiles ()
{
        $.fn.dataTable.ext.errMode = 'throw';
        var consulta_estado = document.getElementById('consulta_estado').value;
        var url_principal = document.getElementById('url_principal').value;
        var url8 = url_principal+"/admin/perfiles/listar_perfiles.php?consulta_estado="+consulta_estado;

        
        if(consulta_estado == null || consulta_estado.length == 0 || /^\s+$/.test(consulta_estado))
        {
                Swal.fire(
                'Advertencia',
                'El campo estado es obligatorio',
                'error'
                );        
                return false;
        } 


        tabla = $('#listado_perfiles_filtro').DataTable({
          "bProcessing": true,
          destroy: true,
          "sAjaxSource": url8,
          "aoColumns": [
                { mData: 'id_perfiles' },
                { mData: 'perfiles' },
                { mData: 'estado' },
                { mData: 'edicion' },
                { mData: 'accion_editar' }
              ],
          //retrieve: true,
          dom: 'Blfrtip',
          "pageLength": 5,
          buttons: [ 
             {
               extend: 'excelHtml5',
               text: 'Generar reporte'
             }           
          ],
          "language": {
            "sProcessing":     "",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "oPaginate": {
              "sFirst":    "Primero",
              "sLast":     "Último",
              "sNext":     "Siguiente",
              "sPrevious": "Anterior"
            },
            "oAria": {
              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
              "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
          }
        });

        $("div[name$='tabla_oculta']").css("display","block");      
}


function listar_generico_perfiles(id_perfiles,url_principal)
{
    var url_principal = url_principal;
    var url8 = urles+"/wp-content/plugins/flexilia/admin/perfiles/buscar.php";
    $.ajax({
    type:"POST",
    url:url8,
    data: {"id_perfiles": id_perfiles, "url_principal": url_principal}
  }).done(function(respuesta){
    document.getElementById("actualizar_datos_perfiles").innerHTML=respuesta;
  })
}  


function modificar_datos_perfiles()
{
          var form = document.getElementById('editar_formulario_perfiles');
          var formData = new FormData(form);
          var url_principal = document.getElementById('url_principal').value;
          var url8 = url_principal+"admin/perfiles/modificar.php";
            
          $.ajax({
          type:"POST",
          url:url8, 
          data:formData,
          contentType:false,
          processData:false,
          success:function(respuesta)

          {
                if (respuesta==1) 
                {
                      Swal.fire(
                      'Éxito',
                      'Se ha modificado de manera correcta',
                      'success'
                      );
                      setTimeout(consultar_perfiles,1000);
                      $("#editar_formulario_perfiles")[0].reset();
                  
                }
                else
                {
                    
                      Swal.fire(
                      'Advertencia',
                      respuesta,
                      'error'
                      );
                    
                }
          }
          })
}


function activo_perfiles(id_perfiles,url_principal) 
{

      var url8 = url_principal+"perfiles/activar.php";  


        Swal.fire({
        title: 'Advertencia',
        text: "¿Está seguro de activar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cancelar',
        cancelButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) 
        {


          Swal.fire(
            'Cancelado',
            'Se ha cancelado la acción de activar',
            'error'
          )
          
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {

                $.ajax({
                url: url8,
                type: "POST",
                data:"id_perfiles="+id_perfiles,
                dataType: "html",
                success: function () 
                {
                    Swal.fire(
                      '¡EXITO!',
                      'Se ha activado de manera correcta',
                      'success'
                    )
                    setTimeout(consultar_perfiles,1000);
              
                }
                });
        

          }
      })


}




function inactivo_perfiles(id_perfiles,url_principal) 
{

      
      var url8 = url_principal+"perfiles/inactivar.php";  

        Swal.fire({
        title: 'Advertencia',
        text: "¿Está seguro de inactivar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cancelar',
        cancelButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) 
        {


          Swal.fire(
            'Cancelado',
            'Se ha cancelado la acción de inactivar',
            'error'
          )
          
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {

                $.ajax({
                url: url8,
                type: "POST",
                data:"id_perfiles="+id_perfiles,
                dataType: "html",
                success: function () 
                {
                    Swal.fire(
                      '¡EXITO!',
                      'Se ha inactivado de manera correcta',
                      'success'
                    )
                    setTimeout(consultar_perfiles,1000);
              
                }
                });
        

          }
      })


}

function consultar_usuarios_flexilia (url_principal)
{
        $.fn.dataTable.ext.errMode = 'throw';
        var url8 = url_principal+"/usuarios/listar_usuarios.php";

  

        tabla = $('#listado_usuarios_flexilia_filtro').DataTable({
          "bProcessing": true,
          destroy: true,
          "sAjaxSource": url8,
          "aoColumns": [
                { mData: 'ID' },
                { mData: 'nombres_apellidos' },
                { mData: 'user_email' },
                { mData: 'perfiles' },
                { mData: 'edicion' }
              ],
          dom: 'Blfrtip',
          "pageLength": 5,
          buttons: [ 
             {
               extend: 'excelHtml5',
               text: 'Generar reporte'
             }           
          ],
          "language": {
            "sProcessing":     "",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "oPaginate": {
              "sFirst":    "Primero",
              "sLast":     "Último",
              "sNext":     "Siguiente",
              "sPrevious": "Anterior"
            },
            "oAria": {
              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
              "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
          }
        });

        $("div[name$='tabla_oculta']").css("display","block");      
}



function listar_generico_usuarios_perfiles(ID,url_principal)
{
    var url8 = url_principal+"/usuarios/buscar.php";
    $.ajax({
    type:"POST",
    url:url8,
    data: {"ID": ID, "url_principal": url_principal}
  }).done(function(respuesta){
    document.getElementById("actualizar_datos_usuarios").innerHTML=respuesta;
  })
}  


function modificar_rol_perfiles()
{
          var form = document.getElementById('editar_formulario_modificar_roles');
          var formData = new FormData(form);
          var url_principal = document.getElementById('url_principal').value;
          var url8 = url_principal+"usuarios/modificar.php";
            
          $.ajax({
          type:"POST",
          url:url8, 
          data:formData,
          contentType:false,
          processData:false,
          success:function(respuesta)

          {
                if (respuesta==1) 
                {
                      Swal.fire(
                      'Éxito',
                      'Se ha modificado de manera correcta',
                      'success'
                      );
                      setTimeout(consultar_usuarios_flexilia(url_principal),1000);
                      $("#editar_formulario_modificar_roles")[0].reset();
                  
                }
                else
                {
                    
                      Swal.fire(
                      'Advertencia',
                      respuesta,
                      'error'
                      );
                    
                }
          }
          })
}

function registrar_estados()
{

        var form = document.getElementById('formulario_registrar_estados');
        var formData = new FormData(form);
        var estados = document.getElementById('estados').value;
        var url_principal = document.getElementById('url_principal').value;
        var url = url_principal+"admin/estados/registrar.php";

        var banderaRBTN = false;
    
        if(estados == null || estados.length == 0 || /^\s+$/.test(estados))
        {

      
            Swal.fire(
            'Advertencia',
            'El campo motivo es obligatorio',
            'error'
            );        
            return false;
        } 
    
          $.ajax({
            type:"POST",
            url:url,
            data:formData,
            contentType:false,
            processData:false,
            success:function(respuesta)
      
            {
            if (respuesta==1) 
            {
                
                Swal.fire(
                'Éxito',
                'Se ha registrado de manera correcta',
                'success'
                );
                
            
                $("#formulario_registrar_estados")[0].reset();
                
               
            }
             else
             {

                Swal.fire(
                'Advertencia',
                respuesta,
                'error'
                );

             }
            }
          })
        
}

function consultar_estados ()
{
        $.fn.dataTable.ext.errMode = 'throw';
        var consulta_estado = document.getElementById('consulta_estado').value;
        var url_principal = document.getElementById('url_principal').value;
        var url8 = url_principal+"admin/estados/listar_estados.php?consulta_estado="+consulta_estado;

        
        if(consulta_estado == null || consulta_estado.length == 0 || /^\s+$/.test(consulta_estado))
        {
                Swal.fire(
                'Advertencia',
                'El campo estado es obligatorio',
                'error'
                );        
                return false;
        } 


        tabla = $('#listado_estados_filtro').DataTable({
          "bProcessing": true,
          destroy: true,
          "sAjaxSource": url8,
          "aoColumns": [
                { mData: 'id_estados' },
                { mData: 'estados' },
                { mData: 'estado' },
                { mData: 'edicion' },
                { mData: 'accion_editar' }
              ],
          //retrieve: true,
          dom: 'Blfrtip',
          "pageLength": 5,
          buttons: [ 
             {
               extend: 'excelHtml5',
               text: 'Generar reporte'
             }           
          ],
          "language": {
            "sProcessing":     "",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "oPaginate": {
              "sFirst":    "Primero",
              "sLast":     "Último",
              "sNext":     "Siguiente",
              "sPrevious": "Anterior"
            },
            "oAria": {
              "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
              "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
          }
        });

        $("div[name$='tabla_oculta']").css("display","block");      
}


function listar_generico_estados(id_estados,url_principal)
{
    var url8 = url_principal+"/estados/buscar.php";
    $.ajax({
    type:"POST",
    url:url8,
    data: {"id_estados": id_estados, "url_principal": url_principal}
  }).done(function(respuesta){
    document.getElementById("actualizar_datos_estados").innerHTML=respuesta;
  })
}  


function modificar_datos_estados()
{
          var form = document.getElementById('editar_formulario_estados');
          var formData = new FormData(form);
          var url_principal = document.getElementById('url_principal').value;
          var url8 = url_principal+"admin/estados/modificar.php";
            
          $.ajax({
          type:"POST",
          url:url8, 
          data:formData,
          contentType:false,
          processData:false,
          success:function(respuesta)

          {
                if (respuesta==1) 
                {
                      Swal.fire(
                      'Éxito',
                      'Se ha modificado de manera correcta',
                      'success'
                      );
                      setTimeout(consultar_estados,1000);
                      $("#editar_formulario_estados")[0].reset();
                  
                }
                else
                {
                    
                      Swal.fire(
                      'Advertencia',
                      respuesta,
                      'error'
                      );
                    
                }
          }
          })
}


function activo_estados(id_estados,url_principal) 
{

      var url8 = url_principal+"estados/activar.php";  


        Swal.fire({
        title: 'Advertencia',
        text: "¿Está seguro de activar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cancelar',
        cancelButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) 
        {


          Swal.fire(
            'Cancelado',
            'Se ha cancelado la acción de activar',
            'error'
          )
          
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {

                $.ajax({
                url: url8,
                type: "POST",
                data:"id_estados="+id_estados,
                dataType: "html",
                success: function () 
                {
                    Swal.fire(
                      '¡EXITO!',
                      'Se ha activado de manera correcta',
                      'success'
                    )
                    setTimeout(consultar_estados,1000);
              
                }
                });
        

          }
      })


}




function inactivo_estados(id_estados,url_principal) 
{

      
      var url8 = url_principal+"estados/inactivar.php";  

        Swal.fire({
        title: 'Advertencia',
        text: "¿Está seguro de inactivar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cancelar',
        cancelButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) 
        {


          Swal.fire(
            'Cancelado',
            'Se ha cancelado la acción de inactivar',
            'error'
          )
          
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {

                $.ajax({
                url: url8,
                type: "POST",
                data:"id_estados="+id_estados,
                dataType: "html",
                success: function () 
                {
                    Swal.fire(
                      '¡EXITO!',
                      'Se ha inactivado de manera correcta',
                      'success'
                    )
                    setTimeout(consultar_estados,1000);
              
                }
                });
        

          }
      })


}


function registrar_flexilia()
{

        var form = document.getElementById('formulario_fl_flexilla');
        var formData = new FormData(form);
        var usuario = document.getElementById('usuario').value;
        var fecha_inicio_ausencia = document.getElementById('fecha_inicio_ausencia').value;
        var fecha_fin_ausencia = document.getElementById('fecha_fin_ausencia').value;
        var id_motivos = document.getElementById('id_motivos').value;
        var tiempo_recuperar = document.getElementById('tiempo_recuperar').value;
        var fecha_inicio_recuperar = document.getElementById('fecha_inicio_recuperar').value;
        var fecha_fin_recuperar = document.getElementById('fecha_fin_recuperar').value;
        var url_principal = document.getElementById('url_principal').value;
        var id_adjuntos = document.getElementById("id_adjuntos").value;
        var idxDot = id_adjuntos.lastIndexOf(".") + 1;
        var extFile = id_adjuntos.substr(idxDot, id_adjuntos.length).toLowerCase();
        var url = url_principal+"admin/flexilia/registrar.php";
        var url12 = url_principal+"public/images/loading.gif";

        
        if(usuario == null || usuario.length == 0 || /^\s+$/.test(usuario))
        {
                Swal.fire(
                'Advertencia',
                'El campo usuario es obligatorio',
                'error'
                );        
                return false;
        } 
        
        
        if(fecha_inicio_ausencia == null || fecha_inicio_ausencia.length == 0 || /^\s+$/.test(fecha_inicio_ausencia))
        {

                Swal.fire(
                'Advertencia',
                'El campo fecha inicio ausencia es obligatorio',
                'error'
                );        
                return false;
        } 

        
        if(fecha_fin_ausencia == null || fecha_fin_ausencia.length == 0 || /^\s+$/.test(fecha_fin_ausencia))
        {              
                Swal.fire(
                'Advertencia',
                'El campo fecha fin ausencia es obligatorio',
                'error'
                );        
                return false;
        } 

        if(id_motivos == null || id_motivos.length == 0 || /^\s+$/.test(id_motivos))
        {

                Swal.fire(
                'Advertencia',
                'El campo motivo es obligatorio',
                'error'
                );        
                return false;
        } 
        if(tiempo_recuperar == null || tiempo_recuperar.length == 0 || /^\s+$/.test(tiempo_recuperar))
        {

                Swal.fire(
                'Advertencia',
                'El campo tiempo recuperar es obligatorio',
                'error'
                );        
                return false;
        } 
    
        if(fecha_inicio_recuperar == null || fecha_inicio_recuperar.length == 0 || /^\s+$/.test(fecha_inicio_recuperar))
        {

                Swal.fire(
                'Advertencia',
                'El campo fecha inicio recuperar es obligatorio',
                'error'
                );        
                return false;
        } 
    
        if(fecha_fin_recuperar == null || fecha_fin_recuperar.length == 0 || /^\s+$/.test(fecha_fin_recuperar))
        {

                Swal.fire(
                'Advertencia',
                'El campo fecha fin recuperar es obligatorio',
                'error'
                );        
                return false;
        } 
          Swal.fire({
          title: "Procesando!",
          imageUrl: url12,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          animation: false
          });
        document.getElementById('button_tipificacion').disabled=true;
        if(id_adjuntos=='')
        {
            $.ajax
            ({
                type:"POST",
                url:url,
                data:formData,
                contentType:false,
                processData:false,
                success:function(respuesta)
          
                {
    
                if (respuesta==1) 
                 {
                     Swal.fire(
                    'Éxito',
                    'Se ha registrado de manera correcta',
                    'success'
                    );
                    $("#id_motivos").val('default').selectpicker("refresh");
                    $("#formulario_fl_flexilla")[0].reset();
                    document.getElementById('button_tipificacion').disabled=false;
                    
                   
                 }
                 else
                 {
                    
                    Swal.fire(
                    'Advertencia',
                    respuesta,
                    'error'
                    );
                    
                 }
                }
            })
        }else
        {
                
                if (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="pdf")
                {
                    
                
            
                    $.ajax
                    ({
                        type:"POST",
                        url:url,
                        data:formData,
                        contentType:false,
                        processData:false,
                        success:function(respuesta)
                
                        {
                        
                            if (respuesta==1) 
                            {
                             
                                Swal.fire(
                                'Éxito',
                                'Se ha registrado de manera correcta',
                                'success'
                                );

                                $("#id_motivos").val('default').selectpicker("refresh");
                                $("#formulario_fl_flexilla")[0].reset();
                                document.getElementById('button_tipificacion').disabled=false;
                            
                            }
                            else
                            {

                                Swal.fire(
                                'Advertencia',
                                respuesta,
                                'error'
                                );
                            }
                        }
                    })

                }else
                {

                    Swal.fire(
                    'Advertencia',
                    'El formato para el archivo que ha adjuntado, no está permitido. Los formatos permitidos son JPG PDF PNG.',
                    'error'
                    );
                    document.getElementById('button_tipificacion').disabled=false;
                    return false;
                }
        }
        
}



function listar_registros_ausencias_filtro ()
{
        $.fn.dataTable.ext.errMode = 'throw';
        var fecha_inicial_reporte = document.getElementById('fecha_inicial_reporte').value;
        var fecha_final_reporte = document.getElementById('fecha_final_reporte').value;
        var consulta_estados = document.getElementById('consulta_estados').value;
        var usuario_generales = document.getElementById('usuario_generales').value;
        var url_principal = document.getElementById('url_principal').value;
        var url9 = url_principal+"public/images/2021-05-20.gif";      
        var url8 = url_principal+"admin/flexilia/listar_ausencias.php?consulta_estados="+consulta_estados+'&fecha_inicial_reporte='+fecha_inicial_reporte+'&fecha_final_reporte='+fecha_final_reporte+fecha_inicial_reporte+'&usuario_generales='+usuario_generales+'&url_principal='+url_principal;

        
        if(consulta_estados == null || consulta_estados.length == 0 || /^\s+$/.test(consulta_estados))
        {
                Swal.fire(
                'Advertencia',
                'El campo estado es obligatorio',
                'error'
                );        
                return false;
        } 

        if(fecha_inicial_reporte == null || fecha_inicial_reporte.length == 0 || /^\s+$/.test(fecha_inicial_reporte))
        {
                Swal.fire(
                'Advertencia',
                'El campo fecha inicial es obligatorio',
                'error'
                );        
                return false;
        } 

        if(fecha_final_reporte == null || fecha_final_reporte.length == 0 || /^\s+$/.test(fecha_final_reporte))
        {
                Swal.fire(
                'Advertencia',
                'El campo fecha final es obligatorio',
                'error'
                );        
                return false;
        } 

        tabla = $('#listado_ausencias_filtro').DataTable({
          "bProcessing": true,
          destroy: true,
          "sAjaxSource": url8,
          "aoColumns": [
                { mData: 'id_flexilia' },
                { mData: 'numero_empleado' },
                { mData: 'fecha_inicio_ausencia' },
                { mData: 'fecha_fin_ausencia' },
                { mData: 'tiempo_recuperar' },
                { mData: 'fecha_inicio_recuperar' },
                { mData: 'fecha_fin_recuperar' },
                { mData: 'comentarios' },
                { mData: 'descargar_archivo' },
                { mData: 'fecha_registro' },
                { mData: 'estados' },
                { mData: 'gestion' }
              ],
          //retrieve: true,
          dom: 'Blfrtip',
          "pageLength": 5,
          buttons: [
            {
              extend: 'excel',
              footer: true ,
              text: 'Generar reporte',
              title: 'Reporte',
              exportOptions: { 
              columns: [ 0, 1, 2, 3,4,5,6,7,9,10 ] }
            }
          ],
          columnDefs: [
            { className: 'text-center', targets: [ 0, 1, 2, 3,4,5,6,7,8,9,10,11] },
            { className: 'text-center', targets: [5] },
          ],
          language: {
            "sProcessing": ('<div><img style="display:block;margin-left:auto;margin-right:auto;margin-top:40px;width:25%;" src="'+url9+'"</div>'),
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Ultimo",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortA v  scending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDesce nding": ": Activar para ordenar la columna de manera descendente"
            }
          }
        });

        $("div[name$='tabla_oculta']").css("display","block");      
}

        
function listar_generico_flexilia_trazabilidad (id_flexilia,url_principal,fecha_inicial_reporte,fecha_final_reporte,usuario_generales)
{
      var url8 = url_principal+"admin/flexilia/listado_ausencias.php";  
     
      $.ajax({

                type:"POST",
                url:url8,
                data: {"id_flexilia": id_flexilia, "fecha_inicial_reporte": fecha_inicial_reporte, "fecha_final_reporte": fecha_final_reporte, "usuario_generales": usuario_generales}
                }).done(function(respuesta){


                $(document).ready(function() {
                $('#listado_registros_ausencias_flexilia').DataTable( {
                    
                    scrollY: true,
                    scrollX: true,
                    bFilter: true,
                    bInfo: true,
                    searching: false,
                    dom: 'lBfrtip',
                    buttons: [
                        //'copyHtml5',
                        //'excelHtml5',
                        //'csvHtml5',
                        //'pdfHtml5'
                    ],
                    lengthMenu: [[50, 100, 200], [50, 100, 200]],
                    language: {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Ultimo",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortA v  scending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDesce nding": ": Activar para ordenar la columna de manera descendente"
                    }
                    },
                    //pageLength: 50
                    } );
                } );

                document.getElementById("actualizar_informacion_flexilia_ausencias").innerHTML=respuesta;
            })
}



function registrar_ausencias_mandos()
{

        var form = document.getElementById('formulario_detalles_ausencias_flexilia');
        var formData = new FormData(form);
        var numero_empleado_consulta = document.getElementById('numero_empleado_consulta').value;
        var nombres_apellidos_consulta = document.getElementById('nombres_apellidos_consulta').value;
        var fecha_inicio_ausencia_consulta = document.getElementById('fecha_inicio_ausencia_consulta').value;
        var fecha_fin_ausencia_consulta = document.getElementById('fecha_fin_ausencia_consulta').value;
        var motivos_consulta = document.getElementById('motivos_consulta').value;
        var tiempo_recuperar_consulta = document.getElementById('tiempo_recuperar_consulta').value;
        var fecha_inicio_recuperar_consulta = document.getElementById('fecha_inicio_recuperar_consulta').value;
        var fecha_fin_recuperar_consulta = document.getElementById('fecha_fin_recuperar_consulta').value;
        var id_flexilia = document.getElementById('id_flexilia').value;
        var numero_ausencia = document.getElementById('numero_ausencia').value;
        var id_estados_consulta = document.getElementById('id_estados_consulta').value;
        var creado_por = document.getElementById('creado_por').value;
        var url_principal = document.getElementById('url_principal').value;
        
       
        
        document.getElementById('boton_guardar').disabled=false;
        var url = url_principal+"admin/flexilia/registrar2.php";

        var banderaRBTN = false;
        
        if(numero_empleado_consulta == null || numero_empleado_consulta.length == 0 || /^\s+$/.test(numero_empleado_consulta))
        {
                    
                Swal.fire(
                'Advertencia',
                'El campo número de empleado es obligatorio',
                'error'
                );        
                document.getElementById('boton_guardar').disabled=false;
                return false;
        } 


        if(creado_por == null || creado_por.length == 0 || /^\s+$/.test(creado_por))
        {
                Swal.fire(
                'Advertencia',
                'El campo número de empleado es obligatorio',
                'error'
                );        
                document.getElementById('boton_guardar').disabled=false;
                return false;
        } 

        if(fecha_inicio_ausencia_consulta == null || fecha_inicio_ausencia_consulta.length == 0 || /^\s+$/.test(fecha_inicio_ausencia_consulta))
        {
                Swal.fire(
                'Advertencia',
                'El campo fecha inicio ausencia es obligatorio',
                'error'
                );        
                document.getElementById('boton_guardar').disabled=false;
                return false;
        } 
        
        
        if(fecha_fin_ausencia_consulta == null || fecha_fin_ausencia_consulta.length == 0 || /^\s+$/.test(fecha_fin_ausencia_consulta))
        {
                Swal.fire(
                'Advertencia',
                'El campo fecha fin ausencia es obligatorio',
                'error'
                );        
                document.getElementById('boton_guardar').disabled=false;
                return false;
        } 
        
        
        if(motivos_consulta == null || motivos_consulta.length == 0 || /^\s+$/.test(motivos_consulta))
        {
                Swal.fire(
                'Advertencia',
                'El campo motivo es obligatorio',
                'error'
                );        
                document.getElementById('boton_guardar').disabled=false;
                return false;
        } 

        
        if(tiempo_recuperar_consulta == null || tiempo_recuperar_consulta.length == 0 || /^\s+$/.test(tiempo_recuperar_consulta))
        {
                Swal.fire(
                'Advertencia',
                'El campo tiempo recuperar es obligatorio',
                'error'
                );        
                document.getElementById('boton_guardar').disabled=false;
                return false;
        } 
                
             
        if(fecha_inicio_recuperar_consulta == null || fecha_inicio_recuperar_consulta.length == 0 || /^\s+$/.test(fecha_inicio_recuperar_consulta))
        {
                Swal.fire(
                'Advertencia',
                'El campo fecha inicio recuperar es obligatorio',
                'error'
                );        
                document.getElementById('boton_guardar').disabled=false;
                return false;
        } 
                
           
        if(fecha_fin_recuperar_consulta == null || fecha_fin_recuperar_consulta.length == 0 || /^\s+$/.test(fecha_fin_recuperar_consulta))
        {
                Swal.fire(
                'Advertencia',
                'El campo fecha fin recuperar es obligatorio',
                'error'
                );        
                document.getElementById('boton_guardar').disabled=false;
                return false;
        } 

                  
        if(id_estados_consulta == null || id_estados_consulta.length == 0 || /^\s+$/.test(id_estados_consulta))
        {
                Swal.fire(
                'Advertencia',
                'El campo estado es obligatorio',
                'error'
                );        
                document.getElementById('boton_guardar').disabled=false;
                return false;
        } 

      
        document.getElementById('boton_guardar').disabled=true;
           
              
          $.ajax({
            type:"POST",
            url:url,
            data:formData,
            contentType:false,
            processData:false,
            success:function(respuesta)
      
            {

              
              if (respuesta==1) 
              {
                  Swal.fire(
                 'Éxito',
                 'Se ha registrado de manera correcta',
                 'success'
                 );
                 setTimeout(listar_generico_flexilia_trazabilidad(id_flexilia,url_principal),1000);
                 document.getElementById('boton_guardar').disabled=true;
                 document.getElementById('button_tipificacion').disabled=false;
                 
                
              }
              else
              {
                 
                 Swal.fire(
                 'Advertencia',
                 respuesta,
                 'error'
                 );
                 
              }
            
            }
          })
        
}

