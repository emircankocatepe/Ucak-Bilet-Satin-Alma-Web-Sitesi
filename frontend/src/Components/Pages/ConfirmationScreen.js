import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Layout, Space, DatePicker, Input, InputNumber, Typography, theme, Button, Divider } from 'antd';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;

const ConfirmationScreen = () => {
  const { flightID, selectedSeat } = useParams();
  const location = useLocation();
  const { from, to, selectedSeatPrice, price } = location.state || {};

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const ucusFiyat = parseFloat(price);
  const koltukFiyat = parseFloat(selectedSeatPrice);
  const toplamFiyat = ucusFiyat + koltukFiyat;

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <h1 style={{ color: 'white', fontSize: '35px' }}>Ödeme Ekranı</h1>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div style={{ background: colorBgContainer, minHeight: 330, padding: 24, borderRadius: borderRadiusLG }}>
          <Space direction="horizontal" style={{ gap: '240px' }}>
            <Space direction="vertical" style={{ marginTop: '80px', marginLeft: '100px' }}>
              <Space direction="vertical">
                <Space>
                  <Input placeholder="Cardholder Name" />
                  <Input placeholder="Cardholder Surname" />
                </Space>
                <Input placeholder="Card Number" />
              </Space>
              <Space style={{ marginLeft: '50px' }}>
                <DatePicker.MonthPicker placeholder="YYYY/MM" />
                <InputNumber placeholder="CVV" min={100} max={999} />
                <Link to="/odendiekrani/"><Button>ÖDE</Button></Link>
              </Space>
            </Space>
            <Space direction="vertical">
              <Space direction="vertical" style={{ gap: '9px' }}>
              <Text style={{ fontSize: '30px'}}>Toplam: <Text style={{ fontWeight: 'bold', fontSize: '35px' }}>{toplamFiyat} TL</Text></Text>
                <Divider plain>Hesap Özeti</Divider>
                <Text style={{ fontSize: '20px' }}>1 Uçak Bileti: <Text style={{ fontWeight: 'bold', fontSize: '22px' }}>{ucusFiyat} TL</Text></Text>
                <Text style={{ fontSize: '20px' }}>1 Koltuk Rezervasyonu: <Text style={{ fontWeight: 'bold', fontSize: '22px' }}>{koltukFiyat} TL</Text></Text>
                <Text style={{ fontSize: '20px' }}>Nereden: <Text style={{ fontWeight: 'bold', fontSize: '25px' }}>{from}</Text> Nereye: <Text style={{ fontWeight: 'bold', fontSize: '25px' }}>{to}</Text></Text>
                <Text style={{ fontSize: '20px' }}>Seçilen Koltuk Numarası: <Text style={{ fontWeight: 'bold', fontSize: '22px' }}>{selectedSeat}</Text></Text>
              </Space>
            </Space>
          </Space>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default ConfirmationScreen;
