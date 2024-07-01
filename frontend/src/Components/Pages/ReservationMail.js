import { Alert } from "antd"
import React from "react"
const RezervasyonMail =() => {
    return (
        <Alert
        style={{margin: '150px 456px', width:'400px', height:'200px', paddingTop: "60px"}}
      message="Rezervasyon Basarili"
      description="Sectiginiz ucusa dair detayli bilgi icin mailinizi kontrol edin."
      type="success"
      showIcon
    />

    )
}
export default RezervasyonMail