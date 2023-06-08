import React, { useState, useEffect } from 'react'
import './BookingPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../../../helpers/axios'
import { Button } from '@mui/material'
import { toast } from 'react-hot-toast'
import moment from 'moment'
import { nanoid } from 'nanoid';
import rupee from '../../../../assets/rupee-indian.png'

import { useSelector } from 'react-redux'
const serverUrl = process.env.REACT_APP_HOST


const BookingPage = () => {
    useEffect(() => {
        // window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);


    const navigate = useNavigate()
    const { resortname, resortId, roomId } = useParams()
    const [resort, setResort] = useState({})
    const [room, setRoom] = useState('a')
    const [user, setUser] = useState([])
    const [roomImage, setRoomImage] = useState('')
    const [roomPrice, setRoomPrice] = useState('')
    const [roomNos, setRoomNos] = useState('1')
    const [roomChange, setRoomChange] = useState(false)
    const [total, setTotal] = useState()
    const [confirm, setConfirm] = useState(false)
    const [datesFromHomePage, setDatesFromHomePage] = useState(false)
    const [checkin, setCheckin] = useState()
    const [checkout, setCheckout] = useState()
    const [paybleAmount, setPayableAmount] = useState()

    //store data
    const datesData = useSelector(store => store)


    const token = localStorage.getItem('token')
    //get sigined in client details
    const getUser = async () => {
        try {
            const response = await axios.get(`/user-details`, {
                headers: {
                    authorization: token
                }
            })
            if (response.data.success) {
                console.log('userdata=>', response.data.details)
                setUser(response.data.details)
            }
            else {
                console.log(response.data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    //get Resort
    const getResort = async () => {
        try {
            const response = await axios.get(`/resort-details/${resortId}`)
            // console.log('resort', response.data.resortData)
            setResort(response.data.resortData)
        }
        catch (err) {
            console.log(err)
        }
    }


    //get room details
    const getRoom = async () => {
        const today = new Date()
        const dayOfWeek = today.getDay()
        try {
            const response = await axios.get(`/resort-room/${resortId}/${roomId}`)
            if (response.data.success) {
                // console.log(response.data.data?.weekdayPerNightRate)
                setRoom(response.data.data)
                setRoomImage(response.data.data?.imgUrl[0]);

                (dayOfWeek === 0 || dayOfWeek === 6) ? (setRoomPrice(response.data.data?.weekendPerNightRate)) : (setRoomPrice(response.data.data?.weekdayPerNightRate));

            }
            else {
                console.log(response)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getResort();
        getRoom();
        getUser();

        // console.log(datesData)

        if (datesData.checkIn !== null && datesData.checkOut !== null) {
            setDatesFromHomePage(true)
            setCheckin(datesData.checkIn)
            setCheckout(datesData.checkOut)
        }
        else {
            setDatesFromHomePage(false)
            setCheckin('')
            setCheckout('')

        }
        // eslint-disable-next-line
    }, [])


    //booking form
    const [bookingForm, setBookingForm] = useState({
        email: '', name: '', contact: '', specialRequest: '',
    })


    //handle inputs
    const handleInputs = (e) => {
        setBookingForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }


    // handle Room No And Total
    const handleRoomNoAndTotal = (e) => {
        setRoomNos(Number(e.target.value))
        setRoomChange(true)
        setConfirm(false)
    }


    //handle save
    const handleConfirm = () => {
        // console.log('inital', roomChange, roomPrice, total)
        setTotal(Number(roomPrice) * Number(roomNos))
        setConfirm(true)
        // console.log('updated', roomChange, roomPrice, total)
        toast.success('Thank you for confirmation, Now you can proceed for payment')

    }
    useEffect(() => {
        if (confirm) {
            const paybleAmount = (Number(total) + Number(total) * 12 / 100)
            setPayableAmount(paybleAmount)
        }
        // eslint-disable-next-line
    }, [handleConfirm])



    //UPDATE ROOM DATA IN BACKEND (i.e no of rooms) when user book rooms
    const UpdateRoom = async () => {
        const updateData = {
            noOfRooms: roomNos,
            availableRooms: room.availableRooms
        }
        try {
            // eslint-disable-next-line
            const response = await axios.patch(`/update-room/${resortId}/${roomId}`, updateData)
            // console.log('updated rooms', response)
        }
        catch (err) {
            console.log(err)
        }
    }


    //handle payNow
    const payNow = async () => {
        // console.log('', bookingForm)
        const bookingDate = moment().format('DD/MM/YYYY')
        const bookingTime = moment().format('HH:mm')
        // console.log(roomNos)

        if (datesFromHomePage) {
            // console.log('datesData', datesData)
        }

        const bookingData = {
            name: user.name,
            email: user.email,
            contact: user.contact,
            resortname: resortname,
            resortId: resortId,
            roomType: room.roomType,
            roomId: roomId,
            checkIn: checkin,
            checkOut: checkout,
            noOfRooms: roomNos,
            specialRequest: bookingForm.specialRequest,
            totalAmount: paybleAmount,
            bookingDate: bookingDate,
            bookingTime: bookingTime,
            reservationId: nanoid(),
            bookingStatus: 'confirmed'
        }
        // console.log('bookingData', bookingData)

        try {
            // const token = localStorage.getItem('token')
            if (!token) {
                toast.error('Please signIn to your account to book a room')
            }
            else {
                if (confirm) {
                    const response = await axios.post(`/booking-form/${resortId}/${roomId}`, bookingData, {
                        headers: {
                            authorization: token
                        }
                    })
                    if (response.data.success) {
                        // console.log('booking data sent to backend', response.data.data)
                        UpdateRoom();
                        sendEmail(bookingData);
                        toast.success('checkout complete.')
                    }
                    else {
                        toast.error(response.data.message)
                    }
                }
                else {
                    toast.error('Please confirm your checkin,checkout ,room and price details before payment')
                }
                // console.log(response)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    //send email after successful booking
    const sendEmail = async (bookingData) => {
        console.log('serverURL', serverUrl)
        const { email } = user
        // console.log(`email sent to ${email}`)

        try {
            toast.loading('waiting for confirmation')
            // eslint-disable-next-line
            const response = await fetch(`${serverUrl}/send-email`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                },
                body: JSON.stringify({
                    ...bookingData,
                    email,
                    resort,
                    room
                })
            });
            toast.dismiss();
            navigate('/my-bookings')
            toast.success('Booking confirmation email sent')
        }
        catch (err) {
            console.log(err)
        }
    }



    if (!roomImage) {
        return ('...loading')
    }


    return (
        <>
            <div className='bookingsummaryheading'>
                <h4>BOOKING SUMMARY</h4>
            </div>
            <div className='booking-page-wrapper'>
                {/* col1 */}
                <div className='col1'>
                    <div className='row1'>
                        <div><h5>Your Booking Details</h5></div>
                        <div className='dates'>
                            <div>
                                <lable>Check-in </lable>
                                {(datesFromHomePage) ? (
                                    <h5>{checkin}</h5>
                                ) : (
                                    <input type='date' placeholder='check-in'
                                        name='checkin' value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                                )}
                            </div>
                            <div>
                                <lable>Check-out </lable>
                                {(datesFromHomePage) ? (
                                    <h5>{checkout}</h5>
                                ) : (
                                    <input type='date' placeholder='check-in'
                                        name='checkout' value={checkout} onChange={(e) => setCheckout(e.target.value)} />
                                )}
                            </div>
                        </div>
                        {/* <div className='dummy-border'></div> */}
                        <div className='selectRooms'>
                            <lable>Select No Of Rooms</lable>
                            <input type='number' placeholder='select no of rooms' min='1'
                                name='roomNos' value={roomNos} onChange={handleRoomNoAndTotal} />
                        </div>
                        <div className='save' style={{ display: 'flex', flexDirection: "column", justifyContent: 'flex-end' }}>
                            <p style={{ padding: '0.5rem' }}>Please click below to confirm your checkIn-checkout dates, room and price details</p>
                            <Button variant='contained'
                                onClick={handleConfirm}>CONFIRM</Button>
                        </div>
                    </div>

                    <div className='row2'>
                        <div><h5>Your Price Summary</h5></div>
                        <div>
                            <div><h5>Total Room Rates</h5></div>
                            <div className='totalamount-wrap'>
                                <div><img src={rupee} alt='' /></div>
                                {!roomChange ? (<h3>{roomPrice}</h3>) : (<h3>{roomPrice * roomNos}</h3>)}
                                <span style={{ marginTop: '.5rem', marginLeft: '.2rem' }}>+ 12% Taxes</span>
                            </div>
                        </div>
                    </div>

                    <div className='row3'>
                        <h6>Please go through our terms and conditions carefully</h6>
                        <details>
                            <summary>Hotel Policy</summary>
                            <p>
                                <ul>
                                    <li>All prices are subject to availability</li>
                                    <li>Luxury tax and service tax applicable as per government of India regulations.</li>
                                    <li>Complimentary breakfast (in case the guests are entitled to) will be served as per Breakfast Menu between 08:30 AM to 10:30 AM only.</li>
                                    <li>Outside Food and Drinks are strictly not allowed.</li>
                                    <li>Washing of clothes in the room is not allowed.</li>
                                    <li>You can just pay INR 100 per day and get 10 pieces of clothes washed on daily basis.</li>
                                    <li>There will be no refund given if there is no complaint for room informed within 3 hrs of check in.</li>
                                    <li>Late checkOut charges of INR 300 will be applicable for any check-out after 11:00 am.</li>
                                    <li>Security Deposit of INR 1000 to be paid at the time of check in for any damages which is refundable at the time of check out</li>
                                </ul>
                            </p>
                        </details>
                        <details>
                            <summary>Cancellation Policy</summary>
                            <p>
                                <ul>
                                    <li>Any Cancellation request received up to 15 days prior check in will not attract any cancellation fees</li>
                                    <li>Any Cancellation request received from 15 days to 01 days prior to check in will attract 01 night retention charges</li>
                                    <li>Any cancellation on the day of check-in will be non refundable</li>
                                    <li>No show , early check out will be non refundable</li>
                                </ul>
                            </p>
                        </details>
                        <details>
                            <summary>Season Cancellation ( 20th December to 5th January)</summary>
                            <p>
                                <ul>
                                    <li>Bookings once made will not be NON-REFUNDABLE, NON-AMENDABLE</li>
                                    <li>Mandatory Gala Dinner Charges will be applicable for any guest staying on 25th Dec and 31st Dec.</li>
                                </ul>
                            </p>
                        </details>
                    </div>

                </div>
                {/* col1 ends */}

                {/* col2 */}
                <div className='col2'>
                    <div className='row1'>
                        <div><img src={room?.imgUrl[0]} alt='roomImage' /></div>
                        <div>
                            <h4>{room.roomType}</h4>
                            <h6>{resort[0]?.resortName}</h6>
                            <p style={{ marginTop: '1rem' }}>Rate/night
                                <br /><span style={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>
                                    Rs.{roomPrice}
                                </span>
                            </p>
                            <div>
                                <p style={{ marginBottom: '0' }}>Room Capacity</p>
                                <section >
                                    <div>Adults<span>{room.adultCapacity}</span></div>
                                    <div style={{ marginLeft: '1rem' }}>Children<span>{room.childrenCapacity}</span></div>
                                </section>
                            </div>
                        </div>
                    </div>


                    {/* row2 */}
                    <div className='row2' >
                        <div><h4>CheckIn-CheckOut Details</h4></div>
                        <table>
                            <tr>
                                <td>Check-In from :</td>
                                <td>12 PM</td>
                            </tr>
                            <tr>
                                <td>Check-Out before : </td>
                                <td>10 AM</td>
                            </tr>
                            <tr>
                                <td>Reception contact no:</td>
                                <td>{resort[0]?.resortPhoneNumber}</td>
                            </tr>
                        </table>
                    </div>

                    <div className='row3'>
                        <details>
                            <summary>Booking Policy</summary>
                            <p>
                                <ul>
                                    <li>The total price of the reservation will be charged on the day of booking</li>
                                    <li>Any type of extra mattress or child's cot/crib is upon request and needs to be confirmed by management.</li>
                                    <li>Supplements are not calculated automatically in the total costs and will have to be paid for separately during your stay.</li>
                                </ul>
                            </p>
                        </details>
                    </div>

                    <div className='row4'>
                        <h5>Guest Information</h5>
                        <p>Dear {user.name}, you reserved  {roomNos} rooms of {room.roomType} ,
                            at  {resortname}, Goa
                        </p>
                        <p>Address: <br />
                            {resort[0]?.resortAddress},{resort[0]?.pincode}
                        </p>

                        <div>
                            <h5>SPECIAL REQUEST</h5>
                            <textarea placeholder='If you have any specific preferences or requirements, such as dietary restrictions or room preferences, please inform us in advance, and we will do our best to accommodate them.'
                                name='specialRequest' value={bookingForm.specialRequest} onChange={handleInputs}></textarea>
                        </div>
                    </div>

                    {confirm ? (
                        <div className='totalamount-wrap' style={{ padding: '1rem .5rem' }}>
                            <h5> YOUR TOTAL PAYABLE AMOUNT</h5>
                            <div style={{ display: 'flex' }}>
                                <img src={rupee} alt='' style={{ width: '2rem', height: '1.5rem', opacity: '0.4' }} />
                                <h4>{paybleAmount}</h4>
                            </div>
                        </div>
                    ) : (null)}



                    <div className='row5'>
                        <Button onClick={payNow} className='btn' variant='contained'>PAY NOW</Button>
                    </div>
                </div>


                {/* col2 ends */}





                {/* <div className='heading'>
                <h1 data-aos='zoom-in' data-aos-delay='50'>FINALIZE YOUR STAY</h1>
            </div>

            <div className='row1'>
                <h5>Your Reservation Summary</h5>
            </div>

            <div className='row2'>
                <h4>{resortname}</h4>
                <table>
                    <tr>
                        <td>Check-in from :</td>
                        <td>12:00 PM</td>
                    </tr>
                    <tr>
                        <td>Check-out before :</td>
                        <td>10:00 AM</td>
                    </tr>
                    <tr>
                        <td>Reception contact :</td>
                        <td> </td>
                    </tr>
                </table>
            </div>

            <div className='row3' style={{ backgroundColor: 'lightblue' }}>
                <div className='col1'>
                    <div className='row1' >
                        Room Type
                        <p>{room.roomType}
                            {
                                (room.breakfast === true) ? (
                                    <span className='breakfast-option' style={
                                        {
                                            fontSize: '1rem',
                                            fontWeight: 'normal',
                                        }
                                    }>Room with breakfast</span>
                                ) : (null)
                            }
                        </p>

                        <p style={{ lineHeight: '1rem', fontFamily: "'Ysabeau', sans-serif" }}>Check-in date :</p>
                        <p style={{ lineHeight: '1rem', fontFamily: "'Ysabeau', sans-serif" }}>Check-out date : </p>

                        <p style={{ lineHeight: '1rem' }}>Adult Capacity : <span>{room.adultCapacity}</span></p>
                        <p style={{ lineHeight: '1rem' }}>Charges Per Night : {`Rs. ${room.weekdayPerNightRate} +Taxes`} </p>
                    </div>
                    <div className='row2'>
                        <div><p>Total</p></div>
                        <div><p>{`Rs. ${room.weekdayPerNightRate}`}</p></div>
                    </div>
                </div>
                <div className='col2'>
                    <h3>Special Request</h3>
                    <h6>Please explain your request: arrival time, flight details, food preferences, membership number...</h6>
                    <div>
                        <textarea name='specialRequest' value={bookingForm.specialRequest} onChange={handleInputs} />
                    </div>
                </div>
            </div>

            <div className='dummy-border'></div>

            <div className='row4' style={{ backgroundColor: 'aliceblue' }}>
                <h3>Guest Information</h3>

                <div>
                    guest details form
                    <div className='col1'>
                        <h6>Personal Details</h6>
                        <form className='guestform'>
                            <div><TextField type='email' className='form-input'
                                id="outlined-basic" label="Email address" variant="outlined" required
                                name='email' value={bookingForm.email} onChange={handleInputs} />
                            </div> 
                            <div>
                                <TextField type='text' className='form-input'
                                    id="outlined-basic" label="Full Name" variant="outlined" required
                                    name='name' value={bookingForm.name} onChange={handleInputs} />
                            </div> 
                             <div>
                                <TextField type='number' className='form-input'
                                    id="outlined-basic" label="Phone Number" variant="outlined" required
                                    name='contact' value={bookingForm.contact} onChange={handleInputs} />

                            </div>
                            <div>
                                <lable>Check-in date</lable>
                                <TextField type='date' className='form-input'
                                    id="outlined-basic" variant="outlined" required
                                    name='checkIn' value={bookingForm.checkIn} onChange={handleInputs} />
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                <lable>Check-out date</lable>
                                <TextField type='date' className='form-input'
                                    id="outlined-basic" variant="outlined" required
                                    name='payNow' value={bookingForm.payNow} onChange={handleInputs} />
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                <lable>No of Rooms</lable>
                                <TextField type='number' className='form-input'
                                    id="outlined-basic" variant="outlined" required
                                    name='noOfRooms' value={bookingForm.noOfRooms} onChange={handleInputs} />
                            </div>
                        </form>
                    </div>
                    guest details form ends
                    <div className='dummy-border'></div>


                    payment infomation
                    <div className='col2'>
                        <h6>Payment Information</h6>
                        <div>
                            <h5>Your Total Payable amount </h5>
                            <h5 style={{ marginLeft: '10rem' }}>
                                Rs.{room.weekdayPerNightRate + 100}</h5>
                        </div>
                    </div>
                    payment infomation ends

                </div>


                <div className='payNow-btn'>
                    <Button className='button' onClick={payNow}>payNow</Button>
                </div>


            </div>


            <p>Note: Please go through our terms and conditions carefully before booking confirmation
                <span style={{
                    marginLeft: '1rem',
                    color: 'blue',
                    cursor: 'pointer'
                }}
                    onClick={() => { navigate('/terms') }}>click here</span>
            </p> */}

            </div >
        </>
    )
}

export default BookingPage
