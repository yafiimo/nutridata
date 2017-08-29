function FoodFactory($http) {
  return {
    searchFood: function(search) {
      return $http({
        method: 'GET',
        url: `/api/search?q=${search.foodName}`
      });
    },
    getFoodGroups: function() {
      return $http({
        method: 'GET',
        url: '/api/food-groups'
      });
    }

  };
}

angular
  .module('nutri-data')
  .factory('FoodFactory', FoodFactory);
