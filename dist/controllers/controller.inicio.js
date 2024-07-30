import { config } from "dotenv";
config();
var login = function login(req, res) {
  var url = process.env.BACK_URL;
  var options = {
    url: url
  };
  res.render("view.login.ejs", options);
};
export var ruta = {
  login: login
};