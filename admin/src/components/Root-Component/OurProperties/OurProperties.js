import './OurProperties.css'
import React, { useState, useEffect } from 'react'
import PropertyList from './PropertyList'
import axios from 'axios'
import Pagination from './Pagination'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PropertiesForm from './PropertiesForm'


const Footer = React.lazy(() => import('../Footer/Footer'))


const OurProperties = () => {
  const [allProperties, setAllProperties] = useState("")
  const [showRoomForm, setRoomForm] = useState(false)


  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(6)
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentList = allProperties.slice(firstPostIndex, lastPostIndex)

  const getPropertiesData = async () => {
    await axios(`https://cuba-goa-server.onrender.com/hotelbook`)
    // await axios(`http://localhost:4001/hotelbook`)
      .then((res) => {
        // console.log(res.data)
        setAllProperties(res.data)
        //    setSelectedVal([res.data[0].resortName, res.data[0]._id])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  console.log("allProperties =>", allProperties)
  useEffect(() => {
    getPropertiesData()
  }, [allProperties.length])


  //delete property functionality =>
  function deleteProperty(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='confirm-delete-alert'>
            <h1>Delete Resort ?</h1>
            <p>Are you sure you want to delete the selected Resort?</p>
            <div>
              <button onClick={onClose}>Cancel</button>
              <button
                onClick={() => {
                  // axios.delete(`http://localhost:4001/hotelbook/${id}`)
                  axios.delete(`https://cuba-goa-server.onrender.com/hotelbook/${id}`)
                    .then((resp) => {
                      console.log(resp)
                      getPropertiesData()
                        .catch((err) => {
                          console.log(err)
                        })
                    })
                  onClose();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      }
    });
  }

  if (!allProperties) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <>
      <main className='our-properties-main'>
        <div className='quba-goa-search'>
          <div className='banner'>
            <h2>The Cuba Goa Properties</h2>
            <h6 style={{ margin: '20px 0' }}>BEACH HUTS, BUNGALOWS & RESORTS</h6>
          </div>
          <div className='properties-to-book'>
            {/* filter section do at veyr last */}
          </div>
          <div className='add-on-btn' style={{marginBottom: '50px'}}>
            <PropertiesForm getPropertiesData={getPropertiesData} />
          </div>
          <div className='our-property-card-container'>
            <section>
              <PropertyList currentList={currentList} allProperties={allProperties} getPropertiesData={getPropertiesData} deleteProperty={deleteProperty}/>
            </section>
            <section style={{marginTop: '50px'}}>
              <Pagination totalPosts={allProperties.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} />
            </section>
          </div>
        </div>
      </main >
      <Footer />
    </>
  )
}

export default OurProperties