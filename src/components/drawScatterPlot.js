import * as d3 from "d3";

export let drawScatterPlot = (scatterPlotLayer, data, xScale, yScale, tooltip, scatterPlotWidth, scatterPlotHeight) => {
    let the_tooltip = d3.select(".tooltip");

    scatterPlotLayer.selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', d => `point ${d.station.replace(/[^a-zA-Z]/g, "")}`)
      .attr('cx', d => xScale(d.tripdurationS))
      .attr('cy', d => yScale(d.tripdurationE))
      .attr('r', "5")
      .style("fill", 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 2)
      .on("mouseover", (event, d) => {
          the_tooltip.style("opacity", 0.9)
              .html(`${d.station}`)
              .style("top", (event.pageY + 5) + "px")
              .style("left", (event.pageX + 5) + "px");

          scatterPlotLayer.append("rect")
              .attr("class", "cover")
              .attr("width", scatterPlotWidth)
              .attr("height", scatterPlotHeight)
              .attr("fill", "yellow")
              .attr("opacity", 0.5);

          d3.select(event.currentTarget)
              .attr('r', '10')
              .style('fill', 'red')
              .raise();

          d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .style('fill', 'red')
              .raise();
      })
      .on('mouseout', (event, d) => {
          the_tooltip.style("opacity", 0)
              .html("");
          d3.select(".cover").remove();
          d3.select(event.currentTarget)
              .attr('r', '5')
              .style('fill', 'steelblue');
          d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .style('fill', 'steelblue')
              .lower();
      });
}