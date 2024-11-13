import { useNavigate, useParams } from 'react-router-dom'; 
import ProductForm from './ProductForm';
import FormButtons from './FormButtons';
import { useEffect, useState } from 'react';
 
const EditProducts = () => { 
    const [inputs, setInputs] = useState({}); 
    const [errors, setErrors] = useState({}); 
    const [modal, setModal] = useState(undefined); 
    const navigate = useNavigate(); 
 
    const idProduto = useParams().id; 
    if (!idProduto) { 
        navigate("/listagem"); 
    } 

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleChange(event) {
        event.preventDefault();
    }

    useEffect(() => {
        setInputs({...inputs, id: idProduto});
        loadProductsById(idProduto);
    }, {idProduto});

    return ( 
        <>
            <div className="d-flex justify-content-between align-itms-center">
                <h1>Alteração de Produto</h1>
            </div>
            <form onSubmit={handleSubmit} novalidate autoComplete='off'>
                <ProductForm handleChange={handleChange} input={inputs} errors={errors} isNew={false} />
                <FormButtons cancelTarget="/products" />
            </form>
        </> 
    ); 
} 
 
export default EditProducts;