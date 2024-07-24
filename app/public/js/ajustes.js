const portatilpluss = sessionStorage.getItem("portatilplus")+"/admin/perfil/";
const id = sessionStorage.getItem("id");

fetch(portatilpluss+id)
    .then(res => res.json())
    .then(data => {
            document.getElementById("nombre").value = data.body[0][0].nombre;
            document.getElementById("apellido").value = data.body[0][0].apellido;
            document.getElementById("telefono").value = data.body[0][0].telefono;
            document.getElementById("correo").value = data.body[0][0].correo;
            document.getElementById("rol").value = data.body[0][0].rol;
            document.getElementById("estado").value = data.body[0][0].estado;
    })
    .catch(error => {
        console.error('Error al obtener los datos del perfil:', error);
      });


      const portatilplus = sessionStorage.getItem("portatilplus") + "/admin/perfil";

      const editar = () => {

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;
    
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_registro: id,
               nombre:nombre,
               apellido:apellido,
               telefono: telefono,
               correo: correo,
               
            })
        }
        fetch(portatilplus, options)
            .then(res => res.json())
            .then(data => {
                if (data.error == true) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error al Editar!",
                    })
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Perfil Editado Correctamente",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    setTimeout(function () {
                      location.reload();
                    }, 1000);
                }
            })
            .catch(error => console.log(error))
    }

    const volver = document.getElementById('volver');
    volver.addEventListener('click', () => {
        location.href = '/dash';
    });