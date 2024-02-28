import { Link } from "react-router-dom";
import LoginFooter from "../Main/loginFooter";
import LoginHeader from "../Main/loginHeader";
import PassengerHistory from "./PassengerHistory";
import Navbar from "../NavMain/Navbar";

const AdminPage = () => {
    const HeaderStyle={backgroundColor:'#FF9209',color:'black',paddingTop:10,paddingBottom:10,textAlign:'center',fontSize:25,fontFamily:'sans-serif'};
  return (
    <div>
        <Navbar/>
        <LoginHeader/>
        <h1 style={HeaderStyle}>PASSENGER BOOKING HISTORY</h1>
        <PassengerHistory/>
        <Link to={'/'}>
        <button className="btn-go">GO BACK</button><br/><br/>
        </Link>
         <LoginFooter/>     
    </div>
  )
}

export default AdminPage