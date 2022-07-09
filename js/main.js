var url = "http://localhost/empleados/";    
    var modal = new bootstrap.Modal(document.getElementById('modelId'),{keyboard:false});
    var aplicacion = new function(){

        this.nombre = document.getElementById('nombre');
        this.correo = document.getElementById('correo');

        this.idEditar = document.getElementById('idEditar');
        this.nombreEditar = document.getElementById('nombreEditar');
        this.correoEditar = document.getElementById('correoEditar');

        this.empleados = document.getElementById("empleados")        
        this.Leer = function(){
            var datos = "";

            fetch(url)
            .then(r=>r.json())
            .then((respuesta)=>{
                console.log(respuesta);

                respuesta.map(
                    function (empleado,index, array){
                        datos+="<tr>";
                        datos+="<td>"+empleado.id+"</td>";
                        datos+="<td>"+empleado.nombre+"</td>";     
                        datos+="<td>"+empleado.correo+"</td>";     
                        datos+='<td>   <div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-info" onclick="aplicacion.Editar('+empleado.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="aplicacion.Eliminar('+empleado.id+')">Eliminar</button></div>'+'</td>';                             
                        datos+="</tr>"
                    }
                );
                return this.empleados.innerHTML = datos; 
            }
            )
            .catch(console.log);
            //datos = "<tr><td>1</td><td>Jose Aguilar</td><td>jaal0254@gmail.com</td><td>Editar | Eliminar</td></tr>";               
        };
        this.Agregar = function(){
            console.log(nombre.value);
            console.log(correo.value);

            var datosEnviar={nombre:this.nombre.value,correo:this.correo.value}

            fetch(url+"?insertar=1",{method:"POST", body:JSON.stringify(datosEnviar)})
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{     
                console.log("insertados")
                this.Leer();       
            })
            .catch(console.log);

        };
        this.Eliminar = function(id){
            console.log(id);
            fetch(url+"?borrar="+id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{                      
                this.Leer();       
            })
            .catch(console.log);
        };
        this.Editar = function(id){
            console.log(id);

            fetch(url+"?consultar="+id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{   
                console.log(datosRespuesta);

                this.nombreEditar.value = datosRespuesta[0]['nombre'];
                this.idEditar.value = datosRespuesta[0]['id'];
                this.correoEditar.value = datosRespuesta[0]['correo'];      
            })

            modal.show();
        }
        this.Actualizar = function(){
            var datosEnviar={id:this.idEditar.value,nombre:this.nombreEditar.value,correo:this.correoEditar.value}

            fetch(url+"?actualizar=1",{method:"POST", body:JSON.stringify(datosEnviar)})
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{     
                console.log("Actualizados")
                this.Leer();      
                modal.hide(); 
            })
            .catch(console.log);
        }
    }

    aplicacion.Leer();