import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Apis, { authApi, endpoints } from "../configs/Apis";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";

const AddFood = () => {

    const { sID } = useParams();
    const [food, setFood] = useState({
        "name": "",
        "soLuong": "",
        "price": "",
        "idLoai": "",
        "idCuaHang": ""
    });

    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const image = useRef();
    const nav = useNavigate();
    const addfood = (evt) => {
        evt.preventDefault();

        const process = async () => {
            let form = new FormData();

            for (let field in food)
                form.append(field, food[field]);
            form.append("image", image.current.files[0]);

            setLoading(true)
            let res = await Apis.post(endpoints['add_foods'](sID), form);
            if (res.status === 201) {
                nav("/");
            } else
                setErr("Hệ thống bị lỗi!");
            
        }
        process();
    }

   
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const loadCates = async () => {
            let res = await Apis.get(endpoints['categories'])
            // let res = await fetch("http://localhost:8080/foodapp/api/categories/");
            // let data = await res.json();
            setCategories(res.data);
        }

        loadCates();
    }, []);


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
    if (categories === null)
        return <MySpinner />;
    const change = (evt, field) => {
        // setUser({...user, [field]: evt.target.value})
        setFood(current => {
            return { ...current, [field]: evt.target.value }
        })
    }
    let url = `/stores/manager/${storedetails.id}`;
    return <>
        <h1 className="text-center text-info mt-2">THÊM MENU</h1>

        {err === null ? "" : <Alert variant="danger">{err}</Alert>}

        <Form onSubmit={addfood}>
            <Form.Group className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control type="text" onChange={(e) => change(e, "name")} placeholder="Tên Sản Phẩm" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Số Lượng</Form.Label>
                <Form.Control type="text" onChange={(e) => change(e, "soLuong")} placeholder="Số Lượng" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control type="text" onChange={(e) => change(e, "price")} placeholder="Giá" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Loại Cửa Hàng</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => change(e, "idLoai")} >
                    {categories.map(c => {
                        return <option value={c.id}>{c.name}</option>
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tên cửa hàng</Form.Label>
                 
                 <Form.Select aria-label="Default select example" onChange={(e) => change(e, "idCuaHang")} disabled>
                    <option value={storedetails.id}>{storedetails.name}</option>
                </Form.Select> 
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control type="file" ref={image} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Row>
                    <Col>
                        <Link to={url} className="btn btn-danger" style={{ marginRight: '7%', marginLeft: '40rem' }}>Quay về</Link>
                        {loading === true ? <MySpinner /> : <Button variant="info" type="submit">Thêm sản phẩm</Button>}
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    </>
}

export default AddFood;