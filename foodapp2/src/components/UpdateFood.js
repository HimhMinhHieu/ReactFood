import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { Alert, Button, Col, Form, Image, Row } from "react-bootstrap";

const UpdateFood = () => {
    const {foodId} = useParams();
    const [food, setFood] = useState(null);
    const [categories, setCategories] = useState(null);
    const [foodUpdate, setFoodUpdate] = useState({
        "name": "",
        "soLuong": "",
        "price": "",
        "idLoai": "",
        "idCuaHang": ""
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const file = useRef();
    const nav = useNavigate();


    useEffect(() => {
        const loadFood = async () => {
            let {data} = await Apis.get(endpoints["foods_details"](foodId));
            setFood(data);
        }

        const loadCates = async () => {
            let res = await Apis.get(endpoints['categories'])
            // let res = await fetch("http://localhost:8080/foodapp/api/categories/");
            // let data = await res.json();
            setCategories(res.data);
        }

        loadFood();
        loadCates();
    }, []);


    const updatefood = (evt) => {
        evt.preventDefault();

        const process = async () => {
            let form = new FormData();
            
            for (let field in foodUpdate)
                form.append(field, foodUpdate[field]);
            
            
            form.append("file", file.current.files[0]);
            
            
            setLoading(true)
            let res = await Apis.post(endpoints['update_foods'](foodId), form);
            if (res.status === 200) {
                nav("/");
            } else
                setErr("Hệ thống bị lỗi!");
            
        }
        process();
    }

    const change = (evt, field) => {
        // setUser({...user, [field]: evt.target.value})
        setFoodUpdate(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    if(food === null)
        return <MySpinner />

    return <>
        <h1 className="text-center text-info mt-2">CẬP NHẬT</h1>

        {err === null ? "" : <Alert variant="danger">{err}</Alert>}

        <Form onSubmit={updatefood}>
            <Form.Group className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control type="text" defaultValue={food.name} placeholder="Tên Sản Phẩm" onMouseMove={(e) => change(e, "name")} onChange={(e) => change(e, "name")} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Số Lượng</Form.Label>
                <Form.Control type="text" defaultValue={food.soLuong} placeholder="Số Lượng" onMouseMove={(e) => change(e, "soLuong")} onChange={(e) => change(e, "soLuong")} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control type="text" defaultValue={food.price} placeholder="Giá" onMouseMove={(e) => change(e, "price")} onChange={(e) => change(e, "price")} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Loại Cửa Hàng</Form.Label>
                <Form.Select aria-label="Default select example" onMouseMove={(e) => change(e, "idLoai")} onChange={(e) => change(e, "idLoai")}>
                        
                        {categories.map(c => {
                           return <>
                                {food.idLoai.id === c.id ?
                                    <option value={c.id} selected>{c.name}</option> :
                                    <option value={c.id}>{c.name}</option>
                                }
                            </> 
                        })} 
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tên Cửa Hàng</Form.Label>
                 <Form.Select aria-label="Default select example"  onMouseMove={(e) => change(e, "idCuaHang")} onChange={(e) => change(e, "idCuaHang")}>
                    <option value={food.idCuaHang.id}>{food.idCuaHang.name}</option>
                </Form.Select> 
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control type="file" ref={file}/>
            </Form.Group>
            {food.image !== null &&
                <Image src={food.image} style={{width: '10%'}} />
            }
            <Form.Group className="mb-3">
                <Row>
                    <Col>
                        <Link to="/" className="btn btn-danger" style={{ marginRight: '7%', marginLeft: '40rem' }}>Quay về</Link>
                        {loading === true ? <MySpinner /> :<Button variant="info" type="submit">Cập nhật</Button>}
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    </>
}

export default UpdateFood;