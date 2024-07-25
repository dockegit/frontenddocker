"use strict";

document.getElementById('nombre').value = localStorage.getItem('editnombre');
document.getElementById('apellido').value = localStorage.getItem('editapellido');
document.getElementById('tele').value = localStorage.getItem('edittelefono');
document.getElementById('sanciones').value = localStorage.getItem('editsanciones');
document.getElementById('descripcion').value = localStorage.getItem('editdescripcion');
var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/salvo";
var id = localStorage.getItem('editpazysalvo');
var editar = function editar() {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var tele = document.getElementById('tele').value;
  var sanciones = document.getElementById('sanciones').value;
  var descripcion = document.getElementById('descripcion').value;
  var options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idpazysalvo: id,
      nombre: nombre,
      apellido: apellido,
      telefono: tele,
      sanciones: sanciones,
      descripcion: descripcion
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
        title: "Paz y salvo Editado Correctamente",
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(function () {
        window.location.href = "/dash/paz";
      }, 1000);
    }
  })["catch"](function (error) {
    return console.log(error);
  });
};