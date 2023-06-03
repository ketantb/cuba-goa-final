import React, { useEffect, useState } from 'react'
import './RoomCard.css'
import { IoIosArrowDropright } from 'react-icons/io';

import { Icon } from 'react-icons-kit'
import { user } from 'react-icons-kit/icomoon/user'
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft'
import { circleRight } from 'react-icons-kit/icomoon/circleRight'
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
// import soldOutIcon from '../../../../assets/out-of-stock.png'
// import axios from '../../../../helpers/axios'
// import { useParams } from 'react-router-dom'


const RoomCard = ({ room, resortId, resortname, price }) => {
  console.log(room)
  const navigate = useNavigate()
  const capacity = Number(room.adultCapacity)


  //HANDLE RESERVE BUTTON
  const handleReserve = (room, roomId, resortId) => {
    navigate(`/booking-summary/${resortname}/${resortId}/${roomId}`)
    // console.log(resortId, roomId)
    // const exixstingRoom = cart.find((item) => item.room.roomId === id)
    // if (exixstingRoom) {
    //   setCart(
    //     cart.map((item) =>
    //       item.room.roomId === id ? { ...item, quantity: item.quantity + 1 } : item
    //     )
    //   )
    // }
    // else {
    //   setCart([...cart, { room, quantity: 1 }])
    // }

  }





  //HANDLE SLIDER
  const [current, setCurrent] = useState(0)
  const prevBtn = () => {
    setCurrent((current === room.imgUrl.length) ? (0) : (current + 1))
  }
  const nextBtn = () => {
    setCurrent((current === 0) ? (room.imgUrl.length - 1) : (current - 1))
  }


  return (
    <div data-aos="fade-up" className='RoomCard' onClick={() => navigate(`/${resortId}/${room.roomType}/${room.roomId}/details`)}>
      <section className='roomcard-r1'>
        <img src={room.imgUrl[current]} alt='' />
      </section>
      <section data-aos="fade-up" className='roomcard-r2' style={{ fontFamily: 'Geomainist' }}>
        <p>{room.seaView ? "WITH SEA VIEW" : null}</p>
      </section>
      <section data-aos="fade-up" className='roomcard-r3' style={{ fontFamily: 'Geomainist' }}>
        <h4>{room.roomType}</h4>
      </section>
      <section data-aos="fade-up" className='roomcard-r4'>
        <span>
          <IoIosArrowDropright />
        </span>
        {room.availableRooms === '0' ? <Button id='sold-out' style={{ backgroundColor: 'red', color: 'white', float: 'right' }}>
          SOLD OUT</Button> : null}
      </section>

      {/* <div className='imgwrap' data-aos='fade-in' data-aos-delay='400'>
        <div className='icon1'><Icon icon={circleLeft} onClick={prevBtn} size={20} /></div>
        <img src={room.imgUrl[current]} alt='roomimage' />
        <div className='icon2'><Icon icon={circleRight} onClick={nextBtn} size={20} /></div>
      </div> */}

      {/* <div className='row1' >
          <div >
            <h5>{room.roomType}</h5>
            rate per night
            <p style={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>
              Rs. {(price === 'weekendPrice') ? (room.weekendPerNightRate) : (room.weekdayPerNightRate)}
            </p>
            <p style={{ display: 'flex' }}>
              Occupancy:
              <span style={{ paddingLeft: '1rem', fontSize: '1.2 rem' }}>{room.adultCapacity}</span>
              <span style={{ display: 'flex', marginLeft: '0.5rem' }}>
                {
                  [...Array(capacity)].map((icon, i) => {
                    return (
                      <Icon icon={user} style={{ marginLeft: '0.2rem' }} key={i + 1} />
                    )
                  })
                }
              </span>
            </p>
          </div>
        </div> */}

      {/* <div className='row2 row'>
          <div>Wifi {room.Wifi ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>AC {room.airconditioned ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Balcony {room.balcony ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Bedside Table {room.bedsideTable ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Breakfast {room.breakfast ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Fitness Center {room.fitnessCenter ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>24 hrs Hot & Cold Shower {room.hotNcoldshower_24hrs ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>House Keeping {room.houseKeeping ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Mosquito Net {room.mosquitonet ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Non-Refundable {room.nonRefundable ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Room Service {room.roomService ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>sea View {room.seaView ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Spa {room.spa ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Swimming Pool {room.swimmingPool ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
          <div>Wardrobe {room.wardrobe ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}</div>
        </div> */}





      {/* <div className='row3'>
        <p>Room Available
          <span>{room.availableRooms}</span>
        </p>
      </div> */}

      {/* <div className='row4' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {
              (room.availableRooms > 0 && room.availableRooms <= 4) ? (<p>{`Hurry! only ${room.availableRooms} rooms available`}</p>) : (null)
            }
          </div>
          {(room.availableRooms === '0') ? (
            <div style={{ width: '100%' }}>
              <p style={{
                textAlign: 'right',
                marginTop: '1rem',
                fontSize: '1rem', float: 'right',
                color: 'red', border: '1px solid red', width: 'fit-content',
                padding: '0 1rem', paddingBottom: '0.2rem'
              }}>Room not available</p></div>) :
            (<div style={{ width: '100%' }}>
              <button style={
                {
                  float: 'right',
                }
              } onClick={() => {
                handleReserve(room, room.roomId, resortId)
              }}
              >RESERVE</button></div>)}
          <br />
        </div> */}

    </div>
  )
}

export default RoomCard