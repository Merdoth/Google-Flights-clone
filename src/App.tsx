
import { Routes, Route } from "react-router-dom";

import FlightsNavbar from "./components/common/FlightsNavbar";
import FlightsHome from './components/FlightsHome';
import FlightsDetails from "./components/FlightDetails";
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
    <FlightsNavbar />
    <Routes>
      <Route path="/" element={<FlightsHome />} />
      <Route path="/flight-details" element={<FlightsDetails />} />
    </Routes>
    <ToastContainer 
   position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
    />
    </>
  )
}

export default App
