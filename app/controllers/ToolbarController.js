app.controller('Toolbar', ['$rootScope', '$scope', 'Window',
  function($rootScope, $scope, Window) {
    $scope.minimize = function() {
      Window.minimize();
    };

    $scope.toggleFullscreen = function() {
      Window.toggleKioskMode();
    };

    $scope.close = function() {
      Window.close();
    };

    $scope.logoutUser = function() {
      $rootScope.user = '';
      $rootScope.authClient.$logout();
    };
  }
])