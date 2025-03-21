'use client';

import { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { drawBarChart } from "./drawBarChart";

function BarChart(props) {
    const { svgWidth, svgHeight, marginLeft, marginTop, data, xScale, yScale, maxTripDuration } = props;

    const d3Selection = useRef();
        
    useEffect(() => {
        const svg = d3.select(d3Selection.current);
        let width = svgWidth - marginLeft;
        let height = svgHeight - marginTop;

        const xAxis_bar = d3.axisBottom(xScale).tickSizeOuter(0);
        const tickValues = d3.range(0, maxTripDuration + 1, maxTripDuration / 5);
        const yAxis_bar = d3.axisLeft(yScale).tickValues(tickValues).tickFormat(d3.format("d"));

        d3.selectAll('.bar').remove();
        d3.selectAll('.x-axis-label').remove();
        
        let barChart = svg.append("g")
            .attr("transform", "translate(" + marginLeft + "," + marginTop + ")");

        barChart.append('g')
            .attr("transform", "translate(" + 0 + "," + height + ")")
            .attr('class', 'x-axis')
            .call(xAxis_bar)
            .selectAll('text')
            .attr('class', 'x-axis-label')
            .style('text-anchor', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '.015em')
            .attr('transform', 'rotate(-65)')
            .text((d, i) => (i % 3 === 0 ? d : ''));

        barChart.append('g')
            .attr('class', 'y-axis')
            .call(yAxis_bar);

        barChart.append("g")
            .attr("transform", `translate(-40, ${height/2}) rotate(-90)`)
            .append("text")
            .style("text-anchor", "middle")
            .text("Bikers start from");
        
        drawBarChart(barChart, data, xScale, yScale, width, height);
        
    }, [data, marginLeft, marginTop, svgHeight, svgWidth, xScale, yScale, maxTripDuration]);

    return <svg width={svgWidth} height={svgHeight} ref={d3Selection}></svg>;
}

export default BarChart;