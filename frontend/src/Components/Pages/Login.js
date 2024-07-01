import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Input, Space, Alert, Typography} from 'antd';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;
function Login({ girisBasarili }){
    
        const navigate = useNavigate();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState(null);
      
        const veriGetir = async () => {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
      
          var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
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
      
        const handleLogin = async () => {
          const data = await veriGetir();
          const user = data.find(row => row.email === email && row.password === password);
      
          if (user) {
           
            console.log('Giris basaili:', user);
            navigate('/mainpage'); 
          } else {
           console.log('email veya sifre yanlis');
           alert("Kullanici Adi veya Sifreniz yanlis")
          }
        } 
    return(
        <Space direction='vertical' style={{margin: '50px 450px', width:'400px', height:'200px', paddingTop: "100px"}}>
            <Text style={{fontSize:'25px'}}>Giris yap</Text>
            <Input   
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        ></Input>
            <Input  
        type="password"
        placeholder="sifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        ></Input>
            <Button onClick={handleLogin}>Giris yap</Button>
            <Link to='/signup'>Kayit ol</Link>
        </Space>
        
        
    )
}
export default Login