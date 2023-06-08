import React from 'react'
import './Home.css'
import Video from '../../video/Video'
import { useState, useEffect } from 'react'
// import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
// import { Link } from 'react-router-dom'
// import { Image } from 'react-bootstrap'
import axios from '../../../helpers/axios';
// import HomeList from '../home-list/HomeList';
// import Pagination from '../home-list/Pagination';
// import resortImage from '../../../assets/CUBA_PATNEM_BEACH_BUNGALOWS.jpg'
import { useNavigate } from 'react-router-dom'
import arrow from '../../../assets/arrow.png'
import { location2 } from 'react-icons-kit/icomoon/location2'
import { Icon } from 'react-icons-kit'
import Footer from '../Footer/Footer'



const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [])
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
        //  setSelectedVal([res.data[0].resortName, res.data[0]._id])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  console.log("allProperties =>", allProperties)
  useEffect(() => {
    getPropertiesData()
  }, [])

  // useEffect(() => {
  //   const boxes = document.querySelectorAll('.card')
  //   window.addEventListener('scroll', checkBoxes)
  //   checkBoxes()
  //   function checkBoxes() {
  //     const triggerBottom = window.innerHeight / 5 * 6
  //      boxes.forEach(box => {
  //       const boxTop = box.getBoundingClientRect().top
  //       if (boxTop < triggerBottom) {
  //         box.classList.add('show')
  //       }
  //       else {
  //         box.classList.remove('show')
  //       }
  //     })
  //   }
  // }, [])

  if (!allProperties) {
    return (
      <h1>.</h1>
    )
  }


  return (
    <div className='home-wrap'>
      <Video />
      {/* <div style={{ marginTop: '1rem' }} className=''>
        <h2 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2.5rem' }}>FEATURED PROPERTIES</h2>
        <HomeList currentList={currentList} />
        <Pagination totalPosts={allProperties.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div> */}
      <div className='home-content'  >
        <div className='content-wrapper' data-aos='zoom-in' data-aos-delay='80'>
          <h6>
            Discover CUBA GOA, a prestigious collection of independent luxury hotels in the alluring area of Goa, India. Discover a world of unrivalled luxury and hospitality. Check out our beautiful properties right away!
          </h6>
          <div className='inner-wrapper'  >
            <p   >
              Experience the ideal getaway in Cuba Goa, where your family can take pleasure in sand beaches, sports courts, and playgrounds. This resort is the ideal city vacation because it offers stunning views and a variety of outdoor excursions that can be rented. Expect to find all the comforts you want while travelling, together with breathtaking scenery. We provide a break from the ordinary with extravagant hospitality offerings.
            </p>
            <p >
              A treasure trove of leisure can be found in the sun-kissed beaches and stunning scenery. Hotels in Cuba Goa is an unmatched haven for both leisure and business, creating the ideal getaway for families and productive conclaves. A broad international and local cuisine awaits, nestled in the embrace of nature. These delicious foods go nicely with our exotic drinks, adding to South Goa's serene vibe as an oasis of elegant beauty
            </p>
          </div>

        </div>
      </div>

      <div className='' >
        <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Featured Properties</h2>
        <div style={{ border: '0.2px solid lightgrey', width: '30%', margin: 'auto' }}></div>
        <div className='container1' >
          {allProperties.map((property, index) => {
            return (
              <div className='card' key={index + 1} data-aos={(index % 2 === 0) ? ('flip-left') : ('flip-right')} data-aos-delay="35" >
                <div className='img-wrap1'>
                  <img src={property.resortImgURL} alt='resortImg'></img>
                </div>
                <div className='content'>
                  <h3 >{property.resortName}</h3>
                  <p>
                    {property.resortDescription}
                  </p>
                  <div className='button-wrap' style={{ cursor: 'pointer' }}
                    onClick={() => viewRooms(property._id, property.resortName)}>
                    <p style={{ color: 'red' }}>view room </p>
                    <div
                      style={{ cursor: 'pointer' }}>
                      <img src={arrow} alt='' /></div>
                  </div>
                </div>

                <div className='img-wrap2'>
                  <img src={property.resortImgURL} alt='resortImg'></img>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <div className='property-locations'>
        <div className='location-header'>
          <div style={{ display: 'none' }}><Icon icon={location2} size={30} style={{ color: 'orange' }}></Icon></div>
          <h3 style={{}}>Cuba Goa Property Locations</h3>
        </div>
        <div className='dummy-border' ></div>

        <div className='location-addresses'>
          {allProperties.map((resort, i) => {
            return (
              <section className='address-section' key={i + 1}>
                <h6>{resort.resortName}</h6>
                <div></div>
                <p>{resort.resortAddress}</p>
              </section>
            )

          })}
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default Home
