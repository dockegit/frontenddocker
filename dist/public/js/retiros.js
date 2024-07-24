// url para consumir la api

const url = document.getElementById("url").value;

sessionStorage.setItem("portatilplus", url);

const portatilplus = sessionStorage.getItem("portatilplus")+"/admin/retiro/";


const modalretiro = new bootstrap.Modal(document.getElementById('modalretiro'))

const formretiro = document.querySelector('form')
const idregistro = document.getElementById('id_registro');
const fecha = document.getElementById('fecha');

let opcion= ''

btnnuevo.addEventListener('click', () =>{
    idregistro.value = '';
    fecha.value = '';
    modalretiro.show()
    opcion = 'nuevo'
})



// MOSTRAR REGISTROS GET

fetch(portatilplus)
.then(res => res.json())
.then(data => {
    if(data.error){
        console.error("error al mostrar los datos", data);
    }else{
        mostrar(data.body[0]);
    }
})
.catch(error => console.log(error))


const mostrar = (data)=>{
    let body = ''
    for(let i = 0; i < data.length; i++){
        body += `
            <tr>
                <td class = "retiro">${data[i].id_retiro}</td>
                <td>${data[i].id_registro}</td>
                <td>${data[i].fecha}</td>
                <td class="btn-container">
                    <i class='bx bx-edit btneditar'></i>
                    <i class='bx bx-trash btnborrar'></i>
                </td>
            </tr>
            
            </tr>
        `
        document.getElementById('data').innerHTML = body;
    }
}


// on

const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e)=>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}


// eliminar

on(document, 'click', '.btnborrar', (e)=>{
    const fila = e.target.parentNode.parentNode;
    const id_retiro = fila.firstElementChild.innerHTML;

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
            fetch(portatilplus + id_retiro, {
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Hubo un problema al eliminar retiro!",
                      });
                }else{
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El retiro ha sido eliminado.",
                        icon: "success"
                      }).then(()=>{
                        location.reload()
                      })
                }
            })
            .catch(error => console.error(error));

        }
      });
})

// editar

let idform = 0

on(document, 'click', '.btneditar', e =>{
    const fila = e.target.parentNode.parentNode;
    idform = fila.children[0].innerHTML
    const idregistroform = fila.children[1].innerHTML
    const fechaform = fila.children[2].innerHTML


    // mandarlos al formulario
    idregistro.value = idregistroform
    fecha.value = fechaform
    opcion= 'editar'
    modalretiro.show()
})


formretiro.addEventListener('submit', (e) =>{
    e.preventDefault()
    if(!idregistro.value ||!fecha.value){
        Swal.fire("Campos vacios!");
        return;
    }

    // condicional

    if(opcion== 'nuevo'){
        const options = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_registro : idregistro.value,
                fecha : fecha.value
            })
        }

        fetch(portatilplus, options)
        .then(res => res.json())
        .then(data => {
            if(data.error == true){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un problema al agregar computador!",
                  });
            }else{
                const nuevoretiro = []
                nuevoretiro.push(data.body)
                mostrar(nuevoretiro)
                location.reload()
            }
        })
        .catch(error => console.error(error));

    }
    if(opcion == 'editar'){
        const options = {
            method: 'PUT',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id_retiro : idform,
                id_registro : idregistro.value,
                fecha : fecha.value
            })
        }

        fetch(url , options)
        .then(res => res.json())
        .then(data => {
            if(data.error == true){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un problema al editar retiro!",
                  });
            }else{
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registro Editado Correctamente",
                    showConfirmButton: false,
                    timer: 300000
                });
                setTimeout(function () {
                    location.reload()
                },1000);
            }
        })
    }
})


// buscador crud

const buscador = document.getElementById('buscador')

buscador.addEventListener('keyup', e =>{
    const query = e.target.value.toLowerCase();

    document.querySelectorAll('#data tr').forEach(row => {
        const retiro = row.querySelector('.retiro').textContent.toLowerCase();

        if(retiro.includes(query)){
            row.classList.remove('filtro')
        }else{
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
