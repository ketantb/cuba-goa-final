import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { Suspense } from 'react';
import Footer from './components/Root-Component/Footer/Footer';
import PostSpaData from "./components/Root-Component/postSpaData/PostSpaData";
import SpaDetailes from "./components/Root-Component/postSpaData/detailedSpa";
import BookingForm from "./components/Root-Component/BookingForm/BookingForm";
import ViewPropertyDetails from './components/Root-Component/OurProperties/Property-Details/PropertyDetails';
import ViewBooking from './components/Root-Component/Bookings/view-bookings';
import ClientList from './components/Client/Client-List';


const Header = React.lazy(() => import('./components/Header/Header'))
const Home = React.lazy(() => import('./components/Root-Component/Home/Home'))
const About = React.lazy(() => import('./components/Root-Component/About/About'))
const Spa = React.lazy(() => import('./components/Root-Component/spa/Spa'))

const Resorts = React.lazy(() => import('./components/Root-Component/Resorts/Resorts'))
const OurProperties = React.lazy(() => import('./components/Root-Component/OurProperties/OurProperties'))
const ContactUs = React.lazy(() => import('./components/Root-Component/Contact/ContactUs'))
const Gallery = React.lazy(() => import('./components/Root-Component/Gallery/Gallery'))
const BookingPage = React.lazy(() => import('./components/Root-Component/BookingPage/BookingPage'))
const LogIn2 = React.lazy(() => import('./components/Root-Component/LogIn2/Login2'))
const LandingPage = React.lazy(() => import('./components/Landing-Page/LandingPage.js'))
const ShowInfoOfRoomCart = React.lazy(() => import('./components/Root-Component/Home/ShowInfoOfRoomCart'))
const LearnMore = React.lazy(() => import('./components/Root-Component/Home/LearnMore'))
const ClientDetails = React.lazy(() => import('./components/Client/client-details'))

function App() {

  return (
    <div style={{ position: 'relative' }}>
      <BrowserRouter>
        <Routes>

          {/* <Route path='/log-in' element={<Suspense fallback={<p>Loading....</p>}>
            <LogIn2 />
          </Suspense>}>
          </Route> */}

          <Route path='/landing-page' element={<Suspense fallback={<p>Loading....</p>}>
            <LandingPage />
          </Suspense>}>
          </Route>

          <Route path='/bookings' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <ViewBooking />
              </>
            </Suspense>
          } />


          {/* <Route path="" element={<Header />} /> */}

          <Route path='/' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Header />
                <Home />
                <Footer />
              </>
            </Suspense>
          } />

          <Route path="/about" element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Header />
                <About />
                <Footer />
              </>
            </Suspense>
          } />

          <Route path="/spa" element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Header />
                <Spa />
                <Footer />
              </>
            </Suspense>
          } />


          <Route path='/our-properties/:name/:id' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Header />
                <BookingPage />
                <Footer />
              </>
            </Suspense>
          } />

          <Route path='/resorts' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Resorts />
              </>
            </Suspense>
          } />

          <Route path='/our-properties' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <OurProperties />
              </>
            </Suspense>
          } />

          <Route path='/:resortname/:id/rooms' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Header />
                <ViewPropertyDetails />
                <Footer />
              </>
            </Suspense>
          } />

          <Route path='/contact-us' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Header />
                <ContactUs />
                <Footer />
              </>
            </Suspense>
          } />

          <Route path='/gallery' element={
            <Suspense fallback={<p>Loading....</p>}>
              <>
                <Gallery />
                <Footer />
              </>
            </Suspense>} />

          <Route path='/view-room-info/:id/:idChild'
            element={
              <Suspense fallback={<p>Loading....</p>}>
                <ShowInfoOfRoomCart />
              </Suspense>
            } />

          <Route path="/leran-More" element={
            <Suspense fallback={<p>Loading....</p>}>
              <LearnMore />
            </Suspense>
          } />

          <Route path="/addSpa" element={
            <Suspense fallback={<p>Loading....</p>}>
              <PostSpaData />
            </Suspense>
          } />

          <Route path="/spa-details/:id" element={
            <Suspense fallback={<p>Loading....</p>}>
              <SpaDetailes />
            </Suspense>
          } />

          <Route path="/booking-form" element={
            <Suspense fallback={<p>Loading....</p>}>
              <BookingForm />
            </Suspense>
          } />

          <Route path="/client-details/:clientId" element={
            <Suspense fallback={<p>Loading....</p>}>
              <ClientDetails />
            </Suspense>
          } />

          <Route path="/our-clients" element={
            <Suspense fallback={<p>Loading....</p>}>
              <ClientList />
            </Suspense>
          } />


        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
