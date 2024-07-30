document.getElementById('nombre').value = localStorage.getItem('envnombre');
document.getElementById('apellido').value = localStorage.getItem('envmodelo');
document.getElementById('telefono').value = localStorage.getItem('envapellido');
document.getElementById('sanciones').value = localStorage.getItem('envsanciones');
document.getElementById('descripcion').value = localStorage.getItem('envdescripcion');
var idpazysalvo = localStorage.getItem('envidpazysalvo');
var cancelar = document.getElementById("cancelar");
cancelar.addEventListener('click', function () {
  window.location.href = "/dash/paz";
});