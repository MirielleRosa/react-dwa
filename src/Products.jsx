import { useEffect, useState } from "react";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";
import { NavLink } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    // Função para carregar os produtos
    const loadProducts = () => {
        setLoading(true);
        const productsEndpoint = "admin/obter_produtos";
        api.get(productsEndpoint)
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data); // Inicializa com todos os produtos
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // Função para carregar as categorias
   const loadCategories = () => {
    const categoriesEndpoint = "admin/listar_categorias_ativas";
    api.get(categoriesEndpoint)
        .then((response) => {
            console.log(response.data); // Adicione este log para verificar a resposta
            setCategories(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};


    // Função para excluir um produto
    const deleteProduct = (productId) => {
        setLoading(true);
        api.postForm("admin/excluir_produto", {"id_produto": productId})
            .then(response => {
                if (response.status === 204)
                    loadProducts();
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Função para exibir o modal de confirmação de exclusão
    const handleDeleteProduct = (productId) => {
        setSelectedProductId(productId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteProduct'));
        modal.show();
    }

    // Função para lidar com a mudança da categoria selecionada
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        // Se uma categoria for selecionada, filtra os produtos por categoria
        if (category === '') {
            setFilteredProducts(products); // Se não houver filtro, exibe todos os produtos
        } else {
            setFilteredProducts(products.filter(product => product.categoria_nome === category));
        }
    }

    // Efeito para carregar produtos e categorias
    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    return (
        <>
            <NavLink to="/products/create" className="btn btn-primary my-3">Novo Produto</NavLink>
            
            <div className="my-3">
                <label htmlFor="categoryFilter" className="form-label">Filtrar por Categoria</label>
                <select 
                    id="categoryFilter" 
                    className="form-select" 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                >
                    <option value="">Todas as Categorias</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.nome}>
                            {category.nome}
                        </option>
                    ))}
                </select>
            </div>

            {filteredProducts.length > 0 ? 
                <>
                    <ModalConfirm modalId="modalDeleteProduct" question="Deseja realmente excluir o produto?" confirmAction={() => deleteProduct(selectedProductId)} />
                    <TableProducts items={filteredProducts} handleDeleteProduct={handleDeleteProduct} />
                </> : 
                (!loading && <NoProducts />)
            }
            {loading && <Loading />}
        </>
    );
}

export default Products;
