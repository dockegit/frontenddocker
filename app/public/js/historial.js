// url de historial
const portatilplus = sessionStorage.getItem("portatilplus")+"/admin/historial";


fetch(portatilplus)
.then(res => res.json())
.then(data =>{
    if(data.error){
        console.log("error en el fetch", data);
    }else{
        mostrar(data.body[0]);
    }
})
.catch(error => {console.log(error)})


// datos


const mostrar = (data) =>{
    let body = ''
    for(let i = 0; i<data.length; i++){
        body += `
            <tr>
                <td>${data[i].id_registro}</td>
                <td class= "nombre">${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].telefono}</td>
                <td class= "correo">${data[i].correo}</td>
                <td class= "correo">${data[i].rol}</td>
                <td class= "correo">${data[i].estado}</td>
            </tr>
        `
    }
    document.getElementById('data').innerHTML = body;
}





// buscador


document.getElementById('buscador').addEventListener('keyup', e => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('#data tr').forEach(row => {
        const correo = row.querySelector('.correo').textContent.toLowerCase();
        const nombre = row.querySelector('.nombre').textContent.toLowerCase();
        if (correo.includes(query)|| nombre.includes(query)){
            row.classList.remove('filtro');
        } else {
            row.classList.add('filtro');
        }
    });
});

// Estilo para ocultar las filas filtradas
const style = document.createElement('style');
style.innerHTML = `
    .filtro {
        display: none;
    }
`;
document.head.appendChild(style);

// SANCIONar DESDE EL HISTORIAL
const portatilplus2 = sessionStorage.getItem("portatilplus") + "/admin/sancion/";
fetch(portatilplus2)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("error al mostrar los datos", data);
        } else {
            mostrar(data.body[0]);
        }
    })
    .catch(error => console.log(error));

    