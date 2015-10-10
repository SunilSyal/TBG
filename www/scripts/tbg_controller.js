var TBG = angular.module('TBG', []);

TBG.controller('tbg__main-ctrl', ['tbg__main_service' , function(tbg__main_service) {
    var self = this;
    self.name ="sunil";

    self.openWindow = function (link){
 
    	navigator.app ? navigator.app.loadUrl(link, {openExternal : true}) : window.open(link);
    }

    self.getSiteList = tbg__main_service.getSiteList;

    self.getSaleList = tbg__main_service.getSaleList;
}]);


TBG.factory('tbg__main_service', function() {
  var objRef = {};

  objRef.siteList = [
  	{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'Amazon'
  	},
  	{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'Fashion and Something'
  	},
  	{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'FlipKart'
  	},{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'Amazon'
  	},
  	{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'Fashion and Something'
  	},
  	{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'FlipKart'
  	},{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'Amazon'
  	},
  	{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'Fashion and Something'
  	},
  	{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'FlipKart'
  	},
  	{
  		img: 'images/flipkart.png',
  		tgt: "http://www.google.com",
  		name: 'FlipKart'
  	}
  ];

  objRef.saleList = [
  	{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'Amazon'
  	},
  	{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'Fashion and Something'
  	},
  	{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'FlipKart'
  	},{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'Amazon'
  	},
  	{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'Fashion and Something'
  	},
  	{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'FlipKart'
  	},{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'Amazon'
  	},
  	{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'Fashion and Something'
  	},
  	{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'FlipKart'
  	},
  	{
  		date:'Nov 21 - Nov 23',
  		event: 'Sale',
  		tgt: "http://www.google.com",
  		name: 'FlipKart'
  	}
  ];

  function getSiteList(){
  	return objRef.siteList;
  }

  function getSaleList(){
  	return objRef.saleList;
  }
  
  return {
  	getSiteList: getSiteList,
  	getSaleList : getSaleList
  };
});


TBG.directive('tbg__insert_link', function() {
  return {
    template: 'onclick="{{item.finalTarget}}"'
  };
});