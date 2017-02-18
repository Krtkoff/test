/**
 * Created by Krtkoff on 18.02.2017.
 */

angular
  .module('app.404')
  .config(homeConfig);

function homeConfig($stateProvider) {
  $stateProvider
    .state('404', {
      url  : '/404',
      views: {
        "main": {
          controller  : 'notFoundCtrl',
          controllerAs: 'notFound',
          templateUrl : '404/404.tpl.html'
        }
      }
    });
}