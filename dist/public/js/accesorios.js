"use strict";

var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/accesorio/";

// url
var modalaccesorio = new bootstrap.Modal(document.getElementById('modalaccesorio'));
var formaccesorio = document.querySelector('form');
var numero = document.getElementById('numeroaccesorio');
var nombre = document.getElementById('nombreaccesorio');
var estado = document.getElementById('estado');
var opcion = '';
btncrear.addEventListener('click', function () {
  numero.value = '';
  nombre.value = '';
  estado.value = '';
  modalaccesorio.show();
  opcion = 'nuevo';
});

// MOSTRAR REGISTROS GET
fetch(portatilplus).then(function (res) {
  return res.json();
}).then(function (data) {
  if (data.error) {
    console.error("error al mostrar los datos", data);
  } else {
    mostrar(data.body[0]);
  }
})["catch"](function (error) {
  return console.log(error);
});

// mostrar los resultados
var mostrar = function mostrar(data) {
  var body = '';
  for (var i = 0; i < data.length; i++) {
    body += "\n        <tr>\n            <td>".concat(data[i].id_accesorio, "</td>\n            <td>").concat(data[i].numero_accesorio, "</td>\n            <td class=\"nombreaccesorio\">").concat(data[i].nombre_accesorio, "</td>\n            <td class=\"estado\">").concat(data[i].estado, "</td>\n            <td class=\"btn-container\">\n                <i class='bx bx-edit btneditar'></i>\n                <i class='bx bx-trash btnborrar'></i>\n            </td>\n        </tr>");
  }
  document.getElementById('data').innerHTML = body;
};
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
  var id_accesorio = fila.firstElementChild.innerHTML;
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
      fetch(portatilplus + id_accesorio, {
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
            text: "Hubo un problema al eliminar accesorio!"
          });
        } else {
          Swal.fire({
            title: "Eliminado!",
            text: "El accesorio ha sido eliminado.",
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
  var numeroform = fila.children[1].innerHTML;
  var nombreform = fila.children[2].innerHTML;
  var estadoform = fila.children[3].innerHTML;

  // mandarlos al formulario
  numero.value = numeroform;
  nombre.value = nombreform;
  estado.value = estadoform;
  opcion = 'editar';
  modalaccesorio.show();
});

// para crear o editar
formaccesorio.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!numero.value || !nombre.value) {
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
        numero_accesorio: numero.value,
        nombre_accesorio: nombre.value,
        estado: estado.value
      })
    };
    fetch(portatilplus, options).then(function (res) {
      return res.json();
    }).then(function (data) {
      var nuevoacc = [];
      nuevoacc.push(data.body);
      mostrar(nuevoacc);
      location.reload();
    });
  }
  if (opcion == 'editar') {
    var _options = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_accesorio: idform,
        numero_accesorio: numero.value,
        nombre_accesorio: nombre.value,
        estado: estado.value
      })
    };
    fetch(portatilplus, _options).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.error == true) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al Editar!"
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Accesorio Editado Correctamente",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(function () {
          location.reload();
        }, 1000);
      }
    });
  }
});

// buscador crud
document.getElementById('buscador').addEventListener('keyup', function (e) {
  var query = e.target.value.toLowerCase();
  document.querySelectorAll('#data tr').forEach(function (row) {
    var nombre = row.querySelector('.nombreaccesorio').textContent.toLowerCase();
    if (nombre.includes(query)) {
      row.classList.remove('filtro');
    } else {
      row.classList.add('filtro');
    }
  });
});
var style = document.createElement('style');
style.innerHTML = "\n    .filtro {\n        display: none;\n    }\n";
document.head.appendChild(style);