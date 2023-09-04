import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authApi, endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { Col, Image, Row, Tab, Table, Tabs } from "react-bootstrap";

const ManageStore = () => {
    const {storeId} = useParams();
    const [store, setStore] = useState(null);

    useEffect(() => {
        const loadStore = async () => {
            let {data} = await authApi().get(endpoints['store_foods'](storeId));
            setStore(data);
        }

        loadStore();
    }, []);

    const [storedetails, setStoreDetails] = useState(null);
    
    
    const loadStoreDetails = async () => {
        let res = await authApi().get(endpoints['store_details']);
        setStoreDetails(res.data);
    }


    useEffect(() => {
        loadStoreDetails();
    }, [])


    if(store === null)
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
                                            <Link to="/" className="btn btn-danger">Xóa</Link>
                                        </td>
                                    </tr>
                                    </>
                                })} 
                                </tbody>
                            </Table>
                </Col>
                    
                     
                      
                  
            </Tab>
            <Tab eventKey="Store" title="Bình Luận">
                
            </Tab>
        </Tabs>
        
        
        </Row>    
    </>
}

export default ManageStore;