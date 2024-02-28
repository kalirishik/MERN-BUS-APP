import "./ContactStyle.css";
import React from 'react';
function Contact() {
  return (
    <div className="containerStyle">
      <h1>CONTACT US</h1>
      <h4>If you have any questions or need assistance, please feel free to contact us:</h4>
      
      <div className="infoStyle">
        <h2>Address:</h2>
        <p style={{textAlign:'center'}}>4th Street,mariyamman kovil, | 2th street,coronation colony</p>
        <p style={{textAlign:'center'}}>Rameshwaram,Tamilnadu,623531 | Sivakasi,Tamilnadu,654321</p>
      </div>
      
      <div  className=" infoStyle ">
        <h2>Phone:</h2>
        <p style={{textAlign:'center'}}>123-456-7890</p>
      </div>
      
      <div className=" infoStyle ">
        <h2>Email:</h2>
        <p style={{textAlign:'center'}}>krhv2023@gamil.com</p>
      </div>
    </div>
  );
}

export default Contact;
