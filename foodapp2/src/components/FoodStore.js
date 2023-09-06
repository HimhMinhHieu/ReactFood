import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Apis, { authApi, endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { Button, Card, Carousel, Col, Form, Image, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import { MyUserContext } from "../App";
import Moment from "react-moment";
import 'moment/locale/vi';

const FoodStore = () => {
    const [user,] = useContext(MyUserContext);
    const { storeId } = useParams();
    const [store, setStore] = useState(null);
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState();
    const [star, setStar] = useState();

    useEffect(() => {
        const loadStore = async () => {
            let { data } = await Apis.get(endpoints['store_foods'](storeId));
            setStore(data);
        }

        const loadComments = async () => {
            let { data } = await Apis.get(endpoints['comments'](storeId));
            setComments(data);
        }

        loadStore();
        loadComments();
    }, []);

    const addComment = () => {
        const process = async () => {
            let { data } = await authApi().post(endpoints['add-comment'], {
                "noiDung": content,
                "danhGia": star,
                "idCuaHang": storeId
            });

            setComments([...comments, data]);
            
        }

        process();
    }

    if (store === null || comments === null)
        return <MySpinner />;
    let url = `/login?next=/stores/${storeId}`;
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

                                        <Button variant="primary" style={{ marginRight: '5.20rem' }}>Xem chi tiết</Button>
                                        <Button variant="danger">Đặt hàng</Button>
                                    </Card.Body>
                                </Card>
                            </Col>

                        })}

                    </Row>
                </Tab>
                <Tab eventKey="Store" title="Bình Luận">
                    <ListGroup>
                        {comments.map(c => <ListGroup.Item id={c.id}>
                            {c.idNguoiDung.firstName} - {c.noiDung} - <Moment locale="vi" fromNow>{c.createdDate}</Moment> - {c.danhGia} &#127775;
                        </ListGroup.Item>)
                        }
                    </ListGroup>

                    <hr />
                    {user===null?<p>Vui lòng <Link to={url}>đăng nhập</Link> để bình luận! </p>:<>
                        <Form.Control as="textarea" aria-label="With textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Nội dung bình luận" />
                        <Form.Select aria-label="Default select example" value={star} onChange={e => setStar(e.target.value)}>
                            <option>Chọn</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Select>
                        <Button onClick={addComment} className="mt-2" variant="info">Bình luận</Button>
                    </>}
                </Tab>
            </Tabs>


        </Row>
    )
}

export default FoodStore;