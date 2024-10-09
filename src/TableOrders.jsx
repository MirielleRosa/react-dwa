import TableOrdersLine from "./TableOrdersLine";

const TableOrders = ({ items }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Data/Hora</th>
                    <th>Valor Total</th>
                    <th>Estado</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map(o => <TableOrdersLine item={o} key={o.id} />)}
            </tbody>
        </table>
    )
}

export default TableOrders;