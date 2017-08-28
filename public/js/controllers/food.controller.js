function FoodController(FoodFactory) {
  const controller = this;

  controller.searchFood = () => {
    console.log(controller.search);

    FoodFactory.searchFood(controller.search).then(
      (success) => {
        console.log('got food:', success.data);
        controller.searchResults = success.data.list.item;
        if(controller.searchResults.length > 0) controller.searched = true;
      },
      (error) => {
        console.warn('Error could not get food data:', error);
      }
    );
  };

  FoodController.$inject = ['FoodFactory'];

  function init() {
    controller.searched = false;
    controller.foodGroups = ['veggies', 'fruit'];
  }
  init();
}

angular
  .module('nutri-data')
  .controller('FoodController', FoodController);
