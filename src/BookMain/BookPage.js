import { useParams } from "react-router-dom";
import Navbar from "../NavMain/Navbar";
import LoginFooter from "../Main/loginFooter";
import SeatSelection from "../SeatSelection/SeatSelection";
const BookPage = () => {
    const {tripcode,classService,viaRoute,routeNo,deptTime,servicePoint,destination,adultFare,childFare,selectedDatetime}=useParams();
    const HeaderStyle={backgroundColor:'aqua',color:'black',paddingTop:10,paddingBottom:10,textAlign:'center',fontSize:30,fontFamily:'sans-serif'};
  return (
    <div>
        <Navbar/>
        <h1 style={HeaderStyle}>BOOKING & PASSENGER DETAILS </h1>
        <SeatSelection 
              tripcode={tripcode}
              classService={classService}
              viaRoute={viaRoute}
              routeNo={routeNo}
              deptTime={deptTime}
              servicePoint={servicePoint}
              destination={destination}
              adultFare={adultFare}
              childFare={childFare}
              selectedDatetime={selectedDatetime}
        />
        <br/>
        <LoginFooter/>
    </div>
  )
}

export default BookPage;