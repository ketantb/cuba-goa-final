
import React, { useEffect, useState } from 'react'
import './Gallery.css'
import axios from '../../../helpers/axios'
import Images from './Images'
import Footer from '../Footer/Footer'
import { Box, Button, Typography, Modal } from '@mui/material'
import { Icon } from 'react-icons-kit'
import { cross } from 'react-icons-kit/icomoon/cross'


const style = {
    position: 'absolute',
    top: '52%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '35rem',
    bgcolor: 'background.paper',
    border: '1x solid #000',
    boxShadow: 1000,
    p: 0.5,
};

const Gallary = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
         // eslint-disable-next-line
    },[])
    
    
    const [allProperties, setAllProperties] = useState([])
    const [resortName, setResortName] = useState('')
    const [getData, setGetData] = useState(false)
    const [images, setImages] = useState([])
    const [active, setActive] = useState(false)
    const [bgcolor, setBgColor] = useState('')
    const [fullimg, setFullimg] = useState('')

    const getPropertiesData = async () => {
        await axios.get(`/hotelbook`)
            // await axios.get(`http://localhost:4001/hotelbook`)
            .then((res) => {
                // console.log('property list', res.data)
                setAllProperties(res.data)
                setGetData(true)
                //    setSelectedVal([res.data[0].resortName, res.data[0]._id])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getPropertiesData();
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (getData) {
            setResortName(allProperties[0]?.resortName)

            const arr = []
            for (let i = 0; i < allProperties[0].rooms.length; i++) {
                for (let j = 0; j < allProperties[0].rooms[i].imgUrl.length; j++) {
                    arr.push(allProperties[0]?.rooms[i].imgUrl[j])
                }
            }
            console.log('default arr', arr)
            setImages(arr)
        }
        // eslint-disable-next-line
    }, [getData])



    // getImages
    const handleGetImages = async (id, name) => {
        try {
            const response = await axios.post(`/images/${id}`)
            if (response.data.success) {
                console.log('images',response)
                setActive(true)

                setResortName(response.data.resort[0]?.resortName)
                const arr = []
                for (let i = 0; i < response.data.resort[0]?.rooms.length; i++) {
                    for (let j = 0; j < response.data.resort[0]?.rooms[i].imgUrl.length; j++) {
                        arr.push(response.data.resort[0]?.rooms[i].imgUrl[j])
                    }
                }
                // console.log(arr)
                setImages(arr)


            }
        }
        catch (err) {
            console.log(err)
        }
    }


    // MODAL
    const [open, setOpen] = React.useState(false);
    const handleOpen = (img) => {
        setOpen(true);
        setFullimg(img)
        console.log(img)
    };
    const handleClose = () => { setOpen(false) };

    return (
        <>
            <div className='gallery-wrap'>
                <div className='header-navbar'>
                    {allProperties.map((resort, i) => {
                        return (
                            <div key={i + 1} >
                                <p onClick={() => handleGetImages(resort._id, resort.resortName)}
                                    style={{ color: 'black' }}>
                                    {resort.resortName}
                                </p>
                            </div>
                        )
                    })}
                </div>

                <Images images={images} interval={1300} />


                <p style={{ marginLeft: '3rem', color: 'lightgrey', marginTop:'3rem' }}>click on image for full view</p>
                <div className='gallery-innerwrap'>
                    {images.map((img, i) => {
                        return (
                            <div key={i+1} >
                                <img src={img} alt='' onClick={() => handleOpen(img)} />
                            </div>
                        )
                    })}

                </div>

                {/* <Images images={images} interval={1800} />
                <div><h4 style={{ color: 'black' }}>{resortName}</h4></div> */}



                <div className='modal-wrap'  >
                    <Modal data-aos='zoom-out'
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >

                        <Box sx={style}  >
                            <Icon icon={cross} size={25} style={
                                {
                                    marginTop: '0',
                                    position: 'absolute',
                                    top: '2%',
                                    left: '2%',
                                    color: 'orangered',
                                }}
                                onClick={handleClose} />

                            <img src={fullimg} alt='' style={{ width: '100%', height: '100%', padding: '0' }} />
                        </Box>
                    </Modal>
                </div>
            </div>
            <Footer />
        </>


    )
}

export default Gallary
