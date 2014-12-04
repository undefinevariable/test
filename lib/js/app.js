var socialCode = angular.module('socialCode',[]);

socialCode.controller('login',function(resource,$location){  //controller for login
  self = this;
  self.showSignup = 0;                  //toggel sign up form  @0 = hidden, @1 = visible
  self.invalid = false;
  self.auth = function(){
    if(!!self.email && !!self.pwd){   // check if @email @password aren't left blank
      var payload = {
        email:self.email,
        password:self.pwd
      }
      resource.login(payload).success(function(response){ //call Web service for login
        if(response.error == 0){                       //successfull auth
          window.location.href = '/home';
        }else{
          self.pwd = null;
          self.invalid = true;
        }
      });
    }

  }

  self.register = function(data){
    if(!!data){
      if(data.password == data.passwordagain){
        var payload = {
          email:data.email,
          password:data.password,
          username:data.username
        };
        resource.register(payload).success(function(response){ //call WS for login
          if(response.error == 0){                       //successfull auth
            alert('registered successfully!');
          }else{
              self.registerObj.errormsg = response.status;
          }
        });
      }else{
        self.registerObj.errormsg = "Passwords do not match";
      }

    }

  }

});
