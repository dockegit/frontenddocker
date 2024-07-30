// consumo agregar

var portatilplus = sessionStorage.getItem("portatilplus") + "/admin/salvo/";

// agregar
var agregar = function agregar() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var telefono = document.getElementById("telefono").value;
  var sanciones = document.getElementById("sanciones").value;
  var descripcion = document.getElementById("descripcion").value;
  if (!nombre || !apellido || !telefono || !sanciones || !descripcion) {
    Swal.fire("Campos vacíos!");
    return;
  }
  var options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
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
        text: "Error al agregar nota!"
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nota agregada Correctamente",
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(function () {
        // location.href= "/dash/notas";
        location.reload();
      }, 1000);
    }
  });
};

// editar nota