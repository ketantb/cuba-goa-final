import { useState } from "react"
import axios from "../../../helpers/axios"
import "./view-bookings.css"
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Header from "../../Header/Header";
import { useNavigate, useParams } from "react-router";

const ViewBooking = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState([])
    const [bookingList, setBookingList] = useState()
    const fetchBookingList = async () => {
        await axios.get("/get-all-bookings")
            .then((res) => {
                setBookingList(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useState(() => {
        fetchBookingList()
    }, [])

    console.log("Booking List => ", bookingList)

    if (!bookingList) {
        return (
            <>
                Loading . . .
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="booking-list-container">
                <CTable responsive>
                    <CTableHead color="dark" >
                        <CTableRow>
                            <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Client Contact</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Client Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col">No of Rooms</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Resort Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Room Type</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Check in Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Check out Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Booking Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {bookingList.map((item, index) => {
                            return (
                                <>
                                    <CTableRow key={bookingList._id}>
                                        <CTableDataCell>{item?.name}</CTableDataCell>
                                        <CTableDataCell>{item?.contact}</CTableDataCell>
                                        <CTableDataCell>{item.email}</CTableDataCell>
                                        <CTableDataCell>{item?.noOfRooms}</CTableDataCell>
                                        <CTableDataCell>{item?.resortname}</CTableDataCell>
                                        <CTableDataCell>{item?.roomType}</CTableDataCell>
                                        <CTableDataCell>{item?.checkIn}</CTableDataCell>
                                        <CTableDataCell>{item?.checkOut}</CTableDataCell>
                                        <CTableDataCell>
                                            <span className="booking-status">
                                                Active
                                            </span>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <button className="view-booking-show-btn">
                                                Show
                                            </button>
                                        </CTableDataCell>
                                    </CTableRow>
                                    <div>
                                        <button   
                                        onClick={() => { navigate("/client-details/" + item._id)} }
                                        // onClick={() => { navigate("/spa-details/" + card._id) }}
                                        >Client Settings</button>
                                        <button>Delete</button>
                                    </div>
                                </>
                            )
                        })}
                    </CTableBody>
                </CTable>
            </div>
        </>
    )

}

export default ViewBooking;