(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert('tappaed');
      }, 100);
    };
    $scope.showPopover = function() {
      ons.createPopover('popover.html').then(function(popover) {
        popover.show('#popover');   
      });
    };
  });

  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
    $scope.showAlert = function(item) {
	ons.notification.confirm({
	  message: item.title,
	  callback: function (index) {
	      switch (index) {
              case 1:
		ons.notification.alert({message: "OKボタンが押されました"});
		break;
              case 0:
		ons.notification.prompt({message: "Cancelを押した理由を教えてください",
					 callback: function (text) {
					     ons.notification.alert({
						 message: text
					     });
					 }
					});
		break;
	      }
          }
        });
    };
    $scope.showDialog = function (item) {
	ons.createAlertDialog('alert.html').then(function(alertDialog) {
	    alertDialog.show();   
	});
    };
  });

  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;  
    
    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
    };
  });

  module.factory('$data', function() {
      var data = {};
      
      data.items = [
          { 
              title: 'Item 1 Title',
              label: '4h',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          { 
              title: 'Another Item Title',
              label: '6h',
              desc: 'Ut enim ad minim veniam.'
          },
          { 
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          },
          { 
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
      ]; 
      
      return data;
  });
})();

