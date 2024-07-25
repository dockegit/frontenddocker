"use strict";

var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/estadisticacomputador";
fetch(portatilplus).then(function (res) {
  return res.json();
}).then(function (data) {
  if (data.error) {
    console.error("Error al mostrar los datos", data);
  } else {
    mostrarEstadisticas(data.body[0]);
  }
})["catch"](function (error) {
  return console.log("error al mostrar los datos", error);
});

// mostrar estadísticas computador
var mostrarEstadisticas = function mostrarEstadisticas(data) {
  var body = '';
  for (var i = 0; i < data.length; i++) {
    body += "\n            <h3 class=\"card-title\">Computadores</h3>\n            <hr>\n            <p class=\"card-text\">Disponibles: ".concat(data[i].cantidad, "</p>\n            <p class=\"card-text\">Dise\xF1o: ").concat(data[i].diseño, "</p>\n            <p class=\"card-text\">Administracion: ").concat(data[i].administracion, "</p>\n            <p class=\"card-text\">Software: ").concat(data[i].sorftware, "</p>\n        ");
  }
  document.getElementById('data').innerHTML = body;
};

// accesorio
var portatilplus2 = sessionStorage.getItem("portatilplus") + "/admin/estadisticaaccesorio";
fetch(portatilplus2).then(function (res) {
  return res.json();
}).then(function (data) {
  if (data.error) {
    console.error("Error al mostrar los datos", data);
  } else {
    mostraraccesorio(data.body[0]);
  }
})["catch"](function (error) {
  return console.log("error al mostrar los datos", error);
});
var mostraraccesorio = function mostraraccesorio(data) {
  var body = '';
  for (var i = 0; i < data.length; i++) {
    body += "\n            <h3 class=\"card-title\">Accesorios</h3>\n            <hr>\n            <p class=\"card-text\">Disponibles: ".concat(data[i].cantidad, "</p>\n        ");
  }
  document.getElementById('accesorio').innerHTML = body;
};

// reserva
var portatilplus3 = sessionStorage.getItem("portatilplus") + "/admin/estadisticareserva";
fetch(portatilplus3).then(function (res) {
  return res.json();
}).then(function (data) {
  if (data.error) {
    console.error("Error al mostrar los datos", data);
  } else {
    mostrarreserva(data.body[0]);
  }
})["catch"](function (error) {
  return console.log("error al mostrar los datos", error);
});
var mostrarreserva = function mostrarreserva(data) {
  var body = '';
  for (var i = 0; i < data.length; i++) {
    body += "\n            <h3 class=\"card-title\">Reservas</h3>\n            <hr>\n            <p class=\"card-text\">Activas : ".concat(data[i].reserva, "</p>\n        ");
  }
  document.getElementById('reserva').innerHTML = body;
};