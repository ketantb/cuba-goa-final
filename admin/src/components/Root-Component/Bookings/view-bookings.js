import { useState } from "react"
import axios from "../../../helpers/axios"
import "./view-bookings.css"
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Header from "../../Header/Header";
import { useNavigate, useParams } from "react-router";
import Footer from "../Footer/Footer";
import BookingList from "./bookingList";


const ViewBooking = () => {
    const [filterCriteria, setFilterCriteria] = useState();
    const [filterInput, setFilterInput] = useState();
    const navigate = useNavigate();
    const [details, setDetails] = useState([])
    const [bookingList, setBookingList] = useState()
    const fetchBookingList = async () => {
        await axios.get("/get-all-bookings")
            .then((res) => {
                setBookingList(res.data.data.reverse())
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useState(() => {
        fetchBookingList()
    }, [])

    if (!bookingList) {
        return (
            <>
                Loading . . .
            </>
        )
    }

    // console.log("Booking List => ", bookingList)
    return (
        <>
            <Header />
            <div className="booking-list-container">

                {/* <div>
                    <section className="booking-list-filter-bar">
                        <label htmlFor="booking-list-select-tag">Filter By</label>
                        <select id="booking-list-select-tag" onChange={(e) => {setFilterCriteria(e.target.value); searchFilter(e.target.value)} }>
                            <option>Client Name</option>
                            <option>Client Contact</option>
                            <option>Client Email</option>
                            <option>Reservation ID</option>
                            <option>Resort Name</option>
                            <option>Check in Date</option>
                            <option>Check out Date</option>
                        </select>
                    </section>
                    <section>
                        <input onChange={(e) => handleInputFilter(e)}/>
                    </section>
                </div> */}
                <BookingList bookingList={bookingList} setBookingList={setBookingList}/>
            </div>
            <div style={{ marginTop: "10rem" }}>
                <Footer />
            </div>
            {/* {console.log(filterCriteria)} */}
            {/* {console.log(filterInput)} */}
        </>
    )

}

export default ViewBooking;