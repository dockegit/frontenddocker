const portatilplus = sessionStorage.getItem("portatilplus") + "/admin/notas/";

document.getElementById('titulo').value = localStorage.getItem('edittitulo');
document.getElementById('notas').value = localStorage.getItem('editnotas');
document.getElementById('prioridad').value = localStorage.getItem('editprioridad');
document.getElementById('estado').value = localStorage.getItem('editestado');

const idnotas = localStorage.getItem('editidnotas');



const editar = () => {

    const titulo = document.getElementById('titulo').value;
    const notas = document.getElementById('notas').value;
    const prioridad = document.getElementById('prioridad').value;
    const estado = document.getElementById('estado').value;

    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idnotas: idnotas,
           titulo:titulo,
           notas:notas,
           prioridad: prioridad,
           estado: estado,
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
                    title: "Nota editada Correctamente",
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(function () {
                    window.location.href = "/dash/notas"
                }, 1000);
            }
        })
        .catch(error => console.log(error))
}