/**
 * Created by Krtkoff on 18.02.2017.
 */

angular
  .module('app.home')
  .config(homeConfig);

function homeConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url  : '/',
      views: {
        "main": {
          controller  : 'homeCtrl',
          controllerAs: 'home',
          templateUrl : 'home/home.tpl.html'
        }
      }
    });
}