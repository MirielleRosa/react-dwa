import React from 'react'

const FormTextArea = ({ field, onChange, label, value, error, autofocus=false }) => {
  return (
    <>
    <div className='form-floating'>
      <textarea className="form-control ${error ? 'is-invalid' : 'is-valid'}"  id={field} name={field} onChange={onChange} placeholder=" " autoFocus={autofocus} style={{height:'3rem'}}>{value ||""}</textarea>
      <label htmlFor={label}>{label}</label>
    </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  )
}

export default FormTextArea