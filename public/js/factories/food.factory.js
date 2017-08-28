function FoodFactory($http) {
  return {
    searchFood: function(search) {
      return $http({
        method: 'GET',
        url: `/search?q=${search.foodName}`
      });
    }
  };
}

angular
  .module('nutri-data')
  .factory('FoodFactory', FoodFactory);
