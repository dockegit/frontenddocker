import { config } from "dotenv";
config();
var inicio = function inicio(req, res) {
  res.render("view.nav.dash.ejs");
};
var pazysalvo = function pazysalvo(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.nav.paz.ejs", options);
};
var ajustes = function ajustes(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.ajustes.ejs", options);
};
var listarpazysalvo = function listarpazysalvo(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("historial/view.paz.ejs", options);
};
var editarpazysalvo = function editarpazysalvo(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("editar.paz.ejs", options);
};
var verpazysalvo = function verpazysalvo(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.ver.paz.ejs", options);
};
var historial = function historial(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.nav.historial.ejs", options);
};
// historial
var historialreservas = function historialreservas(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("historial/view.his.ejs", options);
  // historail reserva
};
// historial
var correos = function correos(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.nav.correos.ejs", options);
};
var sanciones = function sanciones(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.nav.sancion.ejs", options);
};
var accesorios = function accesorios(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.nav.accesorio.ejs", options);
};
var computadores = function computadores(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.nav.computador.ejs", options);
};
var notas = function notas(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.nav.notas.ejs", options);
};
var ingrenota = function ingrenota(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.notaingre.ejs", options);
};
var editarnota = function editarnota(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.editar.nota.ejs", options);
};
var notascompletas = function notascompletas(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("historial/view.notas.completas.ejs", options);
};
var vertarea = function vertarea(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("ver.tareas.ejs", options);
};
export var navegacion = {
  inicio: inicio,
  pazysalvo: pazysalvo,
  listarpazysalvo: listarpazysalvo,
  editarpazysalvo: editarpazysalvo,
  verpazysalvo: verpazysalvo,
  historial: historial,
  correos: correos,
  sanciones: sanciones,
  accesorios: accesorios,
  computadores: computadores,
  historialreservas: historialreservas,
  notas: notas,
  ingrenota: ingrenota,
  editarnota: editarnota,
  notascompletas: notascompletas,
  vertarea: vertarea,
  ajustes: ajustes
};