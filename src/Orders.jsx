import { useEffect, useState } from "react";
import axios from "axios";
import TableOrders from "./TableOrders";
import NoOrders from "./NoOrders";
import ModalConfirm from "./ModalConfirm";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderState, setOrderState] = useState("pendente");

    const loadOrders = (state) => {
        const ordersApi = `http://127.0.0.1:8000/admin/obter_pedidos_por_estado/${state}`;
        axios.get(ordersApi)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        loadOrders(orderState);
    }, [orderState]);

    // const handleModalCancelClick = () => {

    // }

    return (
        <>
            <div className="form-floating my-3">
                <select id="orderState" value={orderState} onChange={(event) => setOrderState(event.target.value)} className="form-control">
                    <option value="carrinho">Carrinho</option>
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago</option>
                    <option value="faturado">Faturado</option>
                    <option value="separado">Separado</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregue">Entregue</option>
                    <option value="cancelado">Cancelado</option>
                </select>
                <label htmlFor="orderState" className="form-label">
                    Estado do Pedido:
                </label>
            </div>            
            {orders.length > 0 ?
                <>
                    <ModalConfirm modalId="modalCancelOrder" question="Deseja realmente cancelar o pedido?" />
                    <TableOrders items={orders} />
                </> :
                <NoOrders state={orderState} />}
        </>
    );
}

export default Orders;