"use strict";

var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/notas/";
document.getElementById('titulo').value = localStorage.getItem('edittitulo');
document.getElementById('notas').value = localStorage.getItem('editnotas');
document.getElementById('prioridad').value = localStorage.getItem('editprioridad');
document.getElementById('estado').value = localStorage.getItem('editestado');
var idnotas = localStorage.getItem('editidnotas');
var editar = function editar() {
  var titulo = document.getElementById('titulo').value;
  var notas = document.getElementById('notas').value;
  var prioridad = document.getElementById('prioridad').value;
  var estado = document.getElementById('estado').value;
  var options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idnotas: idnotas,
      titulo: titulo,
      notas: notas,
      prioridad: prioridad,
      estado: estado
    })
  };
  fetch(portatilplus, options).then(function (res) {
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
        title: "Nota editada Correctamente",
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(function () {
        window.location.href = "/dash/notas";
      }, 1000);
    }
  })["catch"](function (error) {
    return console.log(error);
  });
};