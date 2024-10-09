import { useEffect, useState } from "react";
import api from './axiosApi'
import TableOrders from "./TableOrders";
import NoOrders from "./NoOrders";
import ModalConfirm from "./ModalConfirm";
import Loading from "./loading";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderState, setOrderState] = useState("pendente");
    const [loading, setLoading] = useState(true);

    const loadOrders = (state) => {
        setLoading(true);
        const ordersEndpoint = `obter_pedidos_por_estado/${state}`;
        api.get(ordersEndpoint)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadOrders(orderState);
    }, [orderState]);

    return (
        <>
        {}
          {  (!loading && <div className="form-floating my-3">
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
            </div> )}            
            {orders.length > 0 ?
                <>
                    <ModalConfirm modalId="modalCancelOrder" question="Deseja realmente cancelar o pedido?" />
                    <TableOrders items={orders} />
                </> :
                (!loading && <NoOrders state={orderState} />)}
                {loading && <Loading/>}
        </>
    );
}

export default Orders;