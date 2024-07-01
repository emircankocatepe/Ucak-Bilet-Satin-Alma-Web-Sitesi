import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Layout } from 'antd';
import './SeatSelection.css';

const { Header, Content, Footer } = Layout;

const SeatSelection = () => {
  const { flightID, from, to, price } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedSeatPrice, setSelectedSeatPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch("https://v1.nocodeapi.com/emirkocatepe/google_sheets/zCCJOufLsSLMgFBz?tabId=Sayfa2");
        const result = await response.json();
        const filteredSeats = result.data.filter(seat => seat.flightID.toString() === flightID);
        setSeats(filteredSeats);
      } catch (error) {
        console.error('koltuk verisi alinamiyor', error);
      }
    };
    fetchSeats();
  }, [flightID]);

  const handleSeatSelect = (seatNumber) => {
    const selected = seats.find(seat => seat.seats === seatNumber.toString());
    if (selected && selected.availability === 'bos') {
      setSelectedSeat(seatNumber);
      setSelectedSeatPrice(selected.price);
    }
  };

  const updateSeatAvailability = async (seat, availability) => {
    const updatedSeats = seats.map(s => (s.seats === seat.seats ? { ...s, availability } : s));
    setSeats(updatedSeats);

    const putData = {
      row_id: seat.row_id,
      flightID: seat.flightID,
      seats: seat.seats,
      availability,
      price: seat.price,
    };

    try {
      await fetch('https://v1.nocodeapi.com/emirkocatepe/google_sheets/zCCJOufLsSLMgFBz?tabId=Sayfa2', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putData),
      });
    } catch (error) {
      console.error('koltuk guncellemede hata', error);
    }
  };

  const handleConfirmSelection = async () => {
    if (selectedSeat) {
      const selectedSeatData = seats.find(seat => seat.seats === selectedSeat.toString());
      await updateSeatAvailability(selectedSeatData, 'dolu');
      navigate(`/confirmationscreen/${flightID}/${selectedSeat}`, {
        state: { from, to, selectedSeat, selectedSeatPrice, price },
      });
    } else {
      const bosKoltuklar = seats.filter(seat => seat.availability === 'bos');
      const rastgeleKoltuk = bosKoltuklar[Math.floor(Math.random() * bosKoltuklar.length)];
      if (rastgeleKoltuk) {
        await updateSeatAvailability(rastgeleKoltuk, 'dolu');
        navigate(`/confirmationscreen/${flightID}/${rastgeleKoltuk.seats}`, {
          state: { from, to, selectedSeat: rastgeleKoltuk.seats, selectedSeatPrice: 0, price },
        });
      }
    }
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <h1 style={{ color: 'white', fontSize: '35px' }}>Yerinizi ayirin.</h1>
      </Header>
      <Content>
        <div>
          <h1>Secilen Ucus: {from} - {to}</h1>
          <div className="seat-grid">
          {seats.map(seat => (
            <Button
              key={seat.seats}
              className={`seat-box ${selectedSeat === seat.seats ? 'selected' : ''}`}
              style={{ backgroundColor: seat.availability === 'bos' ? 'rgb(3, 186, 3)' :  'rgb(232, 58, 58)' }}
              onClick={() => handleSeatSelect(seat.seats)}
              disabled={seat.availability !== 'bos'}
              title={seat.availability === 'bos' ? `${seat.price} TL` : 'dolu'}
            >
              {seat.seats}
            </Button>
          ))}
        </div>

          {selectedSeat ? (
            <div>
              <h2>Secilen Koltuk: {selectedSeat}</h2>
              <h2>Fiyat: {selectedSeatPrice} TL</h2>
            </div>
          ) : (
            <h2>Secim yapilmazsa rastgele yerlestirilecek ve bunun icin ucret tahsil edilmeyecek.</h2>
          )}
          <Button type="primary" onClick={handleConfirmSelection}>Yerlestir</Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default SeatSelection;
