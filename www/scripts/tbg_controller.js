var TBG = angular.module('TBG', []);

TBG.controller('tbg__main-ctrl', [ 'tbg_loader', 'tbg__main_service', function(tbg_loader, tbg__main_service) {
    var self = this;

    self.config = {
    	isDev : false,
    	jsonPath : 'mock/',
    	serverPath : 'http://thebestgadget.com/TBG/',
    	siteJsonListFileName : 'siteList.json',
    	saleJsonListFileName : 'saleList.json'
    }

    function init(){
    	setJsonPath();
    	tbg_loader.loadFile(self.jsonPath + self.config.siteJsonListFileName, proceed);
    	tbg_loader.loadFile(self.jsonPath + self.config.saleJsonListFileName, proceed);
    }

    function setJsonPath(){
    	self.jsonPath = self.config.isDev ? self.config.jsonPath : self.config.serverPath + self.config.jsonPath;
    }

    function proceed(response){
    	tbg__main_service.addObject(response);
    }

    self.name ="sunil";

    self.openWindow = function (link){
 
    	navigator.app ? navigator.app.loadUrl(link, {openExternal : true}) : window.open(link);
    }

    self.breadcrumb = "Some text here."

    self.getSiteList = tbg__main_service.getSiteList;

    self.getSaleList = tbg__main_service.getSaleList;

    init();
}]);


TBG.factory('tbg__main_service', function() {
  var objRef = {};

  function getSiteList(){
  	return objRef.siteList;
  }

  function getSaleList(){
  	return objRef.saleList;
  }

  function addObject(obj){
  	for(var i in obj){
  		objRef[i] = obj[i];
  	}

  	setDate();
  }

  function setDate(){

  	if(!objRef.saleList) return;

  	var len =  objRef.saleList.length,
  	today = new Date();
  	today = today.getTime();
  	for(var i=0; i< len; i++){
  		var ref = objRef.saleList[i];

  		if(Date.parse(ref.endDate) < today) {
  			objRef.saleList[i].date = false;
  		}else{
  			ref.date = ref.startDate ? ref.startDate.split(",")[0] + " - " + ref.endDate.split(",")[0] : ref.endDate.split(",")[0];
  		}
  	}
  }
  
  return {
  	getSiteList: getSiteList,
  	getSaleList : getSaleList,
  	addObject : addObject
  };
});


TBG.factory('tbg_loader', function($http) {

	function loadFile(fileName, callback){
		$http.get(fileName).success(function(data) { 
		    console.log("success!");
		    callback(data); 
		});
	}
	
	return {
	  	loadFile: loadFile
	};
});


TBG.directive('tbg__insert_link', function() {
  return {
    template: 'onclick="{{item.finalTarget}}"'
  };
});