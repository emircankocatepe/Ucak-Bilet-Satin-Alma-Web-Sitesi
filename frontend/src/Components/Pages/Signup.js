import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Space, Typography } from 'antd';
const { Text } = Typography;
function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDogrulama, setPasswordDogrula] = useState('');
  const [error, setError] = useState(null);

  const veriAl = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify([[email, password]])
    };

    try {
      const response = await fetch("https://v1.nocodeapi.com/emirkocatepe/google_sheets/FUsxNjFMBnzYvTGD?tabId=Sayfa1", requestOptions);
      
      if (!response.ok) {
        throw new Error(`hata: ${response.status}`);
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(`api hatasi: ${result.info}`);
      }

      return result.data;
    } catch (error) {
      console.error('Veri yakalanamadi', error);
      return [];
    }
  };

  const handleRegister = async () => {
    if (password !== passwordDogrulama) {
      setError("Sifreler eslesmiyor");
      return;
    }

    const data = await veriAl();
    console.log('Kullanici eklendi.');
    alert('kayit yapildi');
    navigate('/');
  };

  return (
    <Space direction='vertical' style={{margin: '50px 450px', width:'400px', height:'200px', paddingTop: "100px"}}>
            <Text style={{fontSize:'25px'}}>Kayit Ol</Text>
      <Input   
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input  
        type="password"
        placeholder="Sifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input  
        type="password"
        placeholder="Sifreyi yeniden girin"
        value={passwordDogrulama}
        onChange={(e) => setPasswordDogrula(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={handleRegister}>Register</Button>
      <Link to='/'>Sign In</Link>
    </Space>
  );
}

export default Signup;
