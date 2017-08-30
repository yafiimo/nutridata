function NutrientFactory($http) {
  return {
    getNutrientList: function() {
      return $http({
        method: 'GET',
        url: '/api/nutrients'
      });
    },
    getNutrients: function(ndbno) {
      return $http({
        method: 'GET',
        url: `/api/nutrients/${ndbno}`
      });
    }

  };
}

angular
  .module('nutri-data')
  .factory('NutrientFactory', NutrientFactory);
