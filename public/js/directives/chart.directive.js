function myChart($window) {
  return {
    restrict: 'E',
    replace: false,
    // scope.data is given the value of whatever you put in values="" in the html
    scope: {
      data: '=',
      chartData: '=',
      domain: '=',
      nutrients: '='
    },
    link: function(scope, element) {
      const d3 = $window.d3;
      const margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 50
      };
      const height = 350 - margin.top - margin.bottom;
      const width = 300 - margin.left - margin.right;

      const yScale = d3.scaleLog()
      .range([0, height])
      .domain([0.1, scope.domain]);

      const xScale = d3.scaleBand()
        .domain(d3.range(scope.chartData.length))
        .rangeRound([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

      const colours1 = d3.scaleLinear()
        .domain([0, scope.chartData.length])
        .range(['red', 'yellow']);
      const colours2 = d3.scaleLinear()
        .domain([0, scope.chartData.length])
        .range(['green', 'yellow']);

      const tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('background', '#f4f4f4')
        .style('padding', '5px 15px')
        .style('border', '1px solid grey')
        .style('border-radius', '5px')
        .style('opacity', 0);

      const chart = $window.d3.select(element[0])
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .style('background', 'rgba(255,255,255, 0.8)')
        .style('border', '1px solid white')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .selectAll('rect')
        .data(scope.data)
        .enter().append('rect')
        .style('fill', (data, index) => {
          if(data.unit === 'g') {
            return colours1(index);
          } else {
            return colours2(index);
          }
        })
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
            return yScale(data.gm);
          })
          .attr('y', (data) => {
            return height - yScale(data.gm);
          })
          .duration(900)
          .delay((data, index) => index * 30)
          .ease(d3.easeElastic);

      // Proximates Axes
        //Vertical Axis
      const proxVScale = d3.scaleLog()
        .range([height, 0])
        .domain([0.1, 100]);

      const proxVAxis = d3.axisLeft(proxVScale)
        .tickFormat(d3.format('.1f'))
        .tickValues([1,5,20,100]);

      d3.select('#proximates svg')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(proxVAxis);

        // Horizontal Axis
      const proxHScale = d3.scaleBand()
        .domain(d3.range(scope.chartData.length))
        .rangeRound([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

      const proxHAxis = d3.axisBottom(proxHScale);

      d3.select('#proximates svg')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
        .call(proxHAxis);

      // Minerals Axes
        // Vertical Axis
      const minVScale = d3.scaleLog()
        .range([height, 0])
        .domain([0.1, 2000]);

      const minVAxis = d3.axisLeft(minVScale)
        .tickFormat(d3.format('.1f'))
        .tickValues([1,3,10,30,100,500,2000]);

      d3.select('#minerals svg')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(minVAxis);

        // Horizontal Axis
      const minHScale = d3.scaleBand()
        .domain(d3.range(scope.chartData.length))
        .rangeRound([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

      const minHAxis = d3.axisBottom(minHScale);

      d3.select('#minerals svg')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
        .call(minHAxis);

      // All axes
      d3.selectAll('svg')
      .selectAll('path')
        .style('stroke', 'black');

      d3.selectAll('svg')
      .selectAll('line')
        .style('stroke', 'black');
    }
  };
}


angular.module('nutri-data')
  .directive('myChart', myChart);
