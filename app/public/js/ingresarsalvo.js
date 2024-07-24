// consumo agregar

const portatilplus = sessionStorage.getItem("portatilplus")+"/admin/salvo/";



// agregar
const agregar = () => {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const sanciones = document.getElementById("sanciones").value;
    const descripcion = document.getElementById("descripcion").value;

    if (!nombre || !apellido || !telefono || !sanciones|| !descripcion) {
        Swal.fire("Campos vacíos!");
        return; 
    }
   

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            sanciones: sanciones,
            descripcion:descripcion
        })
    }
   
    fetch(portatilplus, options)
    .then(res => res.json())
    .then(data => {
        if(data.error == true){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al agregar nota!",
            })
        }else{
            
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Nota agregada Correctamente",
                showConfirmButton: false,
                timer: 3000
            });
            setTimeout(function () {
                // location.href= "/dash/notas";
                location.reload();
            }, 1000);
            
        }
    })
}


// editar nota




