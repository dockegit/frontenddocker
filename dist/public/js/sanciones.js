// url

var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/sancion/";
var modalsancion = new bootstrap.Modal(document.getElementById('modalsancion'));
var formsancion = document.querySelector('form');
var idregistro = document.getElementById('idregistro');
var motivo = document.getElementById('motivo');
var opcion = '';
btnnuevo.addEventListener('click', function () {
  idregistro.value = '';
  motivo.value = '';
  modalsancion.show();
  opcion = 'nuevo';
});

// mostrar datos get

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
    body += "\n        <tr>\n            <td class=\"sancion\">".concat(data[i].id_sancion, "</td>\n            <td>").concat(data[i].id_registro, "</td>\n            <td>").concat(data[i].motivo, "</td>\n            <td class=\"btn-container\">\n                    <i class='bx bx-edit btneditar'></i>\n                    <i class='bx bx-trash btnborrar'></i>\n                </td>\n        </tr>\n        ");
  }
  document.getElementById('data').innerHTML = body;
};

// metodo on

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
  var id_sancion = fila.firstElementChild.innerHTML;
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
      fetch(portatilplus + id_sancion, {
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
            text: "Hubo un problema al eliminar sancion!"
          });
        } else {
          Swal.fire({
            title: "Eliminado!",
            text: "La sancion ha sido eliminada.",
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
var idform = 0;
on(document, 'click', '.btneditar', function (e) {
  var fila = e.target.parentNode.parentNode;
  idform = fila.children[0].innerHTML;
  var idregistroform = fila.children[1].innerHTML;
  var motivoform = fila.children[2].innerHTML;

  // formulario
  idregistro.value = idregistroform;
  // idregistro.readOnly = true; 
  motivo.value = motivoform;
  modalsancion.show();
  opcion = 'editar';
});

// editar o agregar

formsancion.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!idregistro.value || !motivo.value) {
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
        id_registro: idregistro.value,
        motivo: motivo.value
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
          var nuevasancion = [];
          nuevasancion.push(data.body);
          mostrar(nuevasancion);
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
        id_sancion: idform,
        id_registro: idregistro.value,
        motivo: motivo.value
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
          title: "Registro Editado Correctamente",
          showConfirmButton: false,
          timer: 300000
        });
        setTimeout(function () {
          location.reload();
        }, 1000);
      }
    });
  }
});

// buscador crud

var buscador = document.getElementById('buscador');
buscador.addEventListener('keyup', function (e) {
  var query = e.target.value.toLowerCase();
  document.querySelectorAll('#data tr').forEach(function (row) {
    var retiro = row.querySelector('.sancion').textContent.toLowerCase();
    if (retiro.includes(query)) {
      row.classList.remove('filtro');
    } else {
      row.classList.add('filtro');
    }
  });
});
var style = document.createElement('style');
style.innerHTML = "\n    .filtro {\n        display: none;\n    }\n";
document.head.appendChild(style);