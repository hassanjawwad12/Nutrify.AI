import React, { useState } from 'react'
import Table from './Table'

const Other = ({setFormData, formData }) => {
  const isRawMaterial = false; // Define your boolean variable here
  
  return (
    <div className='overflow-y-auto overflow-x-auto w-full'>
      <Table isRawMaterial={isRawMaterial} setFormData={setFormData} formData={formData}/>
      </div>
  )
}

export default Other
