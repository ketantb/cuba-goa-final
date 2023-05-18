import React, { useEffect, useState } from 'react';
import './About.css'
import Footer from '../Footer/Footer';
import axios from "../../../helpers/axios"
import AboutUsForm from './editAboutUs';

// const bannerimg = 'https://www.tusktravel.com/blog/wp-content/uploads/2021/07/Goa-open-for-tourist.jpg'



function About() {
  // const images = [
  //     { title: 'TEAM', para: 'Our team comprises highly skilled and knowledgeable individuals with a passion for real estate. We understand that buying or selling a property can be a daunting task, which is why we are committed to making the process as smooth and stress-free as possible for our clients.' },
  //     { title: 'TECHNOLOGY', para: 'We specialize in providing personalized and professional service, and our team is equipped with the latest technology and market data to ensure that our clients receive the most accurate and up-to-date information.' },
  //     { title: 'MISSION', para: 'Whether you are looking to buy your first home, sell your current property, or invest in real estate, we are here to guide you every step of the way. Our mission is to help our clients achieve their real estate goals by providing top-notch service, expertise, and support.' },
  //     { title: 'GOAL', para: 'We take pride in building long-term relationships with our clients, and we are committed to exceeding their expectations. Our goal is to make sure that each and every client is satisfied with our service and confident in their real estate decisions.' }]

  // const [activeIndex, setActiveIndex] = useState(0);

  // const handleSlideChange = (index) => {
  //     setActiveIndex(index);
  // };

  const [aboutUsData, setAboutUsData] = useState();
  const [showAboutUsForm, setShowAboutUsForm] = useState(false);

  const fetchData = async () => {
    await axios.get("/about-us")
      .then((res) => {
        console.log(res.data.data[0])
        setAboutUsData(res.data.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  console.log(aboutUsData)
  // fetchData()
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='aboutus-wrapper'>
        <h5 className='title'>
          {aboutUsData?.heading1}
          <br /><br /><br />
          {aboutUsData?.heading2}
        </h5>
        <section className='aboutus-body'>
          <div className="aboutus-lb">
            {/* <div className="">
                        <h6>{images[0].title}</h6>
                        <p>{images[0].para}</p>
                    </div>
                    <div className="">
                        <h6>{images[1].title}</h6>
                        <p>{images[1].para}</p>
                    </div>
                    <div className="">
                        <h6>{images[2].title}</h6>
                        <p>{images[2].para}</p>
                    </div>
                    <div className="">
                        <h6>{images[3].title}</h6>
                        <p>{images[3].para}</p>
                    </div> */}
            <h4>
              {aboutUsData?.heading3}
            </h4>
            <p style={{ paddingRight: '2rem' }}>
              {aboutUsData?.description}
            </p>
          </div>
          <div className="aboutus-rb">
            <img src={aboutUsData?.bannerImgUrl} alt='aboutusimg' />
            {/* <img src={aboutusimg} alt='aboutusimg'/> */}
          </div>
        </section>
        <div>
          <button onClick={() => setShowAboutUsForm(true)}>Edit About Us</button>
        </div>
        <AboutUsForm
          showAboutUsForm={showAboutUsForm}
          setShowAboutUsForm={setShowAboutUsForm}
          dataFetchFunctionFromParent = {setAboutUsData}
        />
      </div>
      <Footer />


    </>

  );
}

export default About;