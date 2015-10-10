var TBG = angular.module('TBG', []);

TBG.controller('tbg__main-ctrl', ['tbg__main_service' , function(tbg__main_service) {
    var self = this;
    self.name ="sunil";

    self.openWindow = function (link){
    	navigator.app.loadUrl("http://google.com", {openExternal : true});
    }

    self.getSiteList = tbg__main_service.getSiteList;
}]);


TBG.factory('tbg__main_service', function() {
  var objRef = [
  	{
  		target: "http://www.google.com"
  	}
  ];

  function updateLinks(){
  	for(var i in objRef){
  		objRef[i].finalTarget = "window.open('"+ objRef[i].target + "','_system', 'location=yes' )"
  	}
  }

  function getSiteList(){
  	return objRef;
  }
  
  updateLinks();
  return {
  	getSiteList: getSiteList
  };
});


TBG.directive('tbg__insert_link', function() {
  return {
    template: 'onclick="{{item.finalTarget}}"'
  };
});