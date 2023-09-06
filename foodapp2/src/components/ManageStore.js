import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Apis, { authApi, endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { Button, Col, Form, Image, ListGroup, Row, Tab, Table, Tabs } from "react-bootstrap";
import Moment from "react-moment";
import 'moment/locale/vi';

const ManageStore = () => {
    
    const {storeId} = useParams();
    const [store, setStore] = useState(null);
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState();
    const [star, setStar] = useState();
    const [storedetails, setStoreDetails] = useState(null);

    useEffect(() => {
        const loadStore = async () => {
            let {data} = await authApi().get(endpoints['store_foods'](storeId));
            setStore(data);
        }

        const loadComments = async () => {
            let {data} = await Apis.get(endpoints['comments'](storeId));
            setComments(data);
        }

        loadStore();
        loadComments();
    }, []);

    
    
    const addComment = () => {
        const process = async () => {
            let {data} = await authApi().post(endpoints['add-comment'], {
                "noiDung": content,
                "danhGia": star,
                "idCuaHang": storeId
            });

            setComments([...comments, data]);
        }

        process();
    }
    
    const loadStoreDetails = async () => {
        let res = await authApi().get(endpoints['store_details']);
        setStoreDetails(res.data);
    }
    useEffect(() => {
        loadStoreDetails();
    }, [])


    if(store === null || comments === null)
        return <MySpinner />;

    if(storedetails === null)
        return <MySpinner />;


    
    return <>
        <Row>
            <h1 className="text-center text-info mt-2">Quản Lý Cửa Hàng</h1>
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3 mt-2"
            fill
        >
            
            <Tab eventKey="Food" title="Thức Ăn">
                <Link to="/stores/manager/addfood" className="btn btn-info" style={{marginLeft: '1rem'}} >Thêm thức ăn</Link>
                 <Col className="mt-1" >
                            <Table striped hover className="mt-3">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Số Lượng</th>
                                        <th>Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {store.map(f => {
                                    let urlfood = `/stores/foods/updatefood/${f.id}`
                                    return <>
                                    <tr >
                                        <td style={{ width: '15rem'}}>
                                            <Image src={f.image} rounded style={{ width: '15rem'}} />
                                        </td>
                                        <td>{f.id}</td>
                                        <td>{f.name}</td>
                                        <td>{f.soLuong}</td>
                                        <td>{f.price}</td>
                                        <td>
                                            <Link to={urlfood} className="btn btn-primary">Cập nhật</Link>
                                        </td>
                                        <td>
                                            <Link to="/"  className="btn btn-danger">Xóa</Link>
                                        </td>
                                    </tr>
                                    </>
                                })} 
                                </tbody>
                            </Table>
                </Col>
                    
                     
                      
                  
            </Tab>
            <Tab eventKey="Store" title="Bình Luận">
                <ListGroup>
                    {comments.map(c => <ListGroup.Item id={c.id}>
                                {c.idNguoiDung.firstName} - {c.noiDung} - <Moment locale="vi" fromNow>{c.createdDate}</Moment> - {c.danhGia} &#127775; - {c.idNguoiDung.vaiTro}
                            </ListGroup.Item>)
                    }
                </ListGroup>
                
                <hr />
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
            </Tab>
        </Tabs>
        
        
        </Row>    
    </>
}

export default ManageStore;