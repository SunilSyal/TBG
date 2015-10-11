var TBG = angular.module('TBG', []);

TBG.controller('tbg__main-ctrl', [ 'tbg_loader', 'tbg__main_service', function(tbg_loader, tbg__main_service) {
    var self = this;

    self.config = {
    	isDev : false,
    	jsonPath : 'mock/',
    	imagesPath : 'images/',
    	serverPath : 'http://thebestgadget.com/TBG/',
    	siteJsonListFileName : 'siteList.json',
    	saleJsonListFileName : 'saleList.json'
    }

    function init(){
    	setJsonPath();
    	tbg_loader.loadFile(self.jsonPath + self.config.siteJsonListFileName, proceedSites);
    	tbg_loader.loadFile(self.jsonPath + self.config.saleJsonListFileName, proceedSale);
    }

    function setJsonPath(){
    	self.jsonPath = self.config.isDev ? self.config.jsonPath : self.config.serverPath + self.config.jsonPath;
    	self.imagesPath = self.config.isDev ? self.config.imagesPath : self.config.serverPath + self.config.imagesPath;
    }

    function proceedSites(response){
    	tbg__main_service.addObject(response, 'sites', self.imagesPath);
    }

    function proceedSale(response){
    	tbg__main_service.addObject(response, 'sale', self.imagesPath);
    }

    self.name ="sunil";

    self.openWindow = function (link){
 
    	navigator.app ? navigator.app.loadUrl(link, {openExternal : true}) : window.open(link);
    }

    self.refresh = function (){
    	tbg__main_service.clean();
    	init();
    }

    self.breadcrumb = "Top Shopping Sites"

    self.getSiteList = tbg__main_service.getSiteList;

    self.getSaleList = tbg__main_service.getSaleList;

    self.catList = tbg__main_service.getCatList;

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

  function getCatList(){
  	return objRef.catList;
  }

  function addObject(obj, dataType, path){
  	for(var i in obj){
  		objRef[i] = obj[i];
  	}

  	switch (dataType){
  		case 'sites':
  			setPaths(path);
  		break;
  		case 'sale':
  			setDate();
  		break;
  	}
  }

  function setPaths(path){
  	var len =  objRef.siteList.length;

  	for(var i=0; i< len; i++){
  		var ref = objRef.siteList[i];
  		ref.img = path + ref.img;
  	}
  }

  function clean(){
  		objRef = {};
  }

  function setDate(){
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
  	addObject : addObject,
  	getCatList : getCatList,
  	clean : clean
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