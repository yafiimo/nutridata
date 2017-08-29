function FoodController(FoodFactory) {
  const controller = this;

  controller.getFoodGroups = () => {
    FoodFactory.getFoodGroups().then(
      (success) => {
        console.log('got food groups:', success.data);
        controller.foodGroups = success.data.list.item;
      },
      (error) => {
        console.warn('Error could not get food groups:', error);
      }
    );
  };

  controller.searchFood = () => {
    FoodFactory.searchFood(controller.search).then(
      (success) => {
        console.log('got food:', success.data);
        controller.lower = 0;
        controller.upper = 10;
        controller.pageNumbers = [];
        if(!success.data.errors) {
          controller.searched = true;
          controller.searchResults = success.data.list.item;
          createPagesArray(controller.searchResults);
        } else {
          controller.searchResults = [];
        }
      },
      (error) => {
        console.warn('Error could not get food data:', error);
      }
    );
  };

  controller.changePage = (page) => {
    controller.lower = (page * 10) - 10;
    controller.upper = page * 10;
  };

  function createPagesArray(guests) {
    var pages = Math.ceil(guests.length/10);
    for(var i = 1; i <= pages; i++) {
      controller.pageNumbers.push(i);
    }
  }

  function init() {
    controller.searched = false;
    controller.pageNumbers = [];
  }
  init();
}

FoodController.$inject = ['FoodFactory'];


angular
  .module('nutri-data')
  .controller('FoodController', FoodController);
