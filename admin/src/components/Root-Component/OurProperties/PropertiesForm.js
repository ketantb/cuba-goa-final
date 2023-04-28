import './OurProperties.css'
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


const PropertiesForm = ({ getPropertiesData }) => {
  const navigate = useNavigate()
  const [saveRoomBtnActive, setsaveroomBtn] = useState(false)
  const [visibleForm, setVisibleForm] = useState(false)
  const [resortForm, setResortForm] = useState({ resortImgURL: "", resortName: "", resortDescription: "", resortLocation: "" })
  const [showSelectedImg, setShowSelectedImg] = useState("")
  const [resortImage, setResortImage] = useState("")
  const handleResortForm = (params) => (e) => {
    setResortForm({ ...resortForm, [params]: e.target.value })
  }

  const postPropertyForm = async () => {
    await axios.post("https://cuba-goa-server.onrender.com/hotelbook", resortForm)
    // await axios.post("http://localhost:4001/hotelbook", resortForm)
      .then((res) => {
        console.log(res)
        getPropertiesData()
        setsaveroomBtn(false)
        setVisibleForm(false)
        swal({
          title: "Good job!",
          text: "Resort added successfully!",
          icon: "success",
          button: "OK!",
        });
      })
      .catch((err) => {
        console.log(err)
        setsaveroomBtn(false)
      })
  }

  const imgCloudUpload = async (e) => {
    e.preventDefault()
    setsaveroomBtn(true)
    if (!resortForm.resortName || !resortForm.resortLocation || !resortForm.resortDescription) {
      return toast.error("Please fill all the Input Fields !")
      setsaveroomBtn(false)
    }
    else if (!resortImage) {
      return toast.error("No Image Chosen !")
      setsaveroomBtn(false)
    }
    const imgData = new FormData()
    imgData.append("file", resortImage)
    imgData.append("upload_preset", "ketanInstaClone")
    await axios.post("https://api.cloudinary.com/v1_1/ketantb/image/upload", imgData)
      .then((res) => {
        // console.log(res)
        setResortForm({ ...resortForm, resortImgURL: res.data.secure_url })
        // console.log(resortForm)
      })
      .catch((err) => {
        console.log(err)
        setsaveroomBtn(false)
      })
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setResortImage(event.target.files[0])
      setShowSelectedImg(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    if (resortForm.resortImgURL) {
      postPropertyForm()
    }
  }, [resortForm.resortImgURL])

  return (
    <>
      <CCol className='text-end px-4 py-3'>
        <CButton className='mx-5' onClick={() => setVisibleForm(true)}>ADD ON</CButton>
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

          <div className="mb-4" style={{ textAlign: 'center' }}>
            <CImage className='p-0 m-0' width={300} height={200} src={showSelectedImg} />
          </div>
          <div className="mb-4">
            <CFormInput type="file" id="formFile" label="Upload resort image" onChange={onImageChange} />
          </div>
          <div className="mb-4">
            <CFormInput label="Resort Name" maxLength={50} onChange={handleResortForm('resortName')} />
          </div>
          <div className="mb-4">
            <CFormInput type="text" size="sm" maxLength={2000} label="Location" onChange={handleResortForm('resortLocation')} />
          </div>
          <div>
            <CFormTextarea label="Resort Info" maxLength={5000} onChange={handleResortForm('resortDescription')} />
          </div>

        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleForm(false)}>
            Close
          </CButton>
          <CButton color="primary" type='submit' disabled={saveRoomBtnActive} onClick={imgCloudUpload}>Save Resort</CButton>
        </CModalFooter>
      </CModal>

      {console.log(resortImage)}
    </>
  )
}

export default PropertiesForm