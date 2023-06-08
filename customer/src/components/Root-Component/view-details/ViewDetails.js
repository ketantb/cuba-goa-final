import React, { useEffect, useState } from 'react'
import './ViewDetails.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from '../../../helpers/axios';
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react'
import { FaUser } from 'react-icons/fa';
import { TiUser } from 'react-icons/ti';
import Images from './Images';
import RoomCard from './RoomCard/RoomCard/RoomCard';
import Reviews from './reviews/Reviews';

const ViewDetails = () => {
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [])
  // eslint-disable-next-line


  const [resort, setResort] = useState({})
  const [imgArr, setImgArr] = useState([])
  const [roomArr, setRoomArr] = useState([])
  const [cart, setCart] = useState([])
  const [reviews, setReviews] = useState([])
  const [msg, setMsg] = useState('')
  // eslint-disable-next-line
  const [roomstatus, setroomstatus] = useState(false)
  const [activeBtn, setActiveBtn] = useState(true)
  const [price, setPrice] = useState('')


  // eslint-disable-next-line
  const { resortname, id } = useParams()



  //GET PROPERTY DETAILS
  const getProperty = async () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    try {
      const response = await axios.get(`/resort-details/${id}`)
      // console.log(response.data.resortData[0].rooms)
      setResort(response.data.resortData[0])
      setRoomArr(response.data.resortData[0].rooms)
      setImgArr(response.data.resortData[0].rooms[0].imgUrl);


      (dayOfWeek === 0 || dayOfWeek === 6) ? (setPrice('weekendPrice')) : (setPrice('weekdayPrice'))

    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getProperty()


    // eslint-disable-next-line
  }, [id])





  return (
    <>


      <div className='view-details-wrapper'>
        <Images images={imgArr} interval={1800} />

        <div className='resort-name'>
          <h2 >{resortname}</h2>
        </div>

        {/* section1 */}
        {/* section1 ends*/}


        <div className='section2'>
          <div className='property-info'>
            {/* <div>
              {
                [...Array(5)].map((star, index) => {
                  return (
                    <FaStar size={20} style={{ color: 'orange' }} key={index + 1} />
                  )
                })
              }
            </div> */}
            <p >{resort.resortDescription}</p>
          </div>

        </div>

        {/* <RoomCard resortId={id} resortname={resortname}
          room={room}
          cart={cart} setCart={setCart}
          roomArr={roomArr} price={price}
          msg={msg} setMsg={setMsg} setroomstatus={setroomstatus}
          activeBtn={activeBtn} setActiveBtn={setActiveBtn}
          /> */}

        <section className='roomTable-container'>
          {/* <div className='roomTable-searchbar'>
            <p>Check-in date</p>
            <p>Check-out date</p>
          </div>
          <div>
            <button>
              Search
            </button>
          </div> */}
          <CTable>
            <CTableHead className='view-details-roomtable-header'>
              <CTableRow>
                <CTableHeaderCell className='cell' scope="col">Room type</CTableHeaderCell>
                <CTableHeaderCell className='cell' scope="col">Sleeps</CTableHeaderCell>
                <CTableHeaderCell className='cell' scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                roomArr?.map((room, idx) => {
                  return (
                    <CTableRow className='view-details-roomtable-row' key={room._id}>
                      <CTableHeaderCell onClick={() => navigate(`/${id}/${room.roomType}/${room.roomId}/details`)}
                        className='cell' scope="row" style={{color: '#3376b0', fontWeight: '700'}}>
                        {<p>{room.roomType}</p>}
                        {/* {<p style={{color: 'black', fontsize: '12px'}}>{room.seaView ? "with sea view" : null}</p>} */}
                      </CTableHeaderCell>
                      <CTableDataCell className='cell'>
                        <span><FaUser /> × <span>{room.adultCapacity}</span></span>
                        <span style={{ marginLeft: '15px' }}><TiUser /> × <span>{room.childrenCapacity}</span></span>
                      </CTableDataCell>
                      <CTableDataCell className='cell'>
                        <button className='show-prices-btn' onClick={() => navigate(`/${resortname}/${id}/rooms-table`)}>
                          Show prices
                        </button>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              }
            </CTableBody>
          </CTable>
        </section>



        {/* <div className='booking-setion section3' id='booking-section' >
          <h3 data-aos="zoom-in" data-aos-delay='20' style={{ fontFamily: 'Geomainist' }}>Choose Your Room</h3>
          <div className='booking-wrapper'>
            <div className='room-card-wrapper'>
              {roomArr.map((room, i) => {
                return (
                  <RoomCard resortId={id} resortname={resortname}
                    room={room}
                    cart={cart} setCart={setCart}
                    roomArr={roomArr} price={price}
                    msg={msg} setMsg={setMsg} setroomstatus={setroomstatus}
                    activeBtn={activeBtn} setActiveBtn={setActiveBtn}
                    key={i + 1} />
                )
              })}
            </div>

          </div>
        </div> */}
        {/* section3 booking section ends */}


        <Reviews reviews={reviews} setReviews={setReviews} id={id} />
      </div>
    </>
  )
}

export default ViewDetails
