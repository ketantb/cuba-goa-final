

const ResortVideo = ({ resortVideoObject, resortname }) => {
    {console.log(resortVideoObject.palolemVideo)}
    return (
        <div className="main">
            < video src={resortVideoObject.palolemVideo} autoPlay loop muted data-aos="flip-left" data-aos-delay="600" data-aos-easing="ease-in-out" type="video/mp4"/>
        </div>
    )
}

export default ResortVideo