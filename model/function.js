/*
  * File name : function.js
  * Responsible for handling Database operations.
  * This file is very important.
  * Please make sure that you do not do any changes without proper understanding.
*/
var sqlite3         =       require('sqlite3').verbose();
var db              =       new sqlite3.Database('./socialcode.db');
module.exports={

          initialise_db : function()
          {
            db.serialize(function() {
                db.run("PRAGMA foreign_keys = ON");
            });
          }
}
