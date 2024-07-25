"use strict";

// url de historial
var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/historial";
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
    body += "\n            <tr>\n                <td>".concat(data[i].id_registro, "</td>\n                <td class= \"nombre\">").concat(data[i].nombre, "</td>\n                <td>").concat(data[i].apellido, "</td>\n                <td>").concat(data[i].telefono, "</td>\n                <td class= \"correo\">").concat(data[i].correo, "</td>\n                <td class= \"correo\">").concat(data[i].rol, "</td>\n                <td class= \"correo\">").concat(data[i].estado, "</td>\n            </tr>\n        ");
  }
  document.getElementById('data').innerHTML = body;
};

// buscador

document.getElementById('buscador').addEventListener('keyup', function (e) {
  var query = e.target.value.toLowerCase();
  document.querySelectorAll('#data tr').forEach(function (row) {
    var correo = row.querySelector('.correo').textContent.toLowerCase();
    var nombre = row.querySelector('.nombre').textContent.toLowerCase();
    if (correo.includes(query) || nombre.includes(query)) {
      row.classList.remove('filtro');
    } else {
      row.classList.add('filtro');
    }
  });
});

// Estilo para ocultar las filas filtradas
var style = document.createElement('style');
style.innerHTML = "\n    .filtro {\n        display: none;\n    }\n";
document.head.appendChild(style);

// SANCIONar DESDE EL HISTORIAL
var portatilplus2 = sessionStorage.getItem("portatilplus") + "/admin/sancion/";
fetch(portatilplus2).then(function (res) {
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