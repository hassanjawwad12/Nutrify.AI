import React, { useState } from 'react'
import Table from './Table'

const Other = ({setFormData, formData,tabler1 }) => {
  const isRawMaterial = false; 
  return (
    <div className='overflow-y-auto overflow-x-auto w-full'>
      <Table isRawMaterial={isRawMaterial} setFormData={setFormData} formData={formData} tabler1={tabler1}/>
      </div>
  )
}

export default Other
