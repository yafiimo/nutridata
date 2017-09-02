function myChart($window) {
  return {
    restrict: 'E',
    replace: false,
    // scope.data is given the value of whatever you put in values="" in the html
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {
      const chart = $window.d3.select(element[0])
        .append('div').attr('class', 'chart')
        .selectAll('div')
        .data(scope.data);

      chart.enter().append('div')
      .style('width', (data) => Math.log(data.gm)*10 + '%')
      .text((data) => data.gm )
      .exit().remove();

    // d3.selectAll('div')
    //   .data(scope.data)
    //   .text((d) => 'this is an item' + d)
    //   .style('font-size', (d) => d + 'px');
    // }
    }
  };
}


angular.module('nutri-data')
  .directive('myChart', myChart);
