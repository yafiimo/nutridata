function NutrientController($stateParams, NutrientFactory) {
  const controller = this;

  controller.getNutrientList = () => {
    NutrientFactory.getNutrientList().then(
      (success) => {
        controller.nutrientList = success.data;
      },
      (error) => {
        console.warn('Could not get nutrient list:', error);
      }
    );
  };
  controller.getNutrients = () => {
    const ndbno = $stateParams.ndbno;
    NutrientFactory.getNutrients(ndbno).then(
      (success) => {
        controller.foodName = success.data.name;
        controller.nutrients = success.data.nutrients;
        controller.loaded = true;
      },
      (error) => {
        console.warn('Could not get nutrients:', error);
      }
    );
  };


  function init() {
    controller.loaded = false;
    controller.getNutrients();
    controller.numbers = [1,3,7,14,16];
  }
  init();
}

NutrientController.$inject = ['$stateParams', 'NutrientFactory'];


angular
  .module('nutri-data')
  .controller('NutrientController', NutrientController);
