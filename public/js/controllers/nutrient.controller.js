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
        controller.foodName = success.data.name;
        controller.nutrients = success.data.nutrients;
        convertUnits();
        controller.loaded = true;
      },
      (error) => {
        console.warn('Could not get nutrients:', error);
      }
    );
  };

  controller.showGraph = () => {
    console.log('pressed');
    controller.loaded = true;
  };

  function convertUnits() {
    const length = controller.nutrients.vitamins.chartData.units.length;
    for(let i = 0; i < length; i++) {
      if(controller.nutrients.vitamins.chartData.units[i] === 'µg') {
        controller.nutrients.vitamins.chartData.values[i] *= 0.001;
      }
      controller.nutrients.vitamins.chartData.values[i] =
      controller.nutrients.vitamins.chartData.values[i].toFixed(2);
    }
  }

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
