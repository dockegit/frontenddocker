const portatilplus = sessionStorage.getItem("portatilplus") + "/admin/salvo/";


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
                    <p class="id">${data[i].idpazysalvo}</p>
                    <a href="#" class="icon-pdf" onclick="reporte(event);"><i class='bx bxs-file-pdf'></i></a>
                </div>
                <div class="info">
                    <h1 class="nombre apellido">${data[i].nombre} ${data[i].apellido}</h1>
                    <p class="telefono">Teléfono: ${data[i].telefono}</p>
                    <p class="sanciones">Sanción: ${data[i].sanciones}</p>
                    <p>Fecha: ${data[i].fecha}</p>
                    <p class="descripcion">Descripción: ${data[i].descripcion}</p>
                </div>
                <div class="btn-container">
                <div>
                    <button class="btn btn-success btn-sm" onclick="editar('${data[i].idpazysalvo}','${data[i].nombre}',' ${data[i].apellido}','${data[i].telefono}',
                    '${data[i].sanciones}','${data[i].descripcion}');">Editar</button>
                    <i class='bx bx-show abrir' id="abrir" onclick="enviar('${data[i].idpazysalvo}','${data[i].nombre}',' ${data[i].apellido}','${data[i].telefono}',
                    '${data[i].sanciones}','${data[i].descripcion}');"></i>
                </div>
                    <i class='bx bx-trash btnborrar'></i>
                </div>       
            </div>
        </li>        
    `;
  }
  document.getElementById("data").innerHTML = body;
};



// reporte 
const reporte = (event) => {
    const fila = event.target.closest('li');
    if (!fila) {
        console.error('No se encontró el elemento de fila');
        return;
    }

    const idpazysalvo = fila.querySelector('.id');
    const nombre = fila.querySelector('.nombre');
    const apellido = fila.querySelector('.apellido');
    const telefono = fila.querySelector('.telefono');
    const sanciones = fila.querySelector('.sanciones');
    const descripcion = fila.querySelector('.descripcion');

    if (!idpazysalvo || !nombre || !apellido || !telefono || !sanciones || !descripcion) {
        console.error('No se encontraron todos los elementos de datos necesarios en la fila');
        return;
    }

    const reportePDF = new jsPDF('p', 'mm', 'a4'); 

    // Configurar título y línea superior
    reportePDF.setFontSize(16);
    reportePDF.text(105, 15, 'Paz y Salvo', null, null, 'center');
    reportePDF.setLineWidth(0.5);
    reportePDF.line(20, 20, 190, 20);

    // Datos del paz y salvo
    reportePDF.setFontSize(12);
    reportePDF.text(20, 35, `ID: ${idpazysalvo.textContent}`);
    reportePDF.text(20, 45, `Nombre: ${nombre.textContent}`);
    reportePDF.text(20, 55, `${telefono.textContent}`);
    reportePDF.text(20, 65, `${sanciones.textContent}`);

    // Manejo del texto largo en la descripción
    const descripcionText = descripcion.textContent;
    const splitText = reportePDF.splitTextToSize(descripcionText, 170); 
    reportePDF.text(20, 75, splitText); 

    // Línea inferior
    reportePDF.line(20, 95, 190, 95);

    // Información adicional
    reportePDF.setFontSize(8);
    const fecha = new Date().toLocaleString();
    reportePDF.text(20, 100, `Fecha de emisión: ${fecha}`);

    // Footer
    reportePDF.setFontSize(10);
    reportePDF.setTextColor(100);
    reportePDF.text(20, 280, 'Generado por: Administrador');

    // Guardar y descargar el PDF
    reportePDF.save(`PazySalvo_${idpazysalvo.textContent}.pdf`);
};

function editar(idpazysalvo,nombre,apellido,telefono,sanciones,descripcion){
    localStorage.setItem('editnombre',nombre)
    localStorage.setItem('editapellido',apellido)
    localStorage.setItem('edittelefono',telefono)
    localStorage.setItem('editsanciones',sanciones)
    localStorage.setItem('editdescripcion',descripcion)
    localStorage.setItem('editpazysalvo',idpazysalvo)

    window.location.href = "/dash/editarpaz";
}



const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
      if (e.target.closest(selector)) {
          handler(e);
      }
  });
}
on(document, 'click', '.btnborrar', e => {
  const fila = e.target.parentNode.parentNode;
  const idpazysalvo = fila.firstElementChild.textContent;

  console.log(idpazysalvo);
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
          fetch(portatilplus + idpazysalvo , {
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
                          text: "Hubo un problema al eliminar la tarea!",
                      });
                  } else {
                      Swal.fire({
                          title: "Eliminado!",
                          text: "La tarea ha sido eliminada.",
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

// vista



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

function enviar(idpazysalvo,nombre,apellido,telefono,sanciones,descripcion){
    localStorage.setItem('envnombre',nombre);
    localStorage.setItem('envmodelo',apellido);
    localStorage.setItem('envapellido',telefono);
    localStorage.setItem('envsanciones',sanciones);
    localStorage.setItem('envdescripcion',descripcion);
    localStorage.setItem('envidpazysalvo',idpazysalvo);

    window.location.href = "/dash/versalvo";

}

