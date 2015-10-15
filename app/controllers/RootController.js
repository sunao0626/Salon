app.controller('AppCtrl',
  function($rootScope, $scope, $location,$firebaseAuth) {
    $rootScope.URL = 'https://blistering-heat-5659.firebaseio.com/';
    var ref = new Firebase($rootScope.URL);
    $rootScope.ref=ref;
    $rootScope.authClient = $firebaseAuth(ref);

    if (!angular.isUndefined(localStorage.getItem('User')))
    {
      $rootScope.user = JSON.parse(localStorage.getItem('User'));
    }


    $rootScope.redirect = function(user) {

      $location.path('/home');
      
      ref.child("users").child(user.uid).child('profile').set(user);
      
    

      if (user.provider == 'password' ) {
        user.name = user.password.email;
        user.img = 'components/user.png'
        $scope.$apply(function() {
          $location.path('/home');
        })
      } else if (user.provider == 'facebook') {
        user.name = user.facebook.cachedUserProfile.name;
        user.img = user.facebook.cachedUserProfile.picture.data.url
      } else if (user.provider == 'twitter') {
        user.name = user.displayName;
        user.img = user.thirdPartyUserData.profile_image_url;
      } else if (user.provider == 'google') {
        user.name = user.displayName;
        user.img = user.thirdPartyUserData.picture;
      } else{
        user.name = user.email;
        user.img = 'components/user.png'
        $scope.$apply(function() {
          $location.path('/home');
        })
      }

      $rootScope.user = user;     
      localStorage.setItem('User', JSON.stringify(user));
      var temp=localStorage.getItem('User');
      console.log(JSON.parse(temp))

    };

    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
      if (user) {
        $rootScope.redirect(user);
      }
    });

  }
)