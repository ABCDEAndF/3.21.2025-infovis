import React from 'react'
import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.css'

import { Row, Col, Container} from 'react-bootstrap'
import ScatterPlot from '../components/ScatterPlot'
import BarChart from '../components/BarChart'

const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv'

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(()=>{
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, [csvPath]);
    return dataAll;
}

const Charts = () => {
    const [month, setMonth] = React.useState('4');
    const dataAll = useData(csvUrl);

    if (!dataAll) {
        return <pre>Loading...</pre>;
    }
    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 60 }; // 增加左侧边距
    const innerHeightScatter = HEIGHT - margin.top - margin.bottom;
    const innerHeightBar = HEIGHT - margin.top - margin.bottom - 120;
    const innerWidth = WIDTH - margin.left - margin.right;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = dataAll.filter(d => { 
        return d.month === MONTH[month] 
    });

    const station = data.map(d => d.station);
    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)])
        .range([0, innerWidth])
        .nice();
    const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)])
        .range([innerHeightScatter, 0])
        .nice();

    const xScaleBar = d3.scaleBand()
        .domain(station)
        .range([0, innerWidth]) // 修正 range
        .padding(0.1);

    const yScaleBar = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.tripdurationS)]) // 修正为 tripdurationS
        .range([innerHeightBar, 0])
        .nice();

    const maxTripDuration = d3.max(data, d => d.tripdurationS);

    const changeHandler = (event) => {
        setMonth(event.target.value);
    };

    return (
        <Container>
            <Row>
                <Col lg={3} md={2}>
                    <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler}/>
                    <input key="monthText" type="text" value={MONTH[month]} readOnly/>
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col>
                    <ScatterPlot svgWidth={WIDTH} svgHeight={HEIGHT} marginLeft={margin.left} marginTop={margin.top} data={data} xScale={xScaleScatter} 
                        yScale={yScaleScatter} />
                </Col>
                <Col>
                    <BarChart svgWidth={WIDTH} svgHeight={HEIGHT} marginLeft={margin.left} marginTop={margin.bottom} data={data} xScale={xScaleBar} 
                        yScale={yScaleBar} maxTripDuration={maxTripDuration} />
                </Col>
            </Row>
        </Container>
    )   
}

export default Charts