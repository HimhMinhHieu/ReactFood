import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import Moment from "react-moment";

const Receipt = () => {
    const[receipt, setReceipt] = useState(null);
    useEffect(() => {
        const loadReceipt = async () => {
            let {data} = await Apis.get(endpoints['receipt']);
            setReceipt(data);
        }
        loadReceipt();
    }, [])

    if(receipt === null)
        return <MySpinner />

    return <>
        <h1 className="text-center text-info mt-2">HÓA ĐƠN</h1>
        
        <Table striped bordered hover className="mt-3">
            <tbody>
                <tr>
                    <td>ID</td>
                    <td>{receipt.id}</td>
                </tr>

                <tr>
                    <td>Người Thanh Toán</td>
                    <td>{receipt.idNguoiDung.firstName}</td>
                </tr>

                <tr>
                    <td>Cửa Hàng</td>
                    <td>{receipt.idCuaHang.name}</td>
                </tr>

                <tr>
                    <td>Giá Vận Chuyển</td>
                    <td>{receipt.idCuaHang.giaVanChuyen}</td>
                </tr>

                <tr>
                    <td>Tổng tiền(Không tính giá vận chuyển)</td>
                    <td>{receipt.tongTien}</td>
                </tr>

                <tr>
                    <td>Ngày Thanh Toán</td>
                    <td><Moment format="DD/MM/YYYY">{receipt.createdDate}</Moment></td>
                </tr>
            </tbody>
        </Table>
    </>
}

export default Receipt;