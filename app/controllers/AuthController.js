app.controller('AuthCtrl', function($rootScope, $location, $scope) {

  var user = {
    email: '',
    password: '',
    rpassword: ''
      //user-real-passworld
  };


  $scope.GoToSignUp = function() {
    $location.path('/SignUp');
  }
  $scope.GoToSignIn = function() {
      $location.path('/SignIn');
    }
    //signup
  $scope.signup = function() {
    var user = $scope.user;
    if (!user || (!user.email || user.password.length == 0 || user.rpassword.length == 0)) {
      alert('Please enter valid credentials');
    } else {
      if (user.password == user.rpassword) {
        $rootScope.ref.createUser({
          email: user.email,
          password:user.password
        }, function(error) {
          if (error === null) {
            console.log("User created successfully");
            $rootScope.redirect(user);
          } else {
            console.log("Error creating user:", error);
          }
        });

      } else {
        alert('Passwords do not match');
      }
    }
  };

  // signin
  $scope.signin = function() {
    var user = $scope.user;
    if (!user || (!user.email || user.password.length == 0)) {
      alert('Please enter valid credentials');
    } else {
      $rootScope.ref.authWithPassword({
        email: user.email,
        password: user.password
      }, function(error, authData) {
        if (error) {
          if (error.code == 'INVALID_EMAIL') {
            alert('Please enter a valid email address');
          } else if (error.code == 'INVALID_PASSWORD' || error.code == 'INVALID_USER') {
            alert('Invalid Email or Password');
          } else {
            alert("Something went wrong");
          }
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $rootScope.redirect(authData);
        }
      });
    }
  }

  // social login
  $scope.login = function(provider) {
    $rootScope.authClient.$authWithOAuthPopup(provider).then(function(user) {
      $rootScope.redirect(user);
    }, function(error) {
      console.error("Login failed: " + error);
    })
  }



})