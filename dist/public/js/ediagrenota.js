// consumo agregar

var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/notas/";
var cancelar = document.getElementById("cancelar");
cancelar.addEventListener('click', function () {
  window.location.href = "/dash/notas";
});

// agregar
console.log(portatilplus);
var agregar = function agregar() {
  var titulo = document.getElementById("titulo").value;
  var notas = document.getElementById("notas").value;
  var prioridad = document.getElementById("prioridad").value;
  var estado = document.getElementById("estado").value;
  if (!titulo || !notas || !prioridad || !estado) {
    Swal.fire("Campos vacíos!");
    return;
  }
  var options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo: titulo,
      notas: notas,
      prioridad: prioridad,
      estado: estado
    })
  };
  fetch(portatilplus, options).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.error == false) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nota agregada Correctamente",
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(function () {
        location.href = "/dash/notas";
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al agregar nota!"
      });
    }
  });
};