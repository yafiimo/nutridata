function FoodController(FoodFactory) {
  const controller = this;

  controller.searchFood = () => {
    console.log(controller.search);

    FoodFactory.searchFood(controller.search).then(
      (success) => {
        console.log('got food:', success.data);
      },
      (error) => {
        console.warn('Error could not get food data:', error);
      }
    );
  };

  FoodController.$inject = ['FoodFactory'];

  function init() {
  }
  init();
}

angular
  .module('food-data')
  .controller('FoodController', FoodController);
