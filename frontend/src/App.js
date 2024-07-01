import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Components/Pages/MainPage';
import ConfirmationScreen from './Components/Pages/ConfirmationScreen';
import Signup from './Components/Pages/Signup';
import Login from './Components/Pages/Login';
import SeatSelection from './Components/Pages/SeatSelection';
import RezervasyonMail from './Components/Pages/ReservationMail';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/mainpage" element={<MainPage/>}></Route>
        <Route path="/seatselection/:flightID/:from/:to/:price" element={<SeatSelection />} />
        <Route path="/confirmationscreen/:flightID/:selectedSeat" element={<ConfirmationScreen />} />
        <Route path="/odendiekrani" element={<RezervasyonMail/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
