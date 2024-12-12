import React from 'react'
import Table from './Table'

const Ingredient = ({setFormData, formData,tabler1}) => {
  const isRawMaterial= true;
  
  return (
    <div className='overflow-y-auto overflow-x-auto w-full'>
      <Table isRawMaterial={isRawMaterial} setFormData={setFormData} formData={formData} tabler1={tabler1}/>
    </div>
  )
}

export default Ingredient
