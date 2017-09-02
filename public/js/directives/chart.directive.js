function myChart($window) {
  return {
    restrict: 'E',
    replace: false,
    // scope.data is given the value of whatever you put in values="" in the html
    scope: {
      data: '=values'
    },
    link: function(scope, element, attrs) {
      const chart = $window.d3.select(element[0]);
      chart.append('div').attr('class', 'chart')
      .selectAll('div')
      .data(scope.data).enter().append('div')
      .style('width', (d) => d + '%')
      .text((d) => d );
      console.log(chart);

    }
  };
}


angular.module('nutri-data')
  .directive('myChart', myChart);
