import React from 'react'
import Table from './Table'

const Another = ({setFormData, formData }) => {
  const isRawMaterial= true;

  return (
    <div className='overflow-y-auto overflow-x-auto w-full'>
      <Table isRawMaterial={isRawMaterial} setFormData={setFormData} formData={formData}/>
    </div>
  )
}

export default Another
