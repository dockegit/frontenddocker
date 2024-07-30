var url = document.getElementById("url").value;
sessionStorage.setItem("portatilplus", url);
var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/historialreserva";

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
  var body = '';
  for (var i = 0; i < data.length; i++) {
    body += "\n        <li>\n                    <div class=\"cartas\">\n                        <div class=\"img__container\">\n                            <img src=\"../img/sena.png\" alt=\"\" width=\"100\" height=\"100\">\n                            <p class=\"id\">".concat(data[i].id_registro_computador, "</p>\n                            <p>").concat(data[i].id_reserva, "</p>\n                        </div>\n                        <div class=\"info\">\n                            <h3 class=\"nombre\">").concat(data[i].nombre, "</h3>\n                            <p>").concat(data[i].id_accesorio, "</p>\n                            <p>").concat(data[i].estado, "</p>\n                            <p>").concat(data[i].fecha, "</p>\n                        </div>\n                    </div>\n                </li>\n    ");
  }
  document.getElementById('data').innerHTML = body;
};
document.getElementById('buscador').addEventListener('keyup', function (e) {
  var query = e.target.value.toLowerCase();
  document.querySelectorAll('#data li').forEach(function (row) {
    var tarea = row.querySelector('.id').textContent.toLowerCase();
    var nombre = row.querySelector('.nombre').textContent.toLowerCase();
    if (tarea.includes(query) || nombre.includes(query)) {
      row.classList.remove('filtro');
    } else {
      row.classList.add('filtro');
    }
  });
});
var style = document.createElement('style');
style.innerHTML = "\n    .filtro {\n        display: none;\n    }\n";
document.head.appendChild(style);