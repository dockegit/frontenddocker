"use strict";

var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/computador/";
var modalcompu = new bootstrap.Modal(document.getElementById('mi-modal'));
var formcompu = document.querySelector('form');
var marca = document.getElementById('marca');
var modelo = document.getElementById('modelo');
var estado = document.getElementById('estado');
var area = document.getElementById('area');
var opcion = '';
btnnuevo.addEventListener('click', function () {
  marca.value = '';
  modelo.value = '';
  estado.value = '';
  area.value = '';
  modalcompu.show();
  opcion = 'nuevo';
});

// MOSTRAR REGISTROS GET
fetch(portatilplus).then(function (res) {
  return res.json();
}).then(function (data) {
  if (data.error) {
    console.error("error al mostrar los datos", data);
  } else {
    mostrar(data.body);
  }
})["catch"](function (error) {
  return console.log(error);
});

// mostrar los resultados
var mostrar = function mostrar(data) {
  var body = '';
  for (var i = 0; i < data.length; i++) {
    body += "\n        <tr>\n            <td>".concat(data[i].idcomputador, "</td>\n            <td class=\"marca\" id=\"marca\">").concat(data[i].marca, "</td>\n            <td id=\"modelo\">").concat(data[i].modelo, "</td>\n            <td class=\"estado\" id=\"estado\">").concat(data[i].estado, "</td>\n            <td class=\"area\" id =\"area\">").concat(data[i].area, "</td>\n            <td class=\"btn-container\">\n                <i class='bx bx-edit btneditar'></i>\n                <i class='bx bx-trash btnborrar'></i>\n                <i class='bx bx-show btnve' onclick=\"enviar('").concat(data[i].idcomputador, "','").concat(data[i].marca, "',' ").concat(data[i].modelo, "','").concat(data[i].estado, "',\n                    '").concat(data[i].area, "');\"></i>\n            </td>\n        </tr>");
  }
  document.getElementById('data').innerHTML = body;
};
function enviar(idcomputador, marca, modelo, estado, area) {
  localStorage.setItem('editmarca', marca);
  localStorage.setItem('editmodelo', modelo);
  localStorage.setItem('editestado', estado);
  localStorage.setItem('editarea', area);
  localStorage.setItem('editidcomputador', idcomputador);
  window.location.href = "/dash/especificaciones";
}
var on = function on(element, event, selector, handler) {
  element.addEventListener(event, function (e) {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

// eliminar
on(document, 'click', '.btnborrar', function (e) {
  var fila = e.target.parentNode.parentNode;
  var idcomputador = fila.firstElementChild.innerHTML;
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
      fetch(portatilplus + idcomputador, {
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
            text: "Hubo un problema al eliminar computador!"
          });
        } else {
          Swal.fire({
            title: "Eliminado!",
            text: "El computador ha sido eliminado.",
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

// editar
var idform = 0;
on(document, 'click', '.btneditar', function (e) {
  var fila = e.target.parentNode.parentNode;
  idform = fila.children[0].innerHTML;
  var marcaform = fila.children[1].innerHTML;
  var modeloform = fila.children[2].innerHTML;
  var estadoform = fila.children[3].innerHTML;
  var areaform = fila.children[4].innerHTML;
  // mandarlos al formulario
  marca.value = marcaform;
  modelo.value = modeloform;
  estado.value = estadoform;
  area.value = areaform;
  opcion = 'editar';
  modalcompu.show();
});

// para crear o editar
formcompu.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!marca.value || !modelo.value || !estado.value || !estado.value) {
    Swal.fire("Campos vacios!");
    return;
  }
  if (opcion == 'nuevo') {
    var options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        marca: marca.value,
        modelo: modelo.value,
        estado: estado.value,
        area: area.value
      })
    };
    fetch(portatilplus, options).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.error == false) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Computador agregado Correctamente",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(function () {
          mostrar(data.body);
          location.reload();
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al agregar Computador!"
        });
      }
    });
  }
  if (opcion == 'editar') {
    var _options = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idcomputador: idform,
        marca: marca.value,
        modelo: modelo.value,
        estado: estado.value,
        area: area.value
      })
    };
    fetch(portatilplus, _options).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.error == false) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Computador editado Correctamente",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(function () {
          location.reload();
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al editar computador!"
        });
      }
    });
  }
});

// reporte

// buscador
document.getElementById('buscador').addEventListener('keyup', function (e) {
  var query = e.target.value.toLowerCase();
  document.querySelectorAll('#data tr').forEach(function (row) {
    var marca = row.querySelector('.marca').textContent.toLowerCase();
    var estado = row.querySelector('.estado').textContent.toLowerCase();
    var area = row.querySelector('.area').textContent.toLowerCase();
    if (marca.includes(query) || area.includes(query) || estado.includes(query)) {
      row.classList.remove('filtro');
    } else {
      row.classList.add('filtro');
    }
  });
});
var style = document.createElement('style');
style.innerHTML = "\n    .filtro {\n        display: none;\n    }\n";
document.head.appendChild(style);

// friltros
// document.getElementById('filtroestado').addEventListener('change', e => {
//     const estado = e.target.value.toLowerCase();

//     document.querySelectorAll('#data tr').forEach(row => {
//         const estadoactual = row.querySelector('.estado').textContent.toLowerCase();

//        if(estado === 'Todos'||estado === estadoactual){
//         row.classList.remove('filtro');
//        }else{
//         row.classList.add('filtro');
//        }
//     });
// });