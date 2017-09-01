function FoodController($state, $stateParams, FoodFactory) {
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
    const foodGroups = [];
    for(const filter in controller.filters) {
      if(controller.filters[filter]) {
        foodGroups.push(filter);
      }
    }
    controller.search.foodGroups = foodGroups.join('-');
    FoodFactory.searchFood(controller.search).then(
      (success) => {
        console.log('got food:', success.data);
        controller.lower = 0;
        controller.upper = 10;
        controller.pageNumbers = [];
        if(!success.data.errors) {
          controller.searched = true;
          controller.searchResults = success.data;
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

  controller.backToResults = () => {
    $state.go('home', { foodName: $stateParams.foodName, filters: $stateParams.filters });
    controller.filters = $stateParams.filters;
    controller.search.foodName = $stateParams.foodName;
    controller.searchFood();
  };

  function createPagesArray(guests) {
    const pages = Math.ceil(guests.length/10);
    for(let i = 1; i <= pages; i++) {
      controller.pageNumbers.push(i);
    }
  }

  function init() {
    controller.searched = false;
    controller.search = {};
    console.log($state);
  }
  init();
}

FoodController.$inject = ['$state', '$stateParams', 'FoodFactory'];


angular
  .module('nutri-data')
  .controller('FoodController', FoodController);
