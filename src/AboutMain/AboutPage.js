import "./AboutStyle.css";
import {TfiInstagram} from "react-icons/tfi";
import kaliImg from "../Img/kali.jpg";
import harshaImg from "../Img/harsha.jpg";
const AboutPage = () => {
  const HeaderStyle={backgroundColor:'aqua',color:'black',paddingTop:10,paddingBottom:10,textAlign:'center',fontSize:40,fontFamily:'sans-serif'};
  return (
    <div>
      <h1 style={HeaderStyle}>ABOUT US</h1>
      <div className="parent">
        <div className="child1">
            <img src={kaliImg} alt="kali" />
            <p>He is a student of Sri Shakthi Institute of Engineering and technology practicing 3 year in BE CSE</p><p className="iconStyle2" ><TfiInstagram
            className="iconStyle1"/> Instagram : @kali_rishi_k</p>
        </div>
        <div className="child2">
            <img src={harshaImg} alt="harsha" /><br/><br/>
            <p>He is a student of Sri Shakthi Institute of Engineering and technology practicing 3 year in BE CSE</p><p className="iconStyle2"><TfiInstagram
            className="iconStyle1"/> Instagram : @_dranzy_</p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage