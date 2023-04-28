import './PropertyList.css'
import React from 'react'
import PropertyCard from './Property-Card/PropertyCard'

const PropertyList = ({ currentList, allProperties, getPropertiesData, deleteProperty}) => {
  return (
    <div className='card-wrapper' style={{ display: 'flex', flexWrap: 'wrap' }}>
      {
        currentList.map((property, i) => {
          return (
            <>
              <PropertyCard property={property} key={property._id} allProperties={allProperties} getPropertiesData={getPropertiesData} deleteProperty={deleteProperty}/>
            </>
          )
        })

      }
    </div>
  )
}

export default PropertyList