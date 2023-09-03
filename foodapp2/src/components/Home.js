import { useEffect, useState } from "react";
import MySpinner from "../layout/MySpinner";
import { Alert, Button, Card, Carousel, Col, Image, Row, Tab, Tabs } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
    const [categories, setCategories] = useState(null);
    const [catestores, setCatestores] = useState(null);
    const [stores, setStores] = useState(null);
    const [q] = useSearchParams();
    
    useEffect(() => {
        const loadStores = async () => {
            try {
                let e = endpoints['stores'];

                let catestoreId = q.get("catestoreId");
                if (catestoreId !== null && catestoreId !== "") {
                    e = `${e}?catestoreId=${catestoreId}`;
                } else {
                    let kw = q.get("kw");
                    if (kw !== null && kw !== "") 
                        e = `${e}?kw=${kw}`;
                }

                let res = await Apis.get(e);
                setStores(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadStores();
    },[q]);

    const [foods, setFoods] = useState(null);
    const [a] = useSearchParams();

    useEffect(() => {
        const loadFoods = async () => {
            try {
                let e = endpoints['foods'];

                let cateId = a.get("cateId");
                if (cateId !== null && cateId !== "") {
                    e = `${e}?cateId=${cateId}`;
                } else {
                    let kw = a.get("kw");
                    if (kw !== null && kw !== "") 
                        e = `${e}?kw=${kw}`;
                }

                let res = await Apis.get(e);
                setFoods(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadFoods();
    }, [a]);

    useEffect(() => {
        const loadCates = async () => {
            let res = await Apis.get(endpoints['categories'])
            // let res = await fetch("http://localhost:8080/foodapp/api/categories/");
            // let data = await res.json();
            setCategories(res.data);
        }

        loadCates();
    }, []);

    useEffect(() => {
        const loadCatestores = async () => {
            let res = await Apis.get(endpoints['catestores'])

            setCatestores(res.data);
        }

        loadCatestores();
    }, [])

    if (stores === null)
        return <MySpinner />

    if (stores.length === 0)
        return <Alert variant="info" className="mt-5">Không có cửa hàng nào!</Alert>

    if (categories === null)
        return <MySpinner />;

    if (catestores === null)
        return <MySpinner />;

    if (catestores.length === 0)
        return <Alert variant="info" className="mt-5">Không có cửa hàng nào!</Alert>;
            

    if (foods === null)
        return <MySpinner />;

    if (foods.length === 0)
        return <Alert variant="info" className="mt-5">Không có sản phẩm nào!</Alert>;
    
    return (
        <Row>
            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3 mt-2"
                fill
            >
                
                <Tab eventKey="Food" title="Lọc theo thức ăn">
                    <Row>
                        <Row style={{textAlign:"center"}}>
                            <Col>
                            <Link style={{marginRight:'1rem'}} to="/" className="btn btn-outline-dark" >Tất cả</Link>
                        {categories.map(c => {
                            let h = `/?cateId=${c.id}`;
                            return <Link style={{marginRight:'1rem'}} to={h} className="btn btn-outline-dark" key={c.id}>{c.name}</Link>
                        })} 
                            </Col>
                            
                        </Row>
                        {foods.map(f => {
                        return <Col xs={12} md={3} className="mt-1">
                                
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
                <Tab eventKey="Store" title="Lọc theo cửa hàng">
                    <Row>
                        <Row style={{textAlign:"center"}}>
                            <Col>
                            <Link style={{marginRight:'1rem'}} to="/" className="btn btn-outline-dark" >Tất cả</Link>
                        {catestores.map(c => {
                            let h = `/?catestoreId=${c.id}`;
                            return <Link style={{marginRight:'1rem'}} to={h} className="btn btn-outline-dark" key={c.id}>{c.name}</Link>
                        })} 
                            </Col>
                            
                        </Row>
                        {stores.map(s =>{
                            let url = `/stores/${s.id}`
                            return <Col xs={12} md={3} className="mt-1">
                                <Card style={{ width: '20rem' }}>
                                    <Card.Img src={s.image} fluid rounded style={{ width: '20rem', height: '180px' }} />
                                    <Card.Body>
                                        <Card.Title>{s.name}</Card.Title>
                                        <Card.Text>{s.diaChi}</Card.Text>
                                        <Link to={url} className="btn btn-info" variant="primary">Xem chi tiết</Link>
                                    </Card.Body>
                                </Card>     
                            </Col>
                             
                        })}
                    </Row>
                </Tab>
            </Tabs>
            
            
        </Row>
    )
}

export default Home;