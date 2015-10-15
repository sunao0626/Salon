app.controller('ChatCtrl', function($rootScope, $scope, $firebase, $routeParams) {
  // get room details
  var chatRoom = new Firebase($rootScope.URL + 'chatRooms/' + $routeParams.roomid);
  var roomSync = $firebase(chatRoom);
  $scope.roomInfo = roomSync.$asObject();
  console.log($scope.roomInfo);

  var msgsSync = $firebase(chatRoom.child('chatMessages'));
  $scope.chatMessages = msgsSync.$asArray();


  $scope.Anonymity=false;


  $scope.isMe=function (author) {
    // body...
    return author==user.name;
  }

  $scope.sendMessage = function($event) {
    if (!($event.which == 13)) return;
    if ($scope.message.length == 0) return;

    if(!$scope.Anonymity){
        msgsSync.$push({
          postedby: $rootScope.user.name,
          message: $scope.message,
          posteddate: Date.now(),
          userimg: $rootScope.user.img
        })
    }else{
         msgsSync.$push({
          postedby:'unknown',
          message: $scope.message,
          posteddate: Date.now(),
          userimg: 'components/user.png'
        })
    }

    $scope.message = '';
  };

  $scope.exitRoom = function () {
    var index = $scope.roomInfo.chater.indexOf($rootScope.user.name);
    if (index > -1) {
         console.log(index)
         $scope.roomInfo.InChat= $scope.roomInfo.InChat-1;
         $scope.roomInfo.chater.splice(index, 1);
         chatRoom.child('InChat').set($scope.roomInfo.InChat); 
         chatRoom.child('chater').set($scope.roomInfo.chater); 
         console.log($scope.roomInfo.InChat)
         console.log($scope.roomInfo.chater)
    }
  }
});