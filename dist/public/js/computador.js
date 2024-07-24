const portatilplus = sessionStorage.getItem("portatilplus")+"/admin/computador/";


const modalcompu = new bootstrap.Modal(document.getElementById('mi-modal'));

const formcompu = document.querySelector('form');
const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const estado = document.getElementById('estado');
const area = document.getElementById('area');
let opcion = '';

btnnuevo.addEventListener('click', () => {
    marca.value = '';
    modelo.value = '';
    estado.value = '';
    area.value = '';
    modalcompu.show();
    opcion = 'nuevo';
});

// MOSTRAR REGISTROS GET
fetch(portatilplus)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("error al mostrar los datos", data);
        } else {
            mostrar(data.body);
        }
    })
    .catch(error => console.log(error));

// mostrar los resultados
const mostrar = (data) => {
    let body = '';
    for (let i = 0; i < data.length; i++) {
        body += `
        <tr>
            <td>${data[i].idcomputador}</td>
            <td class="marca" id="marca">${data[i].marca}</td>
            <td id="modelo">${data[i].modelo}</td>
            <td class="estado" id="estado">${data[i].estado}</td>
            <td class="area" id ="area">${data[i].area}</td>
            <td class="btn-container">
                <i class='bx bx-edit btneditar'></i>
                <i class='bx bx-trash btnborrar'></i>
                <i class='bx bx-show btnve' onclick="enviar('${data[i].idcomputador}','${data[i].marca}',' ${data[i].modelo}','${data[i].estado}',
                    '${data[i].area}');"></i>
            </td>
        </tr>`;
    }
    document.getElementById('data').innerHTML = body;
}
function enviar(idcomputador,marca,modelo,estado,area){
    localStorage.setItem('editmarca',marca)
    localStorage.setItem('editmodelo',modelo)
    localStorage.setItem('editestado',estado)
    localStorage.setItem('editarea',area)
    localStorage.setItem('editidcomputador',idcomputador)

    window.location.href = "/dash/especificaciones";
}


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
    const idcomputador = fila.firstElementChild.innerHTML;

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
            fetch(portatilplus + idcomputador, {
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
                            text: "Hubo un problema al eliminar computador!",
                        });
                    } else {
                        Swal.fire({
                            title: "Eliminado!",
                            text: "El computador ha sido eliminado.",
                            icon: "success"
                        }).then(() => {
                            location.reload();
                        })
                    }
                })
                .catch(error => console.error(error));
        }
    });
})

// editar
let idform = 0
on(document, 'click', '.btneditar', e => {
    const fila = e.target.parentNode.parentNode;
    idform = fila.children[0].innerHTML;
    const marcaform = fila.children[1].innerHTML;
    const modeloform = fila.children[2].innerHTML;
    const estadoform = fila.children[3].innerHTML;
    const areaform = fila.children[4].innerHTML;
    // mandarlos al formulario
    marca.value = marcaform;
    modelo.value = modeloform;
    estado.value = estadoform;
    area.value = areaform;
    opcion = 'editar';
    modalcompu.show();
})

// para crear o editar
formcompu.addEventListener('submit', (e) => {
    e.preventDefault()

   
    if (!marca.value || !modelo.value || !estado.value|| !estado.value) {
        Swal.fire("Campos vacios!");
        return;
    }

    if (opcion == 'nuevo') {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                marca: marca.value,
                modelo: modelo.value,
                estado: estado.value,
                area: area.value,
            })
        }
        fetch(portatilplus, options)
            .then(res => res.json())
            .then(data => {
                
                if(data.error == false){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Computador agregado Correctamente",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    setTimeout(function () {
                       mostrar(data.body);
                        location.reload();
                    }, 1000);
                }else{
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
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idcomputador: idform,
                marca: marca.value,
                modelo: modelo.value,
                estado: estado.value,
                area: area.value,
                
            })
        }
        fetch(portatilplus, options)
            .then(res => res.json())
            .then(data => {
                if(data.error == false){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Computador editado Correctamente",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error al editar computador!",
                    })
                }
            })
    }
})

// reporte

// buscador
document.getElementById('buscador').addEventListener('keyup', e => {
    const query = e.target.value.toLowerCase();

    document.querySelectorAll('#data tr').forEach(row => {

        const marca = row.querySelector('.marca').textContent.toLowerCase();
        const estado = row.querySelector('.estado').textContent.toLowerCase();
        const area = row.querySelector('.area').textContent.toLowerCase();

        if (marca.includes(query) || area.includes(query) || estado.includes(query)) {
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


// friltros
// document.getElementById('filtroestado').addEventListener('change', e => {
//     const estado = e.target.value.toLowerCase();

//     document.querySelectorAll('#data tr').forEach(row => {
//         const estadoactual = row.querySelector('.estado').textContent.toLowerCase();

//        if(estado === 'Todos'||estado === estadoactual){
//         row.classList.remove('filtro');
//        }else{
//         row.classList.add('filtro');
//        }
//     });
// });