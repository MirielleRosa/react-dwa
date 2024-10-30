import { NumberFormatter, DateTimeFormatter, CurrencyFormatter, StringFormatter } from './formatters';


const TableUsersLine = ({ item, handleDeleteUser }) => {
    return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{StringFormatter.Capitalize(item.nome)}</td>
            <td>{item.telefone}</td>
            <td>{item.email}</td>
            <td>{item.cpf}</td>
            <td>
                <button className="btn btn-outline-danger btn-sm" title="Excluir Usuário" onClick={() => handleDeleteUser(item.id)}>
                    <i className="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    );
}

export default TableUsersLine;