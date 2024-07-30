var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/completadas";

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
    body += "\n        <li>\n            <div class=\"cartas\">\n                <div class=\"img__container\">\n                    <p class=\"id\">ID: ".concat(data[i].idcompleto, "</p>\n                </div>\n                <div class=\"info\">\n                    <h1 class=\"nombre\">Titulo: ").concat(data[i].tarea, "</h1>\n                    <p class=\"telefono\">Tarea: ").concat(data[i].notas, "</p>\n                    <p class=\"sanciones\">Prioridad: ").concat(data[i].prioridad, "</p>\n                    <p>Estado: ").concat(data[i].estado, "</p>\n                </div>\n                <div class=\"btn-container\">\n                <div>\n                    <i class='bx bx-show abrir' id=\"abrir\" onclick=\"enviar('").concat(data[i.idcompleto], "',\n                    '").concat(data[i].tarea, "',\n                    '").concat(data[i].notas, "',\n                    '").concat(data[i].prioridad, "',\n                    '").concat(data[i].estado, "');\"></i>\n                </div>\n                    \n                </div>       \n            </div>\n        </li>        \n    ");
  }
  document.getElementById("data").innerHTML = body;
};
function enviar(idcompleto, tarea, notas, prioridad, estado) {
  localStorage.setItem('envtarea', tarea);
  localStorage.setItem('envnotas', notas);
  localStorage.setItem('envprioridad', prioridad);
  localStorage.setItem('envestado', estado);
  localStorage.setItem('envidcompleto', idcompleto);
  window.location.href = "/dash/vertarea";
}

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