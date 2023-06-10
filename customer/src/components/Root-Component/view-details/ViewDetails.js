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
import { TiStarFullOutline } from 'react-icons/ti';
import { AiOutlineCaretRight } from 'react-icons/ai';
import Images from './Images';
import RoomCard from './RoomCard/RoomCard/RoomCard';
import Reviews from './reviews/Reviews';
import ResortVideo from './Resort-Videos/ResortVideo';
import ResortAminities from './ResortAminities/ResortAminities';
import Footer from '../Footer/Footer';

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
  const [hotelType, setHotelType] = useState()


  // eslint-disable-next-line
  const { resortname, id } = useParams()



  //GET PROPERTY DETAILS
  const getProperty = async () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    try {
      const response = await axios.get(`/resort-details/${id}`)
      console.log('response => ', response)
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
    console.log('useEffect => ', resort.type)
    // eslint-disable-next-line
  }, [id])

  //get reviews of property

  const [reviewsStatus, setReviewsStatus] = useState(false)
  const getRatingList = async () => {
    // console.log('id=>', id)
    const response = await axios.get(`/get-reviews/${id}`)
    console.log('reviews', response.data.list)
    if (response.data.list.length <= 0) {
      setReviewsStatus(false)
    }
    else {
      setReviewsStatus(true)
      setReviews(response.data.list)

    }
  }

  useEffect(() => {
    getRatingList();
    //eslint-disable-next-line
  }, [])

  return (
    <>


      <div className='view-details-wrapper'>

        {resort.type == 'restaurant' ?
          <img style={{ width: '100%', height: '100vh' }} src={resort.resortImgURL} alt={resort.resortName} />
          :
          <ResortVideo resortname={resortname} />}

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

        {resort.type != 'restaurant' ?
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
            <CTable responsive>
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
                          className='cell' scope="row" style={{ color: '#3376b0', fontWeight: '700', borderRight: '1px solid #3376b0' }}>
                          <p><span><AiOutlineCaretRight style={{ marginRight: '5px', color: 'goldenrod' }} /></span>{room.roomType}</p>
                          {/* {<p style={{color: 'black', fontsize: '12px'}}>{room.seaView ? "with sea view" : null}</p>} */}
                        </CTableHeaderCell>
                        <CTableDataCell className='cell' style={{ borderRight: '1px solid #3376b0' }}>
                          <span><FaUser style={{ color: '#3376b0' }} /> × <span>{room.adultCapacity}</span></span>
                          <span style={{ marginLeft: '15px' }}><TiUser style={{ color: '#3376b0' }} /> × <span>{room.childrenCapacity}</span></span>
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
          : null}



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



        <ResortAminities resortname={resortname} />



        {/* <Reviews reviews={reviews} setReviews={setReviews} id={id} /> */}
        <div style={{ width: '85%', margin: 'auto', marginTop: '3rem' }}>
          {reviewsStatus ? (<h5>REVIEWS</h5>) : (null)}</div>
        <div className='review-outer-wrap'>
          {
            reviewsStatus ? (
              <div className='review-inner-wrap'>
                {reviews.map((el, i) => {
                  return (
                    <div className='review-card'>
                      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h5>{el.name}</h5>
                        <div>
                          {[...Array(5)].map(() => {
                            return (
                              <TiStarFullOutline style={{ color: 'orange' }} />
                            )
                          })}
                        </div>
                      </section>
                      <section className='contentsection'>
                        <p style={{ wordBreak: 'break-word', textAlign: 'justify' }}>
                          {el.additionalComments}
                        </p>
                      </section>
                    </div>
                  )
                })}


              </div>
            ) : (null)
          }

        </div>

      </div>
      <Footer />
    </>
  )
}

export default ViewDetails
