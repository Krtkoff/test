/**
 * Created by Krtkoff on 18.02.2017.
 */


angular
  .module('app')
  .config(appConfig)
  .run(appRun);

function appConfig($urlRouterProvider, $locationProvider, $httpProvider, $qProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');

}

function appRun() {

}
