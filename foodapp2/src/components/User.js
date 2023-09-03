import { useEffect, useState } from "react"
import { authApi, endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { Col, Image, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const User = () => {
    const [nguoidung, setNguoiDung] = useState(null);

    const loadUser = async () => {
        let res = await authApi().get(endpoints['current-user']);
        setNguoiDung(res.data);
    }

    useEffect(() => {
        loadUser();
    }, [])

    if (nguoidung === null)
        return <MySpinner />

    return <>
        <h1 className="text-center text-info mt-2">Thông tin tài khoản</h1>
        <div style={{textAlign:'center'}}><Image src={nguoidung.avatar} fluid roundedCircle thumbnail style={{ width: '18rem'}} /></div>
        <Table striped bordered hover className="mt-3">
            <tbody>
                <tr>
                    <td>ID</td>
                    <td>{nguoidung.id}</td>
                </tr>

                <tr>
                    <td>First Name</td>
                    <td>{nguoidung.firstName}</td>
                </tr>

                <tr>
                    <td>Last Name</td>
                    <td>{nguoidung.lastName}</td>
                </tr>

                <tr>
                    <td>Username</td>
                    <td>{nguoidung.taiKhoan}</td>
                </tr>

                <tr>
                    <td>Email</td>
                    <td>{nguoidung.email}</td>
                </tr>

                <tr>
                    <td>Phone</td>
                    <td>{nguoidung.phone}</td>
                </tr>

                <tr>
                    <td>Role</td>
                    <td>{nguoidung.vaiTro}</td>
                </tr>

                <tr>
                    <td>Active</td>
                        {nguoidung.active === true?<td>Hoạt động</td>:<td>Bị khóa</td>}
                </tr>
            </tbody>
        </Table>
        <Row>
            <Col>
                <Link style={{marginLeft: '1rem'}} to="/" className="btn btn-danger">Quay Trở Về</Link>
            </Col>
        </Row>
        {/* {user===null?<p>Vui lòng <Link to="/login?next=/cart">đăng nhập</Link> để thanh toán! </p>:<Button variant="info" onClick={pay} className="mt-2 mb-2">Thanh toán</Button>} */}
    </>
}

export default User;