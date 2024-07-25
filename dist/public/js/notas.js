"use strict";

var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/notas/";
var btnnuevo = document.getElementById('btnnuevo');
btnnuevo.addEventListener('click', function () {
  window.location.href = "/dash/ingresarnotas";
});
fetch(portatilplus).then(function (res) {
  return res.json();
}).then(function (data) {
  if (data.error) {
    console.log("error en el fetch", data);
  } else {
    mostrar(data.body[0]);
  }
})["catch"](function (error) {
  console.log(error);
});

// datos
var mostrar = function mostrar(data) {
  var body = '';
  for (var i = 0; i < data.length; i++) {
    body += "\n        <tr>\n            <td>".concat(data[i].idnotas, "</td>\n            <td class=\"titulo\">").concat(data[i].titulo, "</td>\n            <td>").concat(data[i].notas, "</td>\n            <td class=\"prioridad\">").concat(data[i].prioridad, "</td>\n            <td class=\"estado\">\n                <select name=\"estado\" class=\"estado-select selec\" onchange=\"cambiarEstado(event, ").concat(data[i].idnotas, ")\">\n                    <option value=\"Pendiente\" ").concat(data[i].estado === 'Pendiente' ? 'selected' : '', " class=\"selec\">Pendiente</option>\n                    <option value=\"Completado\" ").concat(data[i].estado === 'Completado' ? 'selected' : '', " class=\"selec\">Completado</option>\n                </select>\n            </td>\n            <td class=\"btn-container\">\n                <i class='bx bx-edit btneditar' onclick=\"editar('").concat(data[i].idnotas, "','").concat(data[i].titulo, "','").concat(data[i].notas, "','").concat(data[i].prioridad, "','").concat(data[i].estado, "');\"></i>\n            </td>\n        </tr>");
  }
  document.getElementById('data').innerHTML = body;
};
function editar(idnotas, titulo, notas, prioridad, estado) {
  localStorage.setItem('edittitulo', titulo);
  localStorage.setItem('editnotas', notas);
  localStorage.setItem('editprioridad', prioridad);
  localStorage.setItem('editestado', estado);
  localStorage.setItem('editidnotas', idnotas);
  window.location.href = "/dash/editarnotas";
}
// Cambiar estado
function cambiarEstado(event, idnotas) {
  var estado = event.target.value;
  if (estado === 'Completado') {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la titulo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then(function (result) {
      if (result.isConfirmed) {
        fetch(portatilplus + idnotas, {
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
              text: "Hubo un problema al eliminar la titulo!"
            });
          } else {
            Swal.fire({
              title: "Eliminado!",
              text: "La titulo ha sido eliminada.",
              icon: "success"
            }).then(function () {
              location.reload();
            });
          }
        })["catch"](function (error) {
          return console.error(error);
        });
      } else {
        event.target.value = 'Pendiente';
      }
    });
  }
}

// buscador CRUD
document.getElementById('buscador').addEventListener('keyup', function (e) {
  var query = e.target.value.toLowerCase();
  document.querySelectorAll('#data tr').forEach(function (row) {
    var titulo = row.querySelector('.titulo').textContent.toLowerCase();
    var prioridad = row.querySelector('.prioridad').textContent.toLowerCase();
    if (titulo.includes(query) || prioridad.includes(query)) {
      row.classList.remove('filtro');
    } else {
      row.classList.add('filtro');
    }
  });
});
var style = document.createElement('style');
style.innerHTML = "\n    .filtro {\n        display: none;\n    }\n";
document.head.appendChild(style);