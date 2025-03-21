'use client';

import { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { drawBarChart } from "./drawBarChart";

export default function BarChart(props) {
    const { svgWidth, svgHeight, marginLeft, marginTop, data, xScale, yScale } = props;
    
    const d3Selection = useRef();
    
    useEffect(() => {
        const svg = d3.select(d3Selection.current);
        let width = svgWidth - marginLeft;
        let height = svgHeight - marginTop;
        const xAxis_bar = d3.axisBottom(xScale).tickSizeOuter(0);
        const yAxis_bar = d3.axisLeft(yScale).ticks(5);

        d3.selectAll('.bar').remove(); //remove all the bars before drawing the new bars
      
        const bar = svg.append("g")
            .attr("id", "bar-chart")
            .attr("transform", "translate(" + marginLeft + "," + marginTop + ")");

        bar.append('g')
            .attr('transform', `translate(0, ${height-20})`)
            .attr('class', 'x-axis')
            .call(xAxis_bar);
       
        bar.append('g')
            .attr('class', 'y-axis')
            .call(yAxis_bar);

        drawBarChart(bar, data, xScale, yScale, width-20, height-20);

    }, [data, marginLeft, marginTop, svgHeight, svgWidth, xScale, yScale]);

    return <svg width={svgWidth} height={svgHeight} ref={d3Selection}></svg>;
}