var express         =       require("express");
var bodyParser      =       require("body-parser");
var cookieParser    =       require("cookie-parser");
var session         =       require("express-session");
var util            =       require("util");
var morgan          =       require('morgan');
var app             =       express();
var config          =       require("./config/general");
var db_operation    =       require("./model/function");

/*
  * Express Configuration Part.
  * We will set the development environment here.
  * Defining from where static files need to be serve.
  * From where the router will be handle.
  * From where the Images will be server.
*/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: '$#%!@#@@#SSDASASDVV@@@@', key: 'sid'}));
app.use(express.static(__dirname + '/Public'));
app.use(express.static(__dirname + '/lib/css/bootstrap/js'));
app.use(express.static(__dirname + '/lib/css/bootstrap/css'));
app.use(express.static(__dirname + '/lib/css/bootstrap/fonts'));
app.use(express.static(__dirname + '/lib/js'));
var route           =       require("./controller/index")(app);
db_operation.initialise_db();
/*
  *=================Express Configuration Over.=====================
*/

app.listen(config.port,function(){
      console.log("Server is Started \nWe are Listening at Port "+config.port+" \n");
});
