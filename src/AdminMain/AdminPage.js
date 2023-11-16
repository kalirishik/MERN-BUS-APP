import PassengerHistory from "./PassengerHistory";

const AdminPage = ({setAdminRedirect}) => {
    const HeaderStyle={backgroundColor:'#FF9209',color:'black',paddingTop:10,paddingBottom:10,textAlign:'center',fontSize:25,fontFamily:'sans-serif'};
  return (
    <div>
        <h1 style={HeaderStyle}>PASSENGER BOOKING HISTORY</h1>
        <PassengerHistory/>
        <button className="btn-go" onClick={() => setAdminRedirect(false)}>
                GO BACK
              </button><br/><br/>
    </div>
  )
}

export default AdminPage