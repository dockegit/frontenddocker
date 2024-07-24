const portatilplus = sessionStorage.getItem("portatilplus") + "/admin/completadas";


// consumir
fetch(portatilplus)
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      console.error("error al mostrar los datos", data);
    } else {
      mostrar(data.body[0]);
    }
  })
  .catch((error) => console.error("error al mostrar", error));

// mostrar los resultados

const mostrar = (data) => {
  let body = "";
  for (let i = 0; i < data.length; i++) {
    body += `
        <li>
            <div class="cartas">
                <div class="img__container">
                    <p class="id">ID: ${data[i].idcompleto}</p>
                </div>
                <div class="info">
                    <h1 class="nombre">Titulo: ${data[i].tarea}</h1>
                    <p class="telefono">Tarea: ${data[i].notas}</p>
                    <p class="sanciones">Prioridad: ${data[i].prioridad}</p>
                    <p>Estado: ${data[i].estado}</p>
                </div>
                <div class="btn-container">
                <div>
                    <i class='bx bx-show abrir' id="abrir" onclick="enviar('${data[i.idcompleto]}',
                    '${data[i].tarea}',
                    '${data[i].notas}',
                    '${data[i].prioridad}',
                    '${data[i].estado}');"></i>
                </div>
                    
                </div>       
            </div>
        </li>        
    `;
  }
  document.getElementById("data").innerHTML = body;
};

function enviar(idcompleto,tarea,notas,prioridad,estado){
    localStorage.setItem('envtarea',tarea);
    localStorage.setItem('envnotas',notas);
    localStorage.setItem('envprioridad',prioridad);
    localStorage.setItem('envestado',estado);
    localStorage.setItem('envidcompleto',idcompleto);

    window.location.href = "/dash/vertarea";

}


// buscador crud
document.getElementById('buscador').addEventListener('keyup', e => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('#data li').forEach(row => {
        const tarea = row.querySelector('.id').textContent.toLowerCase();
        const prioridad = row.querySelector('.nombre').textContent.toLowerCase();
        if (tarea.includes(query) || prioridad.includes(query)) {
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