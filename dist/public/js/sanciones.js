// url

const portatilplus = sessionStorage.getItem("portatilplus") + "/admin/sancion/";


const modalsancion = new bootstrap.Modal(document.getElementById('modalsancion'))


const formsancion = document.querySelector('form')
const idregistro = document.getElementById('idregistro');
const motivo = document.getElementById('motivo');
let opcion = ''


btnnuevo.addEventListener('click', () => {
    idregistro.value = '';
    motivo.value = '';
    modalsancion.show();
    opcion = 'nuevo';
});


// mostrar datos get

fetch(portatilplus)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("error al mostrar los datos", data);
        } else {
            mostrar(data.body[0]);
        }
    })
    .catch(error => console.log(error));


// mostrar los resultados

const mostrar = (data) => {
    let body = ''
    for (let i = 0; i < data.length; i++) {
        body += `
        <tr>
            <td class="sancion">${data[i].id_sancion}</td>
            <td>${data[i].id_registro}</td>
            <td>${data[i].motivo}</td>
            <td class="btn-container">
                    <i class='bx bx-edit btneditar'></i>
                    <i class='bx bx-trash btnborrar'></i>
                </td>
        </tr>
        `;
    }
    document.getElementById('data').innerHTML = body;
}

// metodo on

const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
}


// eliminar

on(document, 'click', '.btnborrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id_sancion = fila.firstElementChild.innerHTML;


    Swal.fire({
        title: "Estas Seguro?",
        text: "No podras revertirlo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(portatilplus + id_sancion, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Hubo un problema al eliminar sancion!",
                        });
                    } else {
                        Swal.fire({
                            title: "Eliminado!",
                            text: "La sancion ha sido eliminada.",
                            icon: "success"
                        }).then(() => {
                            location.reload()
                        })
                    }
                })
                .catch(error => console.error(error));

        }
    });
})


let idform = 0
on(document, 'click', '.btneditar', e => {
    const fila = e.target.parentNode.parentNode;
    idform = fila.children[0].innerHTML
    const idregistroform = fila.children[1].innerHTML
    const motivoform = fila.children[2].innerHTML

    // formulario
    idregistro.value = idregistroform
    // idregistro.readOnly = true; 
    motivo.value = motivoform
    modalsancion.show();
    opcion = 'editar';
})


// editar o agregar

formsancion.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!idregistro.value || !motivo.value) {
        Swal.fire("Campos vacios!");
        return;
    }


    if (opcion == 'nuevo') {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_registro: idregistro.value,
                motivo: motivo.value
            })
        }
        fetch(portatilplus, options)
            .then(res => res.json())
            .then(data => {
                if (data.error == false) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Computador agregado Correctamente",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    setTimeout(function () {
                        const nuevasancion = []
                        nuevasancion.push(data.body)
                        mostrar(nuevasancion)
                        location.reload()
                    }, 1000);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error al agregar Computador!",
                    })
                }
            })

    }
    if (opcion == 'editar') {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_sancion: idform,
                id_registro: idregistro.value,
                motivo: motivo.value
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
                        title: "Registro Editado Correctamente",
                        showConfirmButton: false,
                        timer: 300000
                    });
                    setTimeout(function () {
                        location.reload()
                    }, 1000);
                }
            })
    }
})


// buscador crud

const buscador = document.getElementById('buscador')

buscador.addEventListener('keyup', e => {
    const query = e.target.value.toLowerCase();

    document.querySelectorAll('#data tr').forEach(row => {
        const retiro = row.querySelector('.sancion').textContent.toLowerCase();

        if (retiro.includes(query)) {
            row.classList.remove('filtro')
        } else {
            row.classList.add('filtro')
        }
    });
});

const style = document.createElement('style');
style.innerHTML = `
    .filtro {
        display: none;
    }
`;

document.head.appendChild(style);