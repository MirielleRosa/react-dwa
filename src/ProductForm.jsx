const ProductForm = ({ hendleChage, input, errors, isNew }) => {
  return (
    <>
      <div className="row">
        <div className="form-floating">
            <input type="text" className="form-control" id="nome" name="nome" placeholder=" " value={inputs?.value}/>
            <label htmlFor="nome">Nome</label>
            {errors?.nome && <div className="invalid-feedback">{errors.nome}</div>}
        </div>
      </div>
    </>
  )
}

export default ProductForm
