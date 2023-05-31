import React, { useEffect } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { RiHotelLine } from 'react-icons/ri'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../../../helpers/axios"
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

const EditSpa = ({ getSpaList, card }) => {
    const navigate = useNavigate()
    // console.log(card)
    const [updatedSpa, setUpdatedSpa] = useState(card)
    const [editSpaForm, setEditSpaForm] = useState({ name: "", imgUrl: "", details: "", benefits: "" })
    const [saveSpaBtnActive, setSaveSpaBtnActive] = useState(false)
    const [visibleForm, setVisibleForm] = useState(false)
    const [spaImage, setSpaImage] = useState("s")
    const [spaImgUrl, setSpaImgUrl] = useState(false)
    const token = localStorage.getItem('token')
    // console.log('editSpaForm => ', editSpaForm);
    const handleEditSpaForm = (params) => (e) => {
        setUpdatedSpa({ ...updatedSpa, [params]: e.target.value })
    }

    const deleteImage = () => {
        setUpdatedSpa({ ...updatedSpa, imgUrl: "" })
    }

    const imgCloudUpload = async (e) => {
        e.preventDefault()
        console.log(updatedSpa)
        setSaveSpaBtnActive(true)
        // console.log(updatedRoomData.imgUrl)
        if (!updatedSpa.name || !updatedSpa.details) {
            setSaveSpaBtnActive(false)
            return toast.error("Please fill all the Input Fields !")
        }
        const imgData = new FormData()
        imgData.append("file", spaImage)
        imgData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET)
        await axios.post(process.env.REACT_APP_CLOUDINARY_URL, imgData)
            .then((res) => {
                // console.log(res.data.url)
                setSpaImage(res.data.url)
                // console.log(editSpaForm)
            })
            .catch((err) => {
                alert("unable to upload Image, please try after some time !")
                setSaveSpaBtnActive(false)
                console.log(err)
            })
        // setUpdatedSpa({ ...updatedSpa, imgUrl: spaImage })
        setSpaImgUrl(true)
    }

    const saveSpa = async () => {
        if (!card) return
        let data = ({ ...updatedSpa, imgUrl: spaImage })
        await axios.put(`/spa/${card._id}`, data, {
            headers: {
                authorization: token
            }
        })
            .then((res) => {
                console.log(res)
                setSpaImgUrl(false)
                getSpaList()
                setVisibleForm(false)
                setSaveSpaBtnActive(false)
                swal({
                    title: "Good job!",
                    text: "Spa Edited Successfully!",
                    icon: "success",
                    button: "OK!",
                });
            })
            .catch((err) => {
                alert("An error occoured please try after some time !")
                setSaveSpaBtnActive(false)
                console.log(err)
            })
    }

    useEffect(() => {
        if (spaImgUrl) {
            saveSpa();
            console.log("useEffect Ran")
        }
    }, [spaImgUrl])

    return (
        <>
            <CCol className='text-end px-4 py-3'>
                <CButton className='mx-5' onClick={() => { setVisibleForm(true) }}>Edit Spa</CButton>
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
                    {updatedSpa.imgUrl ?
                        <div className="mb-4 editResortDeleteImg" style={{ textAlign: 'center' }}>
                            <CImage className='p-0 m-0' width={300} height={200} src={updatedSpa.imgUrl} />
                            <button onClick={deleteImage} className='editResortDeleteIcon'><RiDeleteBin5Fill /></button>
                        </div>
                        : null}
                    <div className="mb-4">
                        <CFormInput type="file" id="formFile" label="Upload spa image" onChange={(e) => setSpaImage(e.target.files[0])} />
                    </div>
                    <div className="mb-4">
                        <CFormInput label="Spa Name" value={updatedSpa.name} maxLength={50} onChange={handleEditSpaForm('name')} />
                    </div>
                    {/* <div className="mb-4">
                        <CFormInput type="text" size="sm" maxLength={2000} label="Location" value={editSpaForm.resortLocation} onChange={handleEditSpaForm('resortLocation')} />
                    </div> */}
                    <div>
                        <CFormTextarea label="Spa Details" maxLength={5000} onChange={handleEditSpaForm('details')} value={updatedSpa.details} />
                    </div>
                    <div>
                        <CFormTextarea label="Spa Benefits" maxLength={5000} onChange={handleEditSpaForm('benefits')} value={updatedSpa.benefits} />
                    </div>

                </CModalBody>

                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleForm(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" type='submit' disabled={saveSpaBtnActive} onClick={imgCloudUpload}>Save Spa</CButton>
                </CModalFooter>
            </CModal>
            {/* {console.log(updatedSpa)} */}
            {console.log(spaImage)}
        </>
    )
}

export default EditSpa;