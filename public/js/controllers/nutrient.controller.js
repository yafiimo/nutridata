function NutrientController($stateParams, NutrientFactory) {
  const controller = this;

  controller.getNutrientList = () => {
    NutrientFactory.getNutrientList().then(
      (success) => {
        console.log('Got nutrient list:', success.data);
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
        console.log('Got nutrients:', success.data);
        controller.proximates = success.data.proximates;
        controller.minerals = success.data.minerals;
        controller.vitamins = success.data.vitamins;
      },
      (error) => {
        console.warn('Could not get nutrients:', error);
      }
    );
  };


  function init() {
    controller.searched = false;
  }
  init();
}

NutrientController.$inject = ['$stateParams', 'NutrientFactory'];


angular
  .module('nutri-data')
  .controller('NutrientController', NutrientController);