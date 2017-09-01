function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      params: {
        foodName: null,
        filters: null
      },
      templateUrl: '../states/home.html'
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
