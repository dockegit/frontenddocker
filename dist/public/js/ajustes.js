var portatilpluss = sessionStorage.getItem("portatilplus") + "/admin/perfil/";
var id = sessionStorage.getItem("id");
fetch(portatilpluss + id).then(function (res) {
  return res.json();
}).then(function (data) {
  document.getElementById("nombre").value = data.body[0][0].nombre;
  document.getElementById("apellido").value = data.body[0][0].apellido;
  document.getElementById("telefono").value = data.body[0][0].telefono;
  document.getElementById("correo").value = data.body[0][0].correo;
  document.getElementById("rol").value = data.body[0][0].rol;
  document.getElementById("estado").value = data.body[0][0].estado;
})["catch"](function (error) {
  console.error('Error al obtener los datos del perfil:', error);
});
var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/perfil";
var editar = function editar() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var telefono = document.getElementById("telefono").value;
  var correo = document.getElementById("correo").value;
  var options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_registro: id,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      correo: correo
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
        title: "Perfil Editado Correctamente",
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(function () {
        location.reload();
      }, 1000);
    }
  })["catch"](function (error) {
    return console.log(error);
  });
};
var volver = document.getElementById('volver');
volver.addEventListener('click', function () {
  location.href = '/dash';
});