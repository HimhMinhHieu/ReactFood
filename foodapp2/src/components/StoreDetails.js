import { useEffect, useState } from "react";
import { authApi, endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { Col, Image, Row, Table } from "react-bootstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const StoreDetails = () => {
    const [storedetails, setStoreDetails] = useState(null);
    
    
    const loadStoreDetails = async () => {
        let res = await authApi().get(endpoints['store_details']);
        setStoreDetails(res.data);
    }


    useEffect(() => {
        loadStoreDetails();
    }, [])

    if(storedetails === null)
        return <MySpinner />;
    
        let url = `/stores/manager/${storedetails.id}`;
        let urlChart = `/chart/${storedetails.id}`;
    return <>
    
        <h1 className="text-center text-info mt-2">Thông tin cửa hàng</h1>
        <div style={{textAlign:'center'}}><Image src={storedetails.image} fluid rounded thumbnail style={{ width: '50%'}} /></div>
        <Table striped bordered hover className="mt-3">
            <tbody>
                <tr>
                    <td>Tên Cửa Hàng</td>
                    <td>{storedetails.name}</td>
                </tr>

                <tr>
                    <td>Địa Chỉ</td>
                    <td>{storedetails.diaChi}</td>
                </tr>

                <tr>
                    <td>Ngày mở bán</td>
                    <td><Moment format="DD/MM/YYYY">{storedetails.createdDate}</Moment></td>
                </tr>

                <tr>
                    <td>Chủ Sở Hữu</td>
                    <td>{storedetails.idNguoiDung.firstName}</td>
                </tr>

                <tr>
                    <td>Loại Cửa Hàng</td>
                    <td>{storedetails.idLoaiCuaHang.name}</td>
                </tr>
            </tbody>
        </Table>
        <Row>
            <Col>
                <Link style={{marginRight: '81%', marginLeft: '1rem'}} to="/" className="btn btn-danger">Quay Trở Về</Link>
            
                <Link to={url} className="btn btn-info">Quản Lý Cửa Hàng</Link>

                <Link to={urlChart} className="btn btn-secondary">Thống Kê</Link>
            </Col>
        </Row>
    </>
}

export default StoreDetails;