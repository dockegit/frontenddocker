"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var logueo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var correo, contrasena, url, portatilplus, options;
    return _regenerator["default"].wrap(function _callee$(_context) {
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