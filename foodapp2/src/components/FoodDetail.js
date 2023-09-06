import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MySpinner from "../layout/MySpinner";
import { Col, Image, Row, Tab, Table, Tabs } from "react-bootstrap";
import Moment from "react-moment";
import Apis, { endpoints } from "../configs/Apis";

const FoodDetail = () => {
    const [food, setFood] = useState(null);
    const { foodId } = useParams();

    useEffect(() => {
        const loadFood = async () => {
            let { data } = await Apis.get(endpoints['foods_details'](foodId));
            setFood(data);
        }
        loadFood();
    }, []);

    if (food === null)
        return <MySpinner />

    return <>
        <Row>
            <h1 className="text-center text-info mt-2">Chi Tiết Sản Phẩm ({foodId})</h1>
            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3 mt-2"
                fill
            >

                <Tab eventKey="Food" title="Chi Tiết">
                    <div style={{ textAlign: 'center' }}><Image src={food.image} fluid roundedCircle thumbnail style={{ width: '18rem' }} /></div>
                    <Table striped bordered hover className="mt-3">
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{food.id}</td>
                            </tr>

                            <tr>
                                <td>Food Name</td>
                                <td>{food.name}</td>
                            </tr>

                            <tr>
                                <td>So Luong</td>
                                <td>{food.soLuong}</td>
                            </tr>

                            <tr>
                                <td>Giá</td>
                                <td>{food.price}</td>
                            </tr>

                            <tr>
                                <td>Created Date</td>
                                <td><Moment format="DD/MM/YYYY">{food.createdDate}</Moment></td>
                            </tr>

                            <tr>
                                <td>Loại</td>
                                <td>{food.idLoai.name}</td>
                            </tr>

                            <tr>
                                <td>Tên Cửa Hàng</td>
                                <td>{food.idCuaHang.name}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Col>
                        <Link to="/" className="btn btn-danger">Quay về</Link>
                    </Col>
                </Tab>
                <Tab eventKey="Store" title="Bình Luận">
                    
                </Tab>
            </Tabs>
            
        </Row>
    </>
}

export default FoodDetail;