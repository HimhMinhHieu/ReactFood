import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Button, Col, Form, Row } from "react-bootstrap";
import Moment from "react-moment";

const ChartMonth = () => {
    const [chart, setChart] = useState(null);
    const [q] = useSearchParams();
    const { storeId } = useParams();
    const nav = useNavigate();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    useEffect(() => {
        const loadChart = async () => {
            try {
                let e = endpoints['chart-month'](storeId);

                let m = q.get("m");
                if (m !== null && m !== "") {
                    e = `${e}?m=${m}`;
                }
                let res = await Apis.get(e);

                setChart(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadChart();
    }, [q]);

    const month = [];
    for(let i = 1; i <= 12; i++){
        month.push(i);
    }

    if (chart === null)
        return <MySpinner />

    const data = {
        labels: chart.map(c => c[1]),
        datasets: [
            {
                label: `Cửa Hàng Số ${storeId}`,
                data: chart.map(c => c[0]),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }
    let urlnull = `/chart/${storeId}/?m=`;
    return <>
    
        <Row style={{textAlign: "center"}}>
            
            <Col>
                <Link className="btn btn-outline-dark" to={urlnull} style={{marginRight: '2rem'}}>Tất Cả</Link>
                {month.map(m => {
                    let url = `/chart/${storeId}/?m=${m}`
                  return <Link className="btn btn-outline-dark" to={url} style={{marginRight: '2rem'}}>{m}</Link>
                })}
                
            </Col>
            <Line data={data} options={options} />
        </Row>

    </>
}

export default ChartMonth;