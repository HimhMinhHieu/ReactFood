import { useContext } from "react";
import { Badge, Button, Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MyCartContext, MyUserContext } from "../App";

const Header = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const [cartCounter, ] = useContext(MyCartContext);
    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    // const [storedetails, setStoreDetails] = useState(null);

    // useEffect(() => {
    //         const loadStoreDetails = async () => {
    //             let res = await authApi().get(endpoints['store_details']);
    //             setStoreDetails(res.data);
    //         }
    //     loadStoreDetails(); 
    // },[]);

    // if (storedetails === null)
    //         return <MySpinner />;
    // let url = `/stores/manager/${storedetails.id}`;
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand><Link to="/" className="nav-link">FoodApp</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/" className="nav-link">Trang chủ</Link>
                            <Link to="/goongmap/shop" className="nav-link">Food-App Maps</Link>
                            {/* <NavDropdown title="Danh mục sản phẩm" id="basic-nav-dropdown">
                        {categories.map(c => {
                            let h = `/?cateId=${c.id}`;
                            return <Link to={h} className="dropdown-item" key={c.id}>{c.name}</Link>;
                        })}
                        
                    </NavDropdown> */}
                            {user === null ? <>
                                <Link className="nav-link text-danger" to="/login">Đăng nhập</Link>
                                <Link className="nav-link text-danger" to="/register">Đăng ký</Link>


                            </> : <>
                                <Nav>
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title={`Chào ${user.taiKhoan} !`}
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.ItemText style={{ textAlign: 'center' }}>
                                            <Image src={user.avatar} roundedCircle thumbnail style={{ height: '3rem' }} />
                                        </NavDropdown.ItemText>
                                        <NavDropdown.Item>
                                            <Link className="nav-link text-light" to="/user">Thông tin tài khoản</Link>
                                        </NavDropdown.Item>
                                        {user.vaiTro === "owner" ?
                                            <>
                                                <NavDropdown.Item>
                                                    <Link className="nav-link text-light" to="/stores/details">Thông tin cửa hàng</Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link className="nav-link text-light" to="/">Quản lý cửa hàng</Link>
                                                </NavDropdown.Item>
                                            </> :
                                            <NavDropdown.Item>
                                                <Link className="nav-link text-light" to="/stores/signup">Bắt đầu kinh doanh</Link>
                                            </NavDropdown.Item>
                                        }
                                        <NavDropdown.Divider />
                                        <NavDropdown.ItemText style={{ textAlign: 'center' }}>
                                            <Button variant="secondary" onClick={logout}>
                                                <Link className="nav-link text-light" to="/">Đăng xuất</Link>
                                            </Button>
                                        </NavDropdown.ItemText>
                                    </NavDropdown>

                                </Nav>
                                
                                {/* <Link  className="nav-link text-danger" to="/">Chào {user.taiKhoan} ! <Image src={user.avatar} roundedCircle thumbnail fluid style={{ width: '2.15rem' }} /></Link>
                        <Button variant="secondary" onClick={logout}>Đăng xuất</Button> */}
                            </>}
                            <Link className="nav-link text-danger" to="/cart">&#128722; <Badge bg="danger">{cartCounter}</Badge></Link>
                            {/* {user === null ? <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>:<>
                        <Link to="/login" className="nav-link text-succes">Chào {user.username}!</Link> 
                        <Button variant="secondary" onClick={logout}>Đăng xuất</Button>
                    </>} */}
                        </Nav>
                    </Navbar.Collapse>
                    {/* <Form inline onSubmit={search}>
                <Row>
                    <Col xs="auto">
                        <Form.Control
                        type="text"
                        value={kw}
                        onChange={e => setKw(e.target.value)}
                        placeholder="Nhập từ khóa..."
                        className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit">Tìm</Button>
                    </Col>
                </Row>
            </Form> */}
                </Container>
            </Navbar>
        </>
    )
}
export default Header;