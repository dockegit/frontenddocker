import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
var logueo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var correo, contrasena, url, portatilplus, options;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          correo = document.getElementById("correo").value;
          contrasena = document.getElementById("contrasena").value;
          url = document.getElementById("url").value;
          if (correo.endsWith("@gmail.com")) {
            _context.next = 6;
            break;
          }
          Swal.fire({
            icon: "error",
            title: "Correo no válido",
            text: "Por favor, ingrese una dirección de correo de Gmail."
          });
          return _context.abrupt("return");
        case 6:
          sessionStorage.setItem("portatilplus", url);
          portatilplus = sessionStorage.getItem("portatilplus") + "/login";
          options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              correo: correo,
              contrasena: contrasena
            })
          };
          _context.next = 11;
          return fetch(portatilplus, options).then(function (res) {
            return res.json();
          }).then(function (data) {
            if (data.error == true) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Correo o Contraseña Incorrecta!"
              });
            } else {
              sessionStorage.setItem("id", data.body.payload.id_registro);
              sessionStorage.setItem("token", data.body.token);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Bienvenido",
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(function () {
                window.location.href = "/dash";
              }, 1000);
            }
          })["catch"](function (err) {
            console.error("error en el fetch", err);
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function logueo() {
    return _ref.apply(this, arguments);
  };
}();

// logo portatil plus se recargue

document.getElementById("logo").addEventListener('click', function () {
  location.reload();
});