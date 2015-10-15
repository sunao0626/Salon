var app = angular.module('Salon',[
   'ngRoute', 
   'firebase', 
   'luegg.directives',
   'ngTagsInput',
   'uiSwitch',
   'ui.bootstrap',
   'mgcrea.ngStrap'
]);


app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'partials/auth/SignIn.html',
        controller: 'AuthCtrl'
      });
      $routeProvider.when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      });
      $routeProvider.when('/chat/:roomid', {
        templateUrl: 'partials/chat.html',
        controller: 'ChatCtrl'
      });
      $routeProvider.when('/SignUp', {
        templateUrl: 'partials/auth/SignUp.html',
        controller: 'AuthCtrl'
      });
      $routeProvider.otherwise({
        redirectTo: '/'
      });
    }
  ])