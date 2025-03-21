import * as d3 from "d3";

export let drawBarChart = (barChartLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {
    barChartLayer.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', d => `bar ${d.station.replace(/[^a-zA-Z]/g, "")}`)
      .attr('x', d => xScale(d.station))
      .attr('y', d => yScale(d.tripdurationS))
      .attr('width', xScale.bandwidth())
      .attr('height', d => barChartHeight - yScale(d.tripdurationS))
      .style("fill", 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 2)
      .on("mouseover", (event, d) => {
          d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .style('fill', 'red');
          d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .filter("circle")
              .attr('r', '10')
              .raise();
      })
      .on("mouseout", (event, d) => {
          d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .style('fill', 'steelblue');
          d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .filter("circle")
              .attr('r', '5')
              .lower();
      });
}