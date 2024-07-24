// consumo agregar

const portatilplus = sessionStorage.getItem("portatilplus")+"/admin/notas/";


const cancelar = document.getElementById("cancelar");
cancelar.addEventListener('click',()=>{
    window.location.href= "/dash/notas"
})

// agregar
console.log(portatilplus);

const agregar = () =>{
    const titulo = document.getElementById("titulo").value;
    const notas = document.getElementById("notas").value;
    const prioridad = document.getElementById("prioridad").value;
    const estado = document.getElementById("estado").value;


    if (!titulo || !notas || !prioridad || !estado) {
        Swal.fire("Campos vacíos!");
        return; 
    }
   

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            notas: notas,
            prioridad: prioridad,
            estado: estado,
        })
    }
   
   
    fetch(portatilplus, options)
    .then(res => res.json())
    .then(data => {
        if(data.error == false){

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Nota agregada Correctamente",
                showConfirmButton: false,
                timer: 3000
            });
            setTimeout(function () {
                location.href= "/dash/notas";
            }, 1000);
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al agregar nota!",
            })
        }
    })
}


