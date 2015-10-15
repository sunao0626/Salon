app.controller('HomeCtrl', function($rootScope, $scope, $firebase, $location,$http) {
  var ref = new Firebase($rootScope.URL + 'chatRooms');
  var sync = $firebase(ref);

  var UserRef = new Firebase($rootScope.URL+'users/'+$rootScope.user.uid+'/followed');
  var UserSync = $firebase(UserRef);
  $scope.followedRooms = UserSync.$asArray();
  console.log($scope.followedRooms)
  $scope.rooms = sync.$asArray();

  //console.log($scope.followedRooms)
  $scope.roomClass="Classificiation";

  $scope.tags=[];
  $scope.src="";
 

  
  $scope.classes=[
      {name:'sports' },
      {name:'music'  },
      {name:'movie'  },
      {name:'news'   },
      {name:'science'},
      {name:'pc'}
  ];

  $scope.newRoom = function() {
    var firebaseID=sync.$push({
        createdby: $rootScope.user.name,
        roomname: $scope.roomName,
        createddate: Date.now(),
        tags: $scope.tags,
        quote: $scope.src,
        description:$scope.Description,
        InFollow:0,
        InChat:0,
        follower:['ADMIN'],
        roomclass:$scope.roomClass,
        chater:['ADMIN']
    });   
    $scope.isNew = false;
    $scope.roomName="";
    $scope.roomClass=undefined;
    $scope.tags=[];
    $scope.Description="";
    $scope.src="";
  };

  $scope.deleteRoom = function(room) {
    sync.$remove(room.$id);
  };

  $scope.joinChat = function(room) {
      if(!joined(room)){
        room.InChat=room.InChat+1;      
        room.chater.push($rootScope.user.name);
        ref.child(room.$id).child('InChat').set(room.InChat); 
        ref.child(room.$id).child('chater').set(room.chater); 
      } 
      $location.path('/chat/' + room.$id);
  };

  $scope.followChat = function(room){
    console.log(room)
      room.InFollow= room.InFollow+1; 
      room.follower.push($rootScope.user.name);
      ref.child(room.$id).child('InFollow').set( room.InFollow);
      ref.child(room.$id).child('follower').set( room.follower);
      UserSync.$push(room.$id);

  };
   $scope.followed = function(room){
     if(room.follower.indexOf($rootScope.user.name)>-1)
        return true;
      else
        return false;
  };
  var joined = function(room){
     if(room.chater.indexOf($rootScope.user.name)>-1)
        return true;
      else
        return false;
  };

  $scope.AutoSearch=function(tag){
    $scope.keyword=tag;
  };

  $scope.logout = function () {
    localStorage.removeItem('User');
    $location.path('/');
  }
  $scope.CancelNew = function () {
    $scope.isNew = false;
    $scope.roomName="";
    $scope.roomClass=undefined;
    $scope.tags=[];
    $scope.Description="";
    $scope.src="";
  }
    $scope.notFollow = function (room) {
    var index = room.follower.indexOf($rootScope.user.name);
    if (index > -1) {
         console.log(index)
         room.InFollow=room.InFollow-1;
         room.follower.splice(index, 1);
         ref.child(room.$id).child('InFollow').set( room.InFollow);
         ref.child(room.$id).child('follower').set( room.follower); 
    }
    console.log($scope.followedRooms)

    angular.forEach($scope.followedRooms,function(froom){
            if(froom.$value==room.$id){
              key=froom.$id
               console.log(key)
            }
        })
      
    UserRef.child(key).remove(); 
  }




})
app.filter('search', function(){    
    return function(items, keyword){
        if(angular.isUndefined(keyword)||keyword==" ")
           return items; 

        var arrayToReturn = []; 

         angular.forEach(items, function(item) {
            var existed=false;
            angular.forEach(item.tags, function(tag) {
                if (!existed && tag.text.indexOf(keyword)>-1){
                   arrayToReturn.push(item);
                   existed=true;
                }
            }) 
        })

        return arrayToReturn;
    };
});
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
app.filter('followed', function(){    
    return function(items, targets){      

        var arrayToReturn = []; 

         angular.forEach(targets, function(target) {
            var existed=false;
            angular.forEach(items, function(item) {
              
              if(!existed && target.$value==item.$id){
                  arrayToReturn.push(item);
                   existed=true;
              }            
            })
        })
        return arrayToReturn;
    };
});
app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
};
}])
app.directive('iframeSetDimentionsOnload', [function(){
return {
    restrict: 'A',
    link: function(scope, element, attrs){
        element.on('load', function(){
            /* Set the dimensions here, 
               I think that you were trying to do something like this: */
               var iFrameHeight = element[0].contentWindow.document.body.scrollHeight + 'px';
               var iFrameWidth = '100%';
               element.css('width', iFrameWidth);
               element.css('height', iFrameHeight);
        })
    }
}}])