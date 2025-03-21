'use client';

import { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { drawScatterPlot } from "./drawScatterPlot";

export default function ScatterPlot(props) {
    const { svgWidth, svgHeight, marginLeft, marginTop, data, xScale, yScale } = props;
    
    const d3Selection = useRef();
    
    useEffect(() => {
        const svg = d3.select(d3Selection.current);
        let width = svgWidth - marginLeft;
        let height = svgHeight - marginTop;
        const xAxis_spl = d3.axisBottom(xScale).ticks(10);
        const yAxis_spl = d3.axisLeft(yScale).ticks(10);

        let tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("background-color", "white")
            .style("position", "absolute");

        d3.selectAll('.point').remove();
        
        const spl = svg.append("g")
            .attr("id", "scatter-plot")
            .attr("transform", "translate(" + marginLeft + "," + marginTop + ")");

        spl.append('g')
            .attr('transform', `translate(0, ${height-20})`)
            .attr('class', 'x-axis')
            .call(xAxis_spl);

        spl.append("g")
            .attr("transform", `translate(${width-90}, ${height-30})`)
            .append("text")
            .style("text-anchor", "middle")
            .text("Trip duration start from");
        
        spl.append('g')
            .attr('class', 'y-axis')
            .call(yAxis_spl);

        spl.append("g")
            .attr("transform", `translate(-40, ${height/2}) rotate(-90)`)
            .append("text")
            .style("text-anchor", "middle")
            .text("Number of trips");

        drawScatterPlot(spl, data, xScale, yScale, tooltip, width-20, height-20);

    }, [data, marginLeft, marginTop, svgHeight, svgWidth, xScale, yScale]);

    return <svg width={svgWidth} height={svgHeight} ref={d3Selection}></svg>;
}