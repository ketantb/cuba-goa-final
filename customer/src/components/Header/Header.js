import React, { useEffect, useState } from 'react';
import './Header.css';
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line
// import logo from '../../assets/logo.png';
import { FaAlignJustify } from 'react-icons/fa';
import { Icon } from 'react-icons-kit';
import { cross } from 'react-icons-kit/icomoon/cross';
import cubaGoaLogo from '../../assets/logocubagoa.png'
import axios from '../../helpers/axios'
import { toast } from 'react-hot-toast'

const Header = ({ auth, setAuth }) => {
  const navigate = useNavigate()
  const [resortId, setResortId] = useState("")
  const [allProperties, setAllProperties] = useState();

  const getPropertiesData = async () => {
    await axios.get(`/hotelbook`)
      .then((res) => {
        // console.log('property list => ', res.data)
        setAllProperties(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const token = localStorage.getItem('token')
  useEffect(() => {
    setAuth(token);
    //eslint-disable-next-line
  }, [token])



  /*    navbar changing its color   */
  const [navBackground, setNavBackground] = useState('transparent');
  //handle scroll
  const handleScroll = () => {
    if (window.pageYOffset > 20) {
      setNavBackground('rgb(242, 246, 248)');
    } else {
      setNavBackground('transparent');
    }
  }
  // //useffect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // // ***navbar changin its color ends


  /*  handling responsive navbar */
  const [showNavbar, setShowNavbar] = useState('none')
  // eslint-disable-next-line
  const [navbarHidden, setNavbarHidden] = useState(true)
  //funtion to show or hide navbar on clicking menu icon
  const handleOpenNavbar = () => {
    setShowNavbar('block');
    setNavbarHidden(false)
  }
  const handleCloseNavbar = () => {
    setShowNavbar('none');
    setNavbarHidden(false)
  }
  /*   handling responsive navbar ends */

  useEffect(() => {

    if (resortId === "") {
      getPropertiesData();
      console.log('if block ran')
    }
    else if (resortId) {
      let resortData = allProperties.find((el) => {
        // eslint-disable-next-line
        return el._id == resortId
      })
      navigate(`/${resortData.resortName}/${resortData._id}/rooms`)
      // console.log("resort Data => ", resortData)
      handleCloseNavbar();
    }
    // eslint-disable-next-line
  }, [resortId])

  return (
    <div className='app-bar' style={{ backgroundColor: navBackground }}>

      {/* desktop view navbar */}
      <div className='desktop-section'>
        <section className='appbar-col-2'>
          <Box className='col-2-box'>
            <Button className='btn-item' onClick={() => navigate('/')}>Home</Button>
            {!allProperties ?
              <select className='header-dropdown'>
                <option>CUBA AGONDA</option>
              </select> :
              <select className='header-dropdown' onChange={(e) => { setResortId(e.target.value) }} style={{ marginTop: '2.95rem' }}>
                {/* <option>CUBA AGONDA</option> */}
                {allProperties.map((el) => {
                  return (
                    <option value={el._id}>{el.resortName.toUpperCase()}</option>
                  )
                })}
              </select>
            }
            <Button className='btn-item' onClick={() => navigate('/spa')}>SPA</Button>

            {/* <Button className='btn-item' onClick={() => navigate('/our-properties')}>OUR PROPERTIES</Button> */}
            <Button className='btn-item' onClick={() => navigate('/events')}>Events</Button>
            <section className='appbar-col-1'>
              {/* <Typography className='title' onClick={() => navigate('/')}
                style={{ cursor: 'pointer', fontSize: '34px'}}>CUBA GOA</Typography> */}
              <div className='r-image'>
                <img src={cubaGoaLogo} alt='cuba-goa-logo' />
              </div>
              {/* <div className='r1'>HOTEL - SPA - RESTAURANT</div>
                <div className='r2'>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                </div> */}
            </section>
            <Button className='btn-item' onClick={() => navigate('/aboutus')}>About Us</Button>
            <Button className='btn-item' onClick={() => navigate('/gallery')}>GALLERY</Button>
            <Button className='btn-item' onClick={() => navigate('/contactus')}>Contact Us</Button>
            {auth ? (<Button className='btn-item' onClick={() => { navigate('/my-bookings') }}>MY BOOKINGS</Button>) : (null)}

            {auth ?
              (<Button className='btn-item' onClick={() => {
                toast.loading('signing out...')
                localStorage.clear();
                navigate('/');
                toast.dismiss()
                toast.success('LoggedOut successfully!')
                
              }} >LOGOUT</Button>)
              :
              (<Button className='btn-item' onClick={() => navigate('/signin')}>LOGIN</Button>)}
          </Box>

          <div className='menu' style={{ width: '100%', marginLeft: '90%' }} onClick={handleOpenNavbar}><FaAlignJustify style={{ color: 'darkblue' }} /></div>

        </section>
      </div>


      {/* mobile view navbar */}
      <div className='right-side-navbar' style={{ display: showNavbar }}>
        <Box className='col-2-box' style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Icon className='close-cross-icon' icon={cross} size={15} style={{ float: 'left', paddingLeft: '1rem', marginTop: '1rem', color: 'lightblue' }}
              onClick={handleCloseNavbar} />
          </div>
          <Button className='btn-item' onClick={() => { navigate('/'); handleCloseNavbar() }}>Home</Button>
          {!allProperties ?
            <select className='head-dropdown-resp' style={{ fontWeight: 'bold' }}>
              <option>CUBA AGONDA</option>
            </select> :
            <select className='head-dropdown-resp' onChange={(e) => { setResortId(e.target.value) }}
              style={{ fontWeight: 'bold' }}>
              {/* <option>CUBA AGONDA</option> */}
              {allProperties.map((el) => {
                return (
                  <option className='head-dropdown-resp' value={el._id}>{el.resortName.toUpperCase()}</option>
                )
              })}
            </select>
          }
          <Button className='btn-item' onClick={() => { navigate('/spa'); handleCloseNavbar() }}>SPA</Button>
          <Button className='btn-item' onClick={() => {navigate('/events');handleCloseNavbar()}}>Events</Button>
          <Button className='btn-item' onClick={() => { navigate('/gallery'); handleCloseNavbar() }}>GALLERY</Button>
          <Button className='btn-item' onClick={() => { navigate('/aboutus'); handleCloseNavbar() }}>About Us</Button>
          <Button className='btn-item' onClick={() => {navigate('/contactus');handleCloseNavbar()}}>Contact Us</Button>
          {auth ? (<Button className='btn-item' onClick={() => { navigate('/my-bookings'); handleCloseNavbar() }}>MY BOOKINGS</Button>)
            : (null)}

          {auth ?
            (<Button className='btn-item' onClick={() => {
              localStorage.clear();
              navigate('/');
              handleCloseNavbar()
            }} >LOGOUT</Button>)
            :
            (<Button className='btn-item' onClick={() => { navigate('/signin'); handleCloseNavbar() }}>LOGIN</Button>)}
        </Box>
      </div>

      {/* mobile view navbar ends */}




    </div >
  )
}

export default Header