function FoodFactory($http) {
  return {
    searchFood: function(search) {
      console.log(search);
      return $http({
        method: 'GET',
        url: `/search?q=${search.foodName}`
      });
    }
  };
}

angular
  .module('food-data')
  .factory('FoodFactory', FoodFactory);
