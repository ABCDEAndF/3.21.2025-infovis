
import * as d3 from "d3";

export let drawBarChart = (barChartLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {
  // Task 7: Draw the bars with mouse events
  barChartLayer.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", d => `bar ${d.station.replace(/[^a-zA-Z]/g, "")}`) 
      .attr("x", d => xScale(d.station))
      .attr("y", d => yScale(d.tripdurationS))
      .attr("width", xScale.bandwidth())
      .attr("height", d => barChartHeight - yScale(d.tripdurationS))
      .attr("fill", "steelblue")
      .on("mouseover", function(event, d) {
          d3.select(this)
              .attr("fill", "red");


              const stationClass = d.station.replace(/[^a-zA-Z]/g, "");
            d3.selectAll(`.point.${stationClass}`)
                .attr("r", 10)
                .style("fill", "red")
                .raise();
      })      
      .on("mouseout", function(event, d) {
          d3.select(this)
              .attr("fill", "steelblue");
              const stationClass = d.station.replace(/[^a-zA-Z]/g, "");
            d3.selectAll(`.point.${stationClass}`)
                .attr("r", 5)
                .style("fill", "steelblue");
        });
      
};

    