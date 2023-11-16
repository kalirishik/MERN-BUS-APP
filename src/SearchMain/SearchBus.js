import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import "./SearchBusStyle.css";
const SearchBus = ({setShowBus}) => {
  const [selectedDatetime, setSelectedDatetime] = useState(new Date());
  axios.defaults.baseURL = "http://localhost:3500";
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const Filter = (event) => {
    setRecords(
      data.filter((f) => f.destination.toUpperCase().includes(event.target.value) ||f.destination.toLowerCase().includes(event.target.value))
    );
  };
  
  useEffect(() => {
    axios
      .get("/searchBus")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <input
        type="text"
        name="search2"
        onChange={Filter}
        className="search-box" autoFocus
        placeholder="Search Destination...🔎"
      /><br/><br/>
      <input
        type="datetime-local"   value={selectedDatetime.toISOString().slice(0,16)}
        name="date1"  onChange={(e)=>setSelectedDatetime(new Date(e.target.value))}
        className="search-box" 
      />
      <br />
      <br />
      <div>
        <table>
          <tr>
              <th>TRIPCODE</th>
              <th>CLASS OF SERVICE</th>
              <th>VIA,ROUTE</th>
              <th>ROUTE NO</th>
              <th>DEPT.TIME</th>
              <th>SERVICE START POINT</th>
              <th>DESTINATION</th>
              <th>ADULT FARE</th>
              <th>CHILD FARE</th>
              <th>SELECT SERVICE</th>
          </tr>
            <tbody>
              {records.map((user, i) => (
                <tr key={i}>
                  <td>{user.tripcode}</td>
                  <td>{user.class}</td>
                  <td>{user.via}</td>
                  <td>{user.routeNo}</td>
                  <td>{user.deptTime}</td>
                  <td>{user.servicePoint}</td>
                  <td>{user.destination}</td>
                  <td>{user.adultFare}</td>
                  <td>{user.childFare}</td>
                  <td>
                    <Link to={`/booking/${user.tripcode}/${user.class}/${user.via}/${user.routeNo}/${user.deptTime}/${user.servicePoint}/${user.destination}/${user.adultFare}/${user.childFare}/${selectedDatetime.toISOString().slice(0, 16)}`}>
                      <button className="btn">BOOK</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      <button className="btn-go" onClick={()=>setShowBus(false)}>GO BACK</button><br/><br/><br/>
    </div>
  );
};

export default SearchBus;
