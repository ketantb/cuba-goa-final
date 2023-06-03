import React, { useState, useEffect } from 'react'
import beachResort from "../../assets/resort.mp4"
import "../../styles/main.css"
import { useNavigate } from 'react-router'
import axios from '../../helpers/axios'
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast'

const Video = () => {

  const navigate = useNavigate()
  const [resortData, setResortData] = useState()
  const [resortId, setResortId] = useState('')

  //reducer dispatch
  const dispatch = useDispatch()
  const [checkindate, setCheckindate] = useState('')
  const [checkoutdate, setCheckoutdate] = useState('')


  //SHOW ROOMS
  const viewRooms = (id, resortname) => {
    navigate(`/${resortname}/${id}/rooms`)
    console.log(resortname, id)
  }

  const [allProperties, setAllProperties] = useState([])
  const getPropertiesData = async () => {
    await axios.get(`/hotelbook`)
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
  }, [])


  useEffect(() => {
    if (resortId === "") {
      console.log('empty reosrt id')
    }
    else {
      const resortData = allProperties.find((el) => el._id === resortId)
      setResortData(resortData)
      console.log(resortData)
    }
    // eslint-disable-next-line
  }, [resortId])


  // Handle Check Available
  const handleCheckAvailable = () => {
    if (resortId === "") {
      toast.error('Choose resort to check availability')
    }
    else {
      console.log('resortdata', resortData)

      if (checkindate !== "" && checkoutdate !== "") {
        dispatch({ type: 'set_checkin', payload: { checkindate: checkindate } });
        dispatch({ type: 'set_checkout', payload: { checkoutdate: checkoutdate } })
        viewRooms(resortData._id, resortData.resortName)
      }
      else {
        toast.error('Select dates to check availability')
      }
    }
  }

  return (
    <div className='main' >
      < video src={beachResort} autoPlay loop muted data-aos="flip-left" data-aos-delay="600" data-aos-easing="ease-in-out" />
      {/* <div className='home-text' data-aos="zoom-in" data-aos-delay="2000" data-aos-easing="ease-in-out" >
        <h1 >Captivating Paradise</h1>
        <h4>for unwinding and reveling</h4>
      </div> */}


      <div className='home-search-box'>

        <div className='row1'>
          <div>
            <label>CHECK-IN DATE</label>
            <input type="date" id="myDate" placeholder="Check-in Date"
              name='checkindate' value={checkindate} onChange={(e) => setCheckindate(e.target.value)} />
          </div>
          <div>
            <label>CHECK-OUT DATE</label>
            <input type="date" id="myDate" placeholder="Check-in Date"
              name='checkoutdate' value={checkoutdate} onChange={(e) => setCheckoutdate(e.target.value)} />
          </div>
          <div onClick={handleCheckAvailable}>
            CHECK AVAILABILITY
          </div>
        </div>

        <div className='row2'>
          {/* <label style={{ letterSpacing: '2px', paddingLeft: '.1rem', fontWeight: 'bold' }}>SEARCH RESORT</label> */}


          <select id='select' name='resort' value={resortId}
            onChange={(e) => setResortId(e.target.value)}>
            <option>SELECT RESORT</option>
            {allProperties.map((resort, i) => {
              return (
                <option
                  value={resort._id}>{resort.resortName}</option>
              )
            })}
          </select>

        </div>

        <div className='row3' onClick={handleCheckAvailable} >
          CHECK AVAILABILITY
        </div>
      </div>

    </div>
  )
}

export default Video
