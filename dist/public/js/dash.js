const portatilplus = sessionStorage.getItem("portatilplus") + "/admin/estadisticacomputador";

fetch(portatilplus)
.then(res=> res.json())
.then(data => {
    if(data.error){
        console.error("Error al mostrar los datos", data);
    }else{
        mostrarEstadisticas(data.body[0]);

    }
})
.catch(error => console.log("error al mostrar los datos", error))


// mostrar estadísticas computador
const mostrarEstadisticas = (data) => {
    let body = '';
    for(let i = 0; i < data.length; i++){
        body += `
            <h3 class="card-title">Computadores</h3>
            <hr>
            <p class="card-text">Disponibles: ${data[i].cantidad}</p>
            <p class="card-text">Diseño: ${data[i].diseño}</p>
            <p class="card-text">Administracion: ${data[i].administracion}</p>
            <p class="card-text">Software: ${data[i].sorftware}</p>
        `;

    }
    document.getElementById('data').innerHTML = body;
    
}

// accesorio
const portatilplus2 = sessionStorage.getItem("portatilplus") + "/admin/estadisticaaccesorio";
fetch(portatilplus2)
.then(res=> res.json())
.then(data => {
    if(data.error){
        console.error("Error al mostrar los datos", data);
    }else{
        mostraraccesorio(data.body[0]);
    }
})
.catch(error => console.log("error al mostrar los datos", error))

const mostraraccesorio = (data) =>{
  let body = '';
    for(let i = 0; i < data.length; i++){
        body += `
            <h3 class="card-title">Accesorios</h3>
            <hr>
            <p class="card-text">Disponibles: ${data[i].cantidad}</p>
        `;
    }
    document.getElementById('accesorio').innerHTML = body;
}

// reserva
const portatilplus3 = sessionStorage.getItem("portatilplus") + "/admin/estadisticareserva";
fetch(portatilplus3)
.then(res=> res.json())
.then(data => {
    if(data.error){
        console.error("Error al mostrar los datos", data);
    }else{
        mostrarreserva(data.body[0]);
    }
})
.catch(error => console.log("error al mostrar los datos", error))

const mostrarreserva = (data) =>{
  let body = '';
    for(let i = 0; i < data.length; i++){
        body += `
            <h3 class="card-title">Reservas</h3>
            <hr>
            <p class="card-text">Activas : ${data[i].reserva}</p>
        `;
    }
    document.getElementById('reserva').innerHTML = body;
}
