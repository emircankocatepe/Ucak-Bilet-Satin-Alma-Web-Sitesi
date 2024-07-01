import React, { useState, useEffect } from 'react';
import { Layout, Space, Button, Select, DatePicker, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const MainPage = () => {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [airline, setAirline] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [ilkAtama, setIlkAtama] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://v1.nocodeapi.com/emirkocatepe/google_sheets/zCCJOufLsSLMgFBz?tabId=Sayfa1")
      .then(response => response.json())
      .then(result => {
        setIlkAtama(result.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('ucus verisi cekilemedi', error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = () => {
    setIsLoading(true); 

    let filteredFlights = ilkAtama;

    if (from) {
      filteredFlights = filteredFlights.filter(flight => flight.from === from);
    }
    if (to) {
      filteredFlights = filteredFlights.filter(flight => flight.to === to);
    }
    if (dateRange) {
      const [start, end] = dateRange;
      filteredFlights = filteredFlights.filter(flight => flight.date >= start.format('DD-MM-YYYY') && flight.date <= end.format('DD-MM-YYYY'));
    }
    if (airline) {
      filteredFlights = filteredFlights.filter(flight => flight.airline === airline);
    }

    setFlights(filteredFlights);
    setIsLoading(false);
  };

  useEffect(() => {
    if (flights.length > 0) {
      let filtreliUcuslar = [...flights];

      if (isDirect) {
        filtreliUcuslar = filtreliUcuslar.filter(flight => flight.aktarma === 'Direkt');
      }

      if (sortBy === 'price') {
        filtreliUcuslar.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'duration') {
        filtreliUcuslar.sort((a, b) => a.sure - b.sure);
      }

      setFlights(filtreliUcuslar);
    }
  }, [isDirect, sortBy]); 

  const handleDirect = (e) => {
    setIsDirect(e.target.checked);
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <h1 style={{ color: 'white', fontSize: '35px' }}>biletBurada</h1>
        <Button onClick={handleLogout} style={{marginLeft:'35px'}}>Logout</Button>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Space size={12} style={{ gap: '9px' }}>
          <Select
            style={{ width: '200px', height: '40px', marginTop: '20px' }}
            showSearch
            placeholder="nereden"
            optionFilterProp="label"
            onChange={(value) => setFrom(value)}
            options={[
              { value: 'New York', label: 'New York' },
              { value: 'London', label: 'London' },
              { value: 'Toronto', label: 'Toronto' },
              { value: 'Doha', label: 'Doha' },
              { value: 'Sevilla', label: 'Sevilla' },
              { value: 'Moskova', label: 'Moskova' },
              { value: 'Tokyo', label: 'Tokyo' },
            ]}
          />
          <Select
            style={{ width: '200px', height: '40px', marginTop: '20px' }}
            showSearch
            placeholder="nereye"
            optionFilterProp="label"
            onChange={(value) => setTo(value)}
            options={[
              { value: 'Istanbul', label: 'Istanbul' },
              { value: 'Paris', label: 'Paris' },
              { value: 'Barcelona', label: 'Barcelona' },
              { value: 'Prag', label: 'Prag' },
              { value: 'Amsterdam', label: 'Amsterdam' },
              { value: 'Tel Aviv', label: 'Tel Aviv' },
              { value: 'Kopenhag', label: 'Kopenhag' },
              { value: 'Sofia', label: 'Sofia' },
            ]}
          />
          <DatePicker.RangePicker placeholder="ne zaman"
            style={{ height: '40px', marginRight: '50px', marginTop: '20px' }}
            onChange={(dates) => setDateRange(dates)}
          />
          <Select
            style={{ width: '200px', height: '40px', marginTop: '20px' }}
            showSearch
            placeholder="Havayolu sirketi sec"
            optionFilterProp="label"
            onChange={(value) => setAirline(value)}
            options={[
              { value: 'Turkish Airlines', label: 'Turkish Airlines' },
              { value: 'Qatar Airlines', label: 'Qatar Airlines' },
              { value: 'Delta Airlines', label: 'Delta Airlines' },
              { value: 'Air Canada', label: 'Air Canada' },
              { value: 'United Airlines', label: 'United Airlines' },
            ]}
          />
          <Button
            type="primary"
            style={{ width: '90px', height: '40px', borderRadius: 'round', marginTop: '20px' }}
            onClick={handleSearch}
          >
            Ara
          </Button>
        </Space>
        <br />
        <Space>
          <Checkbox
            style={{ marginBottom: '15px' }}
            checked={isDirect}
            onChange={handleDirect}
          >
            Direkt Ucuslar
          </Checkbox>
          <Select
            placeholder='Ucusu Filtrele'
            style={{ width: '200px', height: '40px', marginTop: '20px' }}
            onChange={handleSort}
            options={[
              { value: 'price', label: 'Once en ucuz' },
              { value: 'duration', label: 'Once en kisa' },
            ]}
          />
        </Space>
        <div style={{ minHeight: 280, padding: 24 }}>
          {isLoading ? (
            <p>Yukleniyor...</p>
          ) : (
            flights.length > 0 ? (
              flights.map(flight => (
                <div key={flight.flightID} className='showFlight'>
                  <p>From: {flight.havalimaniGidis}</p>
                  <p>To: {flight.havalimaniVaris}</p>
                  <p>Date: {flight.date}</p>
                  <p>Yolculuk Suresi: {flight.sure} saat</p>
                  <p>Aktarma: {flight.aktarma}</p>
                  <p>Price: {flight.price} TL</p>
                  <p>Airline: {flight.airline}</p>
                  <p>ID: {flight.flightID}</p>
                  <hr />
                  <Link to={`/seatselection/${flight.flightID}/${flight.from}/${flight.to}/${flight.price}`}>
                    <Button>Bu ucusu Sec</Button>
                  </Link>
                </div>
              ))
            ) : (
              <p>Ucuslari gormek icin arama yapin.</p>
            )
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainPage;
