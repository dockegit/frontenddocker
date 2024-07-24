const logueo =  async()=>{
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const url = document.getElementById("url").value;

    if (!correo.endsWith("@gmail.com")) {
        Swal.fire({
            icon: "error",
            title: "Correo no válido",
            text: "Por favor, ingrese una dirección de correo de Gmail.",
        });
        return;
    }
    sessionStorage.setItem("portatilplus", url);

    const portatilplus = sessionStorage.getItem("portatilplus")+"/login";
   
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify({
            correo: correo,
            contrasena: contrasena
        })
    }

    await fetch(portatilplus, options)
    .then(res => res.json())
    .then(data=>{
        if(data.error== true){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Correo o Contraseña Incorrecta!",
              });
        }else{ 
            sessionStorage.setItem("id", data.body.payload.id_registro);
            sessionStorage.setItem("token", data.body.token);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Bienvenido",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(function () {
                    window.location.href = "/dash";
                }, 1000); 
        }
    })
    .catch(err=>{
        console.error("error en el fetch", err);
    })
    
}

// logo portatil plus se recargue

document.getElementById("logo").addEventListener('click', () => {
    location.reload();
});