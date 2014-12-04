var sqlite3         =       require('sqlite3').verbose();
var db              =       new sqlite3.Database('./socialcode.db');
var user_session;
var status=[];
module.exports=function(app)
{
  /*
    * Here we will define the Router's of application.
    * Router Determines at which point of request what we need to deliever.
  */
  app.get('/',function(req,res){
    user_session=req.session;
      if(!user_session.email)
        {
              res.render('login');
        }
      else
        {
              res.redirect('/home');
        }
  });

  app.post('/login',function(req,res){
	  var email=req.body.email;
    var password=req.body.password;
    user_session=req.session;
    db.all("select * from user_credential where email='"+email+"' and password='"+password+"'",function(err,rows){
      if(err)
        {
            res.json({"status": "false","error" : "1"});
        }
    if(rows.length===0)
      {
        res.json({"status": "false","error" : "1"});
      }
      else
        {
          if(rows.length===1)
            {
              user_session.email=req.body.email;
              res.json({"status" : "true","error" : "0"});
            }
        }
      });
  });

  app.post('/register',function(req,res){
      var user_id=null;
      user_session=req.session;
      db.all("SELECT * from user_credential where email='"+req.body.email+"'",function(err,rows){
        if(rows.length>0)
          {
            return res.json({"status" : "Opps this email is already registered!","error":"1"});
          }
          else
            {
              db.run("INSERT into user_credential(email,password) VALUES ('"+req.body.email+"','"+req.body.password+"')");
              db.all("SELECT user_id from user_credential where email='"+req.body.email+"'",function(err,rows){
                if(err)
                  {
                    res.json({"status" : "false","error": "1"});
                  }
                else
                          user_id=parseInt(rows[0].user_id);
                          db.run("INSERT into user_detail(user_id,user_name) VALUES ("+user_id+",'"+String(req.body.username)+"')");
                          user_session.email=req.body.email;
                          res.json({"status" : "true","error": "0"});
              });
            }
      });
  });

  app.get('/home',function(req,res){
        user_session=req.session;
        if(!user_session.email)
          {
            res.redirect('/');
          }
        else
          {
                res.render('home',{email:user_session.email});
          }
  });

  app.get('/profile',function(req,res){

          user_session=req.session;
          if(!user_session.email)
            {
              res.redirect('/');
            }
          else
            {
                  res.render('profile',{email:user_session.email});
            }
  });

  /*
    * This route is responsible for fetching the detail of logged in User.
    * These detail will be used by front end view.
  */
  app.get('/fetch_user_information',function(req,res){
    user_session=req.session;
    var user_id=null;
    /*Security Code
      if(user_session.email!=req.query.email)
      {
        res.end(user_session.email);
        console.log("Security alert");
      }
    */
    /*
      *Extract the email ID from API call.
      *Get the User_id with that email.
      *extract user_information by using ID.
      *Send the JSON response back to client.
    */
    db.all("SELECT user_id from user_credential where email='"+req.query.email+"'",function(err,rows){
        if(err)
        {
          res.json({"status" : "false","error": "1"});
        }
        else if(rows.length>0)
          {
            user_id=parseInt(rows[0].user_id);
            db.all("SELECT * from user_detail where user_id="+user_id,function(err,rows){
              if(err)
                {
                  res.json({"status" : "false","error": "1"});
                }
              else
                {
                  res.json(rows[0]);
                }
            });
          }
        else
          {
            res.json({"status" : "false","error": "1"});
          }
    });
  });


  app.get('/get_feed',function(req,res){

        var user_id=req.query.user_id;
        /*

            * This API is responsible for extracting status update.
            * We will extract the user_id and request type.
            * We will look over the database and find feeds and return it back.

        */
        db.all("SELECT my_follower_id from follower where my_user_id="+user_id,function(err,rows){

              var i=0;
              while(i<rows.length)
                {
                        //for each ID, find somethng in status_update table.
                        db.all("SELECT * from status_update where user_id="+rows[i]['my_follower_id'],function(error,data){
                          if(error)
                            {
                              res.json({"error":"yes"});
                            }
                          else
                            {
                              status.push(data);
                              res.json(status[0]);
                            }
                        });
                      i++;
                }

        });
  });

  /*

    * This API add the status in database.

  */

  app.post('/add_status',function(req,res){

          var user_id=req.body.user_id;
          var status=req.body.status;
          var privacy=req.body.privacy;
          db.all("INSERT into status_update(user_id,status_text,privacy) VALUES ("+user_id+",'"+status+"',"+privacy+")",function(err,rows){
            if(err)
              {
                res.json({"error":"1"});
              }
            else
              {
                res.json({"added":"yes"});
              }
          });

  });



  app.get('/account',function(req,res){

  });

  app.get('/logout',function(req,res){

  });
}
