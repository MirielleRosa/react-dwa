import { useEffect, useState } from "react";
import api from './axiosApi';
import TableUsers from "./TableUsers";
import NoUsers from "./NoUsers";
import ModalConfirm from "./ModalConfirm";
import Loading from "./Loading";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUsers = () => {
        setLoading(true);
        const usersEndpoint = "obter_usuarios";
        api.get(usersEndpoint)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteUser = (userId) => {
        setLoading(true);
        api.post(`excluir_usuario/${userId}`)
            .then(response => {
                if (response.status === 204) {
                    loadUsers(); 
                }
            })
            .catch(error => {
                console.error('Erro ao excluir usuário:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteUser = (userId) => {
        setSelectedUserId(userId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteUser'));
        modal.show();
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
            {loading && <Loading />}
            {!loading && users.length > 0 ? (
                <>
                    <ModalConfirm 
                        modalId="modalDeleteUser" 
                        question="Deseja realmente excluir este usuário?" 
                        confirmAction={() => deleteUser(selectedUserId)} 
                    />
                    <TableUsers 
                        items={users} 
                        handleDeleteUser={handleDeleteUser} 
                    />
                </>
            ) : (!loading && <NoUsers />)}
        </>
    );
};

export default Users;