import React, { useEffect } from 'react'
import './Wedding.css'
import { Icon } from 'react-icons-kit'
import { location2 } from 'react-icons-kit/icomoon/location2'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'


const EventPage = () => {
    const navigate = useNavigate()

    const eventArr = [
        {
            eventName: 'BEACH WEDDINGS',
            eventTitle: " Celebrate Love by the Shore",
            eventDescription: "Our gala parties are hosted at the most prestigious venues, offering a captivating backdrop that sets the stage for an unforgettable evening. From luxurious ballrooms to stunning outdoor locations, our chosen venues exude elegance and sophistication, creating an ambiance that elevates the entire experience.Be captivated by world-class entertainment that takes center stage throughout the night. From captivating live bands and mesmerizing dance performances to awe-inspiring acrobats and renowned DJs, our gala party showcases talent that leaves you spellbound and ensures that the dance floor remains alive with energy.",
            eventStartDate: '',
            eventEndDate: '',
            eventImage: 'https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    ]


    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [])

    return (
        <>

            <div className='wedding-event-wrap'>

                {/* gala party */}
                {eventArr.map((event, index) => {
                    return (
                        <div className='outerwrap' data-aos='fade-down' key={index + 1}
                            style={{
                                background: `url(${event.eventImage})`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }} >
                            <div className='innerwrap'>
                                <div className="wrap animate pop">
                                    <div className="overlay">
                                        <div className="overlay-content animate slide-left delay-2">
                                            <h1 className="animate slide-left pop delay-4">
                                                {event.eventName}
                                            </h1>
                                            <div className='content' style={{ color: "white", marginBottom: "7rem", width: '10rem' }}>
                                                {/* <p className="animate slide-left pop delay-5" >
                          Starting Date:
                          <br />
                          <span>May 5, 2023</span>
                        </p>
                        <p className="animate slide-left pop delay-5" >
                          End Date:
                          <br />
                          <span>May 5, 2023</span>
                        </p> */}

                                                <h5>{event.eventTitle}</h5>
                                            </div>
                                        </div>
                                        <div className="image-content animate slide delay-5"
                                            style={{
                                                background: `url(${event.eventImage})`,
                                                backgroundPosition: 'center center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        ></div>
                                        <div className="dots animate">
                                            <div className="dot animate slide-up delay-6"></div>
                                            <div className="dot animate slide-up delay-7"></div>
                                            <div className="dot animate slide-up delay-8"></div>
                                        </div>
                                    </div>
                                    <div className="text">
                                        <h6>{event.eventName}</h6>
                                        <p>{event.eventDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* gala party */}

            </div>


            <div className='eventcontactwrap' onClick={() => navigate('/contactus')}>
                <button className='eventcontactbtn'>CONTACT US</button>
            </div>

            <div className='property-locations'>
                <div className='location-header'>
                    <div><Icon icon={location2} size={30} style={{ color: 'orange' }}></Icon></div>
                    <h3 style={{}}>Cuba Goa Property Locations</h3>
                </div>
                <div className='dummy-border' ></div>

                <div className='location-addresses'>
                    <section className='address-section'>
                        <h6>CUBA BEACH BUNGALOWS</h6>
                        <div></div>
                        <p>Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702</p>
                    </section>
                    <section className='address-section'>
                        <h6>CUBA PATNEM BEACH BUNGALOWS</h6>
                        <div></div>
                        <p>North side of Patnem Beach, Palolem-Patnem Road, Canacona, Goa - 403702</p>
                    </section>
                    <section className='address-section'>
                        <h6>CUBA PREMIUM HUTS</h6>
                        <div></div>
                        <p>Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702</p>
                    </section>
                    <section className='address-section'>
                        <h6>PALOLEM BEACH RESORT</h6>
                        <div></div>
                        <p>Entrance of Palolem Beach, Besides car parking area, Palolem Beach, Canacona, Goa - 403702</p>
                    </section>
                    <section className='address-section'>
                        <h6>CUBA AGONDA</h6>
                        <div></div>
                        <p>Tambli Val, Agonda Beach Road, Agonda, Canacona, Goa - 403702</p>
                    </section>
                </div>
            </div>



            <Footer />
        </>
    )
}

export default EventPage

