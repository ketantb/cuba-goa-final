import { useState } from "react"
import axios from "../../../helpers/axios"
import "./view-bookings.css"
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Header from "../../Header/Header";
import { useNavigate, useParams } from "react-router";
import Footer from "../Footer/Footer";
import { FaConciergeBell } from 'react-icons/fa';


const ViewBooking = () => {
    const [spclRequestDisplay, setSpclRequestDisplay] = useState("")
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

    if (!bookingList) {
        return (
            <>
                Loading . . .
            </>
        )
    }
    const toggleSpecialRequest = (index) => {
        setSpclRequestDisplay(index);
    }

    const bgColorConfirmed = { backgroundColor: "#2eb85c", color: "#ffff", width: "75px" };
    const bgColorCancelled = { backgroundColor: "#e55353", color: "#ffff" };
    const bgColorRejected = { backgroundColor: "#ced2d8", color: "black" };

    // console.log("Booking List => ", bookingList)


    return (
        <>
            <Header />
            <div className="booking-list-container">
                <CTable responsive>
                    <CTableHead color="dark" >
                        <CTableRow>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Reservation ID</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Client Name</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Client Contact</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Client Email</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">No of Rooms</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Resort Name</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Room Type</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Check in Date</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Check out Date</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Booking Status</CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {bookingList.map((item, index) => {
                            return (
                                <>
                                    <CTableRow color="light" key={bookingList._id}>
                                        <CTableDataCell style={{ textAlign: "center" }}>{item?.reservationId}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: "center" }}>{item?.name}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: "center" }}>{item?.contact}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: "center" }}>{item.email}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: "center" }}>{item?.noOfRooms}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: "center" }}>{item?.resortname}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: "center" }}>{item?.roomType}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: "center" }}>{item?.checkIn}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: "center" }}>{item?.checkOut}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: "center" }}>
                                            <span className="booking-status"
                                                style={item.bookingStatus == "confirmed" ? bgColorConfirmed
                                                    : item.bookingStatus == "cancelled" ? bgColorCancelled
                                                        : bgColorRejected
                                                }>
                                                {item.bookingStatus}
                                            </span>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                        {item.specialRequest ?  <span onClick={() => {toggleSpecialRequest(item._id)}} className="special-request-call-bell">
                                            <FaConciergeBell />
                                            </span> : null}
                                        </CTableDataCell>
                                        {/* <CTableDataCell>
                                            <button className="view-booking-show-btn">
                                                Show
                                            </button>
                                        </CTableDataCell> */}
                                    </CTableRow>
                                    <div style={{display: item._id == spclRequestDisplay ? "block" : "none" }} color="info">
                                        <div style={{backgroundColor: "#4f5d73", color: "#ffff"}}>
                                            Special Request :
                                        </div>
                                        <div style={{backgroundColor: "lightBlue"}}>
                                            {item.specialRequest}
                                        </div>
                                    </div>
                                    {/* <div>
                                        <button
                                        onClick={() => { navigate("/client-details/" + item.client) }}
                                        >Client Details</button>
                                        <button>Delete</button>
                                    </div> */}
                                </>
                            )
                        })}
                    </CTableBody>
                </CTable>
            </div>
            <div style={{ marginTop: "10rem" }}>
                <Footer />
            </div>
        </>
    )

}

export default ViewBooking;