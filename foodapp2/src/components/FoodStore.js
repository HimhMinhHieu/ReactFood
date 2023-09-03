import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { Button, Card, Carousel, Col, Image, Row, Tab, Tabs } from "react-bootstrap";

const FoodStore = () => {
    const{storeId} = useParams();
    const[store, setStore] = useState(null);

    useEffect(() => {
        const loadStore = async () => {
            let {data} = await Apis.get(endpoints['store_foods'](storeId));
            setStore(data);
        }

        loadStore();
    }, []);

    if (store === null)
        return <MySpinner />;

    return (
        
        <Row>
            <h1 className="text-center text-info mt-2">Chào mừng bạn tới cửa hàng chúng tôi</h1>
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3 mt-2"
            fill
        >
            
            <Tab eventKey="Food" title="Thức Ăn">
                <Row>
                    
                    {store.map(f => {
                    return <Col xs={12} md={3} className="mt-1" >
                            
                            <Card style={{ width: '20rem' }} >
                                <Carousel data-bs-theme="dark" fade interval={3000}>
                                    <Carousel.Item>
                                        <Image variant="top" src={f.image} rounded fluid style={{ width: '20rem', height: '180px' }} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Image src={f.idCuaHang.image} rounded fluid style={{ width: '20rem', height: '180px' }} />
                                    </Carousel.Item>
                                </Carousel>
                                    <Card.Body>
                                        <Card.Title>{f.name}</Card.Title>
                                        <Card.Text>{f.price} VNĐ</Card.Text>
                                        <Card.Text>{f.idCuaHang.name}</Card.Text>
                                        
                                        <Button variant="primary" style={{marginRight: '5.20rem'}}>Xem chi tiết</Button>
                                        <Button variant="danger">Đặt hàng</Button>
                                    </Card.Body>
                            </Card>     
                        </Col>
                    
                    })}   
                      
                </Row>    
            </Tab>
            <Tab eventKey="Store" title="Bình Luận">
                
            </Tab>
        </Tabs>
        
        
    </Row>    
    )
}

export default FoodStore;