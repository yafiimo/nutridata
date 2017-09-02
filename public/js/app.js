function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        '': { templateUrl: '../states/home.html' },
        'banner@home': { templateUrl: '../states/partials/banner.html' }
      }
    })
    .state('results', {
      url: '/results/:foodName',
      params: {
        filters: null
      },
      views: {
        '': { templateUrl: '../states/results.html' },
        'banner@results': { templateUrl: '../states/partials/banner.html' }
      }
    })
    .state('food', {
      url: '/food/:ndbno',
      params: {
        foodName: null,
        filters: null
      },
      templateUrl: '../states/food.html'
    });


  $urlRouterProvider.otherwise('/');
}

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

angular.module('nutri-data', ['ui.router'])
  .config(MainRouter);
