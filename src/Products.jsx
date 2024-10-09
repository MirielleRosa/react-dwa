import { useEffect, useState } from "react";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";
import Loading from "./loading";
import api from './axiosApi'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = () => {
        setLoading(true);
        const productsEndpoint = "obter_produtos";
        api.get(productsEndpoint)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadProducts();
    }, []);
    
    return (
        <>
        {products.length > 0 ?
            <TableProducts items={products} /> :
            (!loading && <NoProducts />)}
            {loading && <Loading/>}
        </>
    );
}

export default Products;