import './App.css';

import {Routes, Route } from "react-router-dom";
import React from 'react';
import { useState } from 'react';
import Register from './components/Root-Component/Register/Register'
import RatingForm from './components/Root-Component/rating-form/RatingForm';
import MyBookings from './components/Root-Component/my-bookings/MyBookings';
import ViewDetails from './components/Root-Component/view-details/ViewDetails';
import Header from './components/Header/Header';
import SpaDetails from './components/Root-Component/spa/Spa-details';
import About from './components/Root-Component/About/About';
import BookingPage from './components/Root-Component/view-details/BookingPage/BookingPage'
import Gallary from './components/Root-Component/Gallary/Gallary'
import TermsConditions from './components/Root-Component/terms-conditions/TermsConditions';
import ViewRoomDetails from './components/Root-Component/view-details/View-Room-Details/View-Room-Details'
import EventPage from './components/Root-Component/event-page/EventPage';
import Spa from './components/Root-Component/spa/Spa';
import Home from './components/Root-Component/Home/Home';
//dates reducer , taking dates from home page
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import DatesReducer from './components/reducer/DatesReducer';
import OurProperties from './components/Root-Component/OurProperties/OurProperties';
import ContactUs from './components/Root-Component/Contact/ContactUs';
import SignIn from './components/Root-Component/signin/Signin';
import { Toaster } from 'react-hot-toast';
import RoomTable from './components/Root-Component/view-details/RoomTable-With-Aminities/RoomTable';




function App() {
  const store = createStore(DatesReducer)

  const [auth, setAuth] = useState('')
  return (
    <Provider store={store}>

      <div style={{ position: 'relative' }}>
        <Toaster position="top-center" reverseOrder={false} />

        <Header auth={auth} setAuth={setAuth} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path="/:resortId/:roomType/:roomId/details" element={<ViewRoomDetails />} />
          <Route path='/rating-form/:resortId' element={<RatingForm />}> </Route>
          <Route path='/my-bookings' element={<MyBookings />}> </Route>
          <Route path='/aboutus' element={<About />}></Route>
          <Route path='/booking-summary/:resortname/:resortId/:roomId' element={<BookingPage />}></Route>
          <Route path='/gallery' element={<Gallary />}></Route>
          <Route path="/events" element={<EventPage />}></Route>
          <Route path="/spa" element={<Spa />}></Route>
          <Route path='/our-properties' element={<OurProperties />}></Route>
          <Route path='/:resortname/:id/rooms' element={<ViewDetails />} ></Route>
          <Route path='/:resortname/:id/rooms-table' element={<RoomTable/>} ></Route>
          <Route path='/spa-details/:spaId' element={<SpaDetails />} ></Route>
          <Route path='/contactus' element={<ContactUs />}></Route>
          <Route path='/terms-conditions' element={<TermsConditions />}></Route>
        </Routes>


      </div >
    </Provider >

  );
}

export default App;
