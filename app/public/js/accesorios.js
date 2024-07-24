const portatilplus = sessionStorage.getItem("portatilplus")+"/admin/accesorio/";

// url
const modalaccesorio = new bootstrap.Modal(document.getElementById('modalaccesorio'));

const formaccesorio = document.querySelector('form');
const numero = document.getElementById('numeroaccesorio');
const nombre = document.getElementById('nombreaccesorio');
const estado = document.getElementById('estado');

let opcion = '';

btncrear.addEventListener('click', () => {
    numero.value = '';
    nombre.value = '';
    estado.value = '';
    modalaccesorio.show();
    opcion = 'nuevo';
});

// MOSTRAR REGISTROS GET
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
    let body = '';
    for (let i = 0; i < data.length; i++) {
        body += `
        <tr>
            <td>${data[i].id_accesorio}</td>
            <td>${data[i].numero_accesorio}</td>
            <td class="nombreaccesorio">${data[i].nombre_accesorio}</td>
            <td class="estado">${data[i].estado}</td>
            <td class="btn-container">
                <i class='bx bx-edit btneditar'></i>
                <i class='bx bx-trash btnborrar'></i>
            </td>
        </tr>`;
    }
    document.getElementById('data').innerHTML = body;
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
    const id_accesorio = fila.firstElementChild.innerHTML;

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
            fetch(portatilplus + id_accesorio, {
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
                            text: "Hubo un problema al eliminar accesorio!",
                        });
                    } else {
                        Swal.fire({
                            title: "Eliminado!",
                            text: "El accesorio ha sido eliminado.",
                            icon: "success"
                        }).then(() => {
                            location.reload();
                        });
                    }
                })
                .catch(error => console.error(error));
        }
    });
})

// editar
let idform = 0;
on(document, 'click', '.btneditar', e => {
    const fila = e.target.parentNode.parentNode;
    idform = fila.children[0].innerHTML;
    const numeroform = fila.children[1].innerHTML;
    const nombreform = fila.children[2].innerHTML;
    const estadoform = fila.children[3].innerHTML;

    // mandarlos al formulario
    numero.value = numeroform;
    nombre.value = nombreform;
    estado.value = estadoform;

    opcion = 'editar';
    modalaccesorio.show();
})

// para crear o editar
formaccesorio.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!numero.value || !nombre.value) {
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
                numero_accesorio: numero.value,
                nombre_accesorio: nombre.value,
                estado: estado.value,
            })
        }
        fetch(portatilplus, options)
            .then(res => res.json())
            .then(data => {
                const nuevoacc = []
                nuevoacc.push(data.body);
                mostrar(nuevoacc);
                location.reload();
            })
    }
    if (opcion == 'editar') {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_accesorio: idform,
                numero_accesorio: numero.value,
                nombre_accesorio: nombre.value,
                estado: estado.value,
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
                        title: "Accesorio Editado Correctamente",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            })
    }
})

// buscador crud
document.getElementById('buscador').addEventListener('keyup', e => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('#data tr').forEach(row => {
        const nombre = row.querySelector('.nombreaccesorio').textContent.toLowerCase();
        if (nombre.includes(query)) {
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