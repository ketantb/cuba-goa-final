// import './OurProperties.css'
import './EditResort.css'
import React, { useEffect } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { RiHotelLine } from 'react-icons/ri'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    CButton, CCol, CModal, CModalHeader,
    CModalTitle, CModalBody, CModalFooter, CFormInput, CRow,
    CFormTextarea, CFormCheck, CCard, CCardHeader, CCardBody,
    CImage
} from '@coreui/react'
import swal from 'sweetalert';
import { RiDeleteBin5Fill } from 'react-icons/ri';

const EditResort = ({ resort, getProperty }) => {
    // const navigate = useNavigate()
    const [editResortForm, setEditResortForm] = useState({...resort})
    const [saveResortBtnActive, setSaveResortBtnActive] = useState(false)
    const [visibleForm, setVisibleForm] = useState(false)
    const [roomImage, setRoomImage] = useState(false)
    const [roomImgUrl, setRoomImgUrl] = useState(false)
    console.log('editResortForm => ', editResortForm);
    const handleEditResortForm = (params) => (e) => {
        setEditResortForm({ ...editResortForm, [params]: e.target.value })
    }

    const deleteImage = () => {
        setEditResortForm({ ...editResortForm, resortImgURL: "" })
    }

    const imgCloudUpload = async (e) => {
        e.preventDefault()
        console.log(editResortForm)
        return;
        setSaveResortBtnActive(true)
        // console.log(updatedRoomData.imgUrl)
        if (!editResortForm.resortName || !editResortForm.resortLocation || !editResortForm.resortDescription) {
            return toast.error("Please fill all the Input Fields !")
            setSaveResortBtnActive(false)
        }
        if (roomImage) {
            const imgData = new FormData()
            imgData.append("file", roomImage)
            imgData.append("upload_preset", "ketanInstaClone")
            await axios.post("https://api.cloudinary.com/v1_1/ketantb/image/upload", imgData)
                .then((res) => {
                    // console.log(res)
                    setRoomImage(res.data.secure_url)
                    // console.log(editResortForm)
                })
                .catch((err) => {
                    alert("An err occoured please try after some time !")
                    setSaveResortBtnActive(false)
                    console.log(err)
                })
        }
        setEditResortForm({ ...editResortForm, resortImgURL: roomImage })
        // console.log(editResortForm)
        setRoomImgUrl(true)
    }

    const saveResort = async () => {
        if (!resort) return
        // await axios.put(`http://localhost:4001/hotelbook/${resort._id}`, editResortForm)
        await axios.put(`https://cuba-goa-server.onrender.com/hotelbook/${resort._id}`, editResortForm)
            .then((res) => {
                console.log(res)
                setRoomImgUrl(false)
                getProperty()
                setVisibleForm(false)
                setSaveResortBtnActive(false)
                swal({
                    title: "Good job!",
                    text: "Resort Edited Successfully!",
                    icon: "success",
                    button: "OK!",
                });
            })
            .catch((err) => {
                alert("An error occoured please try after some time !")
                setSaveResortBtnActive(false)
                console.log(err)
            })
    }

    useEffect(() => {
        if (roomImgUrl) {
            saveResort()
            console.log("useEffect Ran")
        }
    }, [roomImgUrl])

    return (
        <>
            <CCol className='text-end px-4 py-3'>
                <CButton className='mx-5' onClick={() => { setVisibleForm(true) }}>Edit Resort</CButton>
            </CCol>

            <CModal
                keyboard={false}
                portal={false}
                visible={visibleForm}
                className='booking-form-p ' scrollable size='lg'>
                <section style={{ zIndex: 100000, position: 'absolute' }}>
                    <ToastContainer
                        autoClose={1500}
                        limit={5}
                        theme={"dark"}
                        pauseOnFocusLoss={false}
                        position={"top-center"}
                    />
                </section>
                <CModalHeader onClick={() => { setVisibleForm(false) }}>
                    <CModalTitle><h4>Resort Info</h4></CModalTitle>
                </CModalHeader>
                <CModalBody >
                    {editResortForm.resortImgURL ?
                        <div className="mb-4 editResortDeleteImg" style={{ textAlign: 'center' }}>
                            <CImage className='p-0 m-0' width={300} height={200} src={editResortForm.resortImgURL} />
                            <button onClick={deleteImage} className='editResortDeleteIcon'><RiDeleteBin5Fill /></button>
                        </div>
                        : null}
                    <div className="mb-4">
                        <CFormInput type="file" id="formFile" label="Upload resort image" onChange={(e) => setRoomImage(e.target.files[0])} />
                    </div>
                    <div className="mb-4">
                        <CFormInput label="Resort Name" value={editResortForm.resortName} maxLength={50} onChange={handleEditResortForm('resortName')} />
                    </div>
                    <div className="mb-4">
                        <CFormInput type="text" size="sm" maxLength={2000} label="Location" value={editResortForm.resortLocation} onChange={handleEditResortForm('resortLocation')} />
                    </div>
                    <div>
                        <CFormTextarea label="Resort Info" maxLength={5000} onChange={handleEditResortForm('resortDescription')} value={editResortForm.resortDescription} />
                    </div>

                </CModalBody>

                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleForm(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" type='submit' disabled={saveResortBtnActive} onClick={imgCloudUpload}>Save Resort</CButton>
                </CModalFooter>
            </CModal>
            {console.log(editResortForm)}
        </>
    )
}

export default EditResort;