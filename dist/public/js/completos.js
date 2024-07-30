document.getElementById('marca').value = localStorage.getItem('editmarca');
document.getElementById('modelo').value = localStorage.getItem('editmodelo');
document.getElementById('estado').value = localStorage.getItem('editestado');
document.getElementById('area').value = localStorage.getItem('editarea');
var id = localStorage.getItem('editidcomputador');
var cancelar = document.getElementById("cancelar");
cancelar.addEventListener('click', function () {
  window.location.href = "/dash/computador";
});