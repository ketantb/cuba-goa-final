const intitalData = {
    checkIn: null,
    checkOut: null
}



const DatesReducer = (state = intitalData, action) => {
    switch (action.type) {
        case 'set_checkin':
            return {
                ...state,
                checkIn: action.payload.checkindate
            };

        case 'set_checkout':
            return {
                ...state,
                checkOut: action.payload.checkoutdate
            };

        default: {
            return state
        }
    }
}


export default DatesReducer