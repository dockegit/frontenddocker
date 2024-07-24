    document.getElementById('nombre').value = localStorage.getItem('editnombre');
    document.getElementById('apellido').value = localStorage.getItem('editapellido');
    document.getElementById('tele').value = localStorage.getItem('edittelefono');
    document.getElementById('sanciones').value = localStorage.getItem('editsanciones');
    document.getElementById('descripcion').value = localStorage.getItem('editdescripcion');

    const portatilplus = sessionStorage.getItem("portatilplus") + "/admin/salvo";


    const id = localStorage.getItem('editpazysalvo');
const editar = () => {

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const tele = document.getElementById('tele').value;
    const sanciones = document.getElementById('sanciones').value;
    const descripcion = document.getElementById('descripcion').value;

    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idpazysalvo: id,
           nombre:nombre,
           apellido:apellido,
           telefono: tele,
           sanciones: sanciones,
           descripcion: descripcion,
           
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
                    title: "Paz y salvo Editado Correctamente",
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(function () {
                    window.location.href = "/dash/paz"
                }, 1000);
            }
        })
        .catch(error => console.log(error))
}
