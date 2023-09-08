import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { Alert, Button, Form } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";

const StoreSignup = () => {
    const [request, setRequest] = useState({
        "name": "", 
        "diaChi": "", 
        "idNguoiDung": "",
        "idLoaiCuaHang": "" 
    });
    const [nguoidung, setNguoiDung] = useState(null);
    const [catestores, setCatestores] = useState(null);

    const loadUser = async () => {
        let res = await authApi().get(endpoints['current-user']);
        setNguoiDung(res.data);
    }

    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const file = useRef();
    const nav = useNavigate();

    useEffect(() => {
        const loadCatestores = async () => {
            let res = await Apis.get(endpoints['catestores'])

            setCatestores(res.data);
        }

        loadCatestores();
        loadUser();
    }, [])

    const signup = (evt) => {
        evt.preventDefault();

        const process = async () => {
            let form = new FormData();

            for (let field in request)
                form.append(field, request[field]);

            form.append("file", file.current.files[0]);

            setLoading(true)
            let res = await Apis.post(endpoints['add-store'], form);
            if (res.status === 201) {
                nav("/");
            } else
            setErr("Hệ thống bị lỗi!");
        }
        process();
    }

    const change = (evt, field) => {
        // setUser({...user, [field]: evt.target.value})
        setRequest(current => {
            return {...current, [field]: evt.target.value}
        })
    }

    if (nguoidung === null)
        return <MySpinner />

    if (catestores === null)
        return <MySpinner />;
    
    return <>
        <h1 className="text-center text-info mt-2">ĐĂNG KÝ CỬA HÀNG</h1>

        {err === null?"":<Alert variant="danger">{err}</Alert>}

        <Form onSubmit={signup}> 
            <Form.Group className="mb-3">
                <Form.Label>ID Người Dùng</Form.Label>
                <Form.Control type="text" placeholder="ID Người Dùng" value={nguoidung.id} onMouseEnter={(e) => change(e, "idNguoiDung")} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tên Cửa Hàng</Form.Label>
                <Form.Control type="text" onChange={(e) => change(e, "name")} placeholder="Tên Cửa Hàng" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control type="text" onChange={(e) => change(e, "diaChi")} placeholder="Địa Chỉ" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Loại Cửa Hàng</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => change(e, "idLoaiCuaHang")} >
                    <option>Chọn</option>
                    {catestores.map(c => {
                        return <option value={c.id}>{c.name}</option>
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ảnh</Form.Label>
                <Form.Control type="file" ref={file}  />
            </Form.Group>
            <Form.Group className="mb-3">
                {loading === true?<MySpinner />: <Button variant="info" type="submit">Đăng ký</Button>}
                
            </Form.Group>
        </Form>
    </>
}

export default StoreSignup;