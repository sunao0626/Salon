app.controller('RoomFollowedListCtrl', function($rootScope, $scope, $firebase, $location,$http){
	  var ref = new Firebase($rootScope.URL + $rootScope.user.uid.toString()+'/followed');
	  var sync = $firebase(ref);
	  $scope.followedRooms = sync.$asArray();
})