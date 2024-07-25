"use strict";

var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/salvo/";

// consumir
fetch(portatilplus).then(function (res) {
  return res.json();
}).then(function (data) {
  if (data.error) {
    console.error("error al mostrar los datos", data);
  } else {
    mostrar(data.body[0]);
  }
})["catch"](function (error) {
  return console.error("error al mostrar", error);
});

// mostrar los resultados

var mostrar = function mostrar(data) {
  var body = "";
  for (var i = 0; i < data.length; i++) {
    body += "\n        <li>\n            <div class=\"cartas\">\n                <div class=\"img__container\">\n                    <p class=\"id\">".concat(data[i].idpazysalvo, "</p>\n                    <a href=\"#\" class=\"icon-pdf\" onclick=\"reporte(event);\"><i class='bx bxs-file-pdf'></i></a>\n                </div>\n                <div class=\"info\">\n                    <h1 class=\"nombre apellido\">").concat(data[i].nombre, " ").concat(data[i].apellido, "</h1>\n                    <p class=\"telefono\">Tel\xE9fono: ").concat(data[i].telefono, "</p>\n                    <p class=\"sanciones\">Sanci\xF3n: ").concat(data[i].sanciones, "</p>\n                    <p>Fecha: ").concat(data[i].fecha, "</p>\n                    <p class=\"descripcion\">Descripci\xF3n: ").concat(data[i].descripcion, "</p>\n                </div>\n                <div class=\"btn-container\">\n                <div>\n                    <button class=\"btn btn-success btn-sm\" onclick=\"editar('").concat(data[i].idpazysalvo, "','").concat(data[i].nombre, "',' ").concat(data[i].apellido, "','").concat(data[i].telefono, "',\n                    '").concat(data[i].sanciones, "','").concat(data[i].descripcion, "');\">Editar</button>\n                    <i class='bx bx-show abrir' id=\"abrir\" onclick=\"enviar('").concat(data[i].idpazysalvo, "','").concat(data[i].nombre, "',' ").concat(data[i].apellido, "','").concat(data[i].telefono, "',\n                    '").concat(data[i].sanciones, "','").concat(data[i].descripcion, "');\"></i>\n                </div>\n                    <i class='bx bx-trash btnborrar'></i>\n                </div>       \n            </div>\n        </li>        \n    ");
  }
  document.getElementById("data").innerHTML = body;
};

// reporte 
var reporte = function reporte(event) {
  var fila = event.target.closest('li');
  if (!fila) {
    console.error('No se encontró el elemento de fila');
    return;
  }
  var idpazysalvo = fila.querySelector('.id');
  var nombre = fila.querySelector('.nombre');
  var apellido = fila.querySelector('.apellido');
  var telefono = fila.querySelector('.telefono');
  var sanciones = fila.querySelector('.sanciones');
  var descripcion = fila.querySelector('.descripcion');
  if (!idpazysalvo || !nombre || !apellido || !telefono || !sanciones || !descripcion) {
    console.error('No se encontraron todos los elementos de datos necesarios en la fila');
    return;
  }
  var reportePDF = new jsPDF('p', 'mm', 'a4');

  // Configurar título y línea superior
  reportePDF.setFontSize(16);
  reportePDF.text(105, 15, 'Paz y Salvo', null, null, 'center');
  reportePDF.setLineWidth(0.5);
  reportePDF.line(20, 20, 190, 20);

  // Datos del paz y salvo
  reportePDF.setFontSize(12);
  reportePDF.text(20, 35, "ID: ".concat(idpazysalvo.textContent));
  reportePDF.text(20, 45, "Nombre: ".concat(nombre.textContent));
  reportePDF.text(20, 55, "".concat(telefono.textContent));
  reportePDF.text(20, 65, "".concat(sanciones.textContent));

  // Manejo del texto largo en la descripción
  var descripcionText = descripcion.textContent;
  var splitText = reportePDF.splitTextToSize(descripcionText, 170);
  reportePDF.text(20, 75, splitText);

  // Línea inferior
  reportePDF.line(20, 95, 190, 95);

  // Información adicional
  reportePDF.setFontSize(8);
  var fecha = new Date().toLocaleString();
  reportePDF.text(20, 100, "Fecha de emisi\xF3n: ".concat(fecha));

  // Footer
  reportePDF.setFontSize(10);
  reportePDF.setTextColor(100);
  reportePDF.text(20, 280, 'Generado por: Administrador');

  // Guardar y descargar el PDF
  reportePDF.save("PazySalvo_".concat(idpazysalvo.textContent, ".pdf"));
};
function editar(idpazysalvo, nombre, apellido, telefono, sanciones, descripcion) {
  localStorage.setItem('editnombre', nombre);
  localStorage.setItem('editapellido', apellido);
  localStorage.setItem('edittelefono', telefono);
  localStorage.setItem('editsanciones', sanciones);
  localStorage.setItem('editdescripcion', descripcion);
  localStorage.setItem('editpazysalvo', idpazysalvo);
  window.location.href = "/dash/editarpaz";
}
var on = function on(element, event, selector, handler) {
  element.addEventListener(event, function (e) {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};
on(document, 'click', '.btnborrar', function (e) {
  var fila = e.target.parentNode.parentNode;
  var idpazysalvo = fila.firstElementChild.textContent;
  console.log(idpazysalvo);
  Swal.fire({
    title: "Estas Seguro?",
    text: "No podras revertirlo",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!"
  }).then(function (result) {
    if (result.isConfirmed) {
      fetch(portatilplus + idpazysalvo, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un problema al eliminar la tarea!"
          });
        } else {
          Swal.fire({
            title: "Eliminado!",
            text: "La tarea ha sido eliminada.",
            icon: "success"
          }).then(function () {
            location.reload();
          });
        }
      })["catch"](function (error) {
        return console.error(error);
      });
    }
  });
});

// vista

// buscador crud
document.getElementById('buscador').addEventListener('keyup', function (e) {
  var query = e.target.value.toLowerCase();
  document.querySelectorAll('#data li').forEach(function (row) {
    var tarea = row.querySelector('.id').textContent.toLowerCase();
    var prioridad = row.querySelector('.nombre').textContent.toLowerCase();
    if (tarea.includes(query) || prioridad.includes(query)) {
      row.classList.remove('filtro');
    } else {
      row.classList.add('filtro');
    }
  });
});
var style = document.createElement('style');
style.innerHTML = "\n    .filtro {\n        display: none;\n    }\n";
document.head.appendChild(style);
function enviar(idpazysalvo, nombre, apellido, telefono, sanciones, descripcion) {
  localStorage.setItem('envnombre', nombre);
  localStorage.setItem('envmodelo', apellido);
  localStorage.setItem('envapellido', telefono);
  localStorage.setItem('envsanciones', sanciones);
  localStorage.setItem('envdescripcion', descripcion);
  localStorage.setItem('envidpazysalvo', idpazysalvo);
  window.location.href = "/dash/versalvo";
}