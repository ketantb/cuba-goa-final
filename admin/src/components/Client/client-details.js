import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ClientDetails = () => {
    const [clientDetail, setClientDetail] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const userId = params.clientId;

    const fetchClientDetail = () => {
        fetch("/get-client-details")
        .then((res) => res.json())
        .then((data) => console.log(data)).
        catch((err) => console.log(err))
    }

    useEffect(() => {
      fetchClientDetail()
    }, [])
    console.log(userId)
    return(
        <div style={{marginTop: '7rem'}}>
           Client
        </div>
    )
}

export default ClientDetails;