import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MySpinner from "../layout/MySpinner";
import { Button, Col, Form, Image, ListGroup, Row, Tab, Table, Tabs } from "react-bootstrap";
import Moment from "react-moment";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { MyUserContext } from "../App";

const FoodDetail = () => {
    const [food, setFood] = useState(null);
    const { foodId } = useParams();
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState();
    const [star, setStar] = useState();
    const [user,] = useContext(MyUserContext);

    useEffect(() => {
        const loadFood = async () => {
            let { data } = await Apis.get(endpoints['foods_details'](foodId));
            setFood(data);
        }

        const loadComments = async () => {
            let { data } = await Apis.get(endpoints['comments-food'](foodId));
            setComments(data);
        }

        loadFood();
        loadComments();
    }, []);

    const addComment = () => {
        const process = async () => {
            let { data } = await authApi().post(endpoints['add-comment-food'], {
                "noiDung": content,
                "danhGia": star,
                "idThucAn": foodId
            });

            setComments([...comments, data]);
            
        }

        process();
    }

    if (food === null || comments === null)
        return <MySpinner />

    let url = `/login?next=/foods/${foodId}`;
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
    </>
}

export default FoodDetail;