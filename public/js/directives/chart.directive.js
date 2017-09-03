function myChart($window) {
  return {
    restrict: 'E',
    replace: false,
    // scope.data is given the value of whatever you put in values="" in the html
    scope: {
      data: '=',
      chartData: '='
    },
    link: function(scope, element, attrs) {
      const d3 = $window.d3;
      const height = 350;
      const width = 300;

      const yScale = d3.scaleLog();

      const xScale = d3.scaleBand()
        .domain(d3.range(scope.chartData.length))
        .rangeRound([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

      const colours = d3.scaleLinear()
        .domain([0, scope.chartData.length])
        .range(['yellow', 'blue']);

      const tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('background', '#f4f4f4')
        .style('padding', '5px 15px')
        .style('border', '1px solid grey')
        .style('border-radius', '5px')
        .style('opacity', 0);

      const chart = $window.d3.select(element[0])
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', 'rgba(0,0,0, 0.8)')
        .style('border', '10px solid white')
        .style('border-width', '30px 0px 30px 0px')
        .selectAll('rect')
        .data(scope.data)
        .enter().append('rect')
        .style('fill', (data, index) => colours(index))
        .attr('stroke', 'black')
        .attr('stoke-width', 2)
        .attr('height', 0)
        .attr('width', xScale.bandwidth())
        .attr('x', (data, index) => xScale(index))
        .attr('y', height)
        .text((data) => data.nutrient)
        .on('mouseover', (data) => {
          tooltip.transition()
            .style('opacity', 1);
          tooltip.html(data.gm + data.unit)
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY) + 'px');
        });

      chart.transition()
          .attr('height', (data) => {
            if(data.gm > 1) return yScale(data.gm) * 100;
            return data.gm * 100;
          })
          .attr('y', (data) => {
            if(data.gm > 1) return height - (yScale(data.gm) * 100);
            return height - (data.gm * 100);
          })
          .duration(700)
          .delay((data, index) => index * 30)
          .ease(d3.easeElastic);
    }
  };
}


angular.module('nutri-data')
  .directive('myChart', myChart);
