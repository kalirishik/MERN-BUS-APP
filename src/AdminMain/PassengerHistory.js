import { useEffect, useState } from "react";
import axios from "axios";
import "./PassengerStyle.css";
const PassengerHistory = () => {
  axios.defaults.baseURL = "http://localhost:3500";
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const Filter = (event) => {
    setRecords(
      data.filter((f) => f.name.toUpperCase().includes(event.target.value) || f.name.toLowerCase().includes(event.target.value))
    );
  };
  
  useEffect(() => {
    axios
      .get("/passengerHistory")
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
        placeholder="Search name...🔎"
      />
      <br />
      <br />
      <div>
        <table>
          <tr>
              <th>NAME</th>
              <th className="age-header">AGE</th>
              <th>PHONE NO</th>
              <th className="gender-header">GENDER</th>
              <th className="category-header">CATEGORY</th>
              <th className="seat-header">SEAT NO</th>
              <th className="service-header">SERVICE</th>
              <th className="time-header">TIME</th>
              <th>FROM</th>
              <th>TO</th>
              <th className="fare-header">ADULT FARE</th>
              <th className="fare-header">CHILD FARE</th>
              <th className="book-header"> BOOKING DATETIME</th>
          </tr>
            <tbody>
              {records.map((user, i) => (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.phoneno}</td>
                  <td>{user.gender}</td>
                  <td>{user.category}</td>
                  <td>{user.seatNo}</td>
                  <td>{user.classService}</td>
                  <td>{user.deptTime}</td>
                  <td>{user.servicePoint}</td>
                  <td>{user.destination}</td>
                  <td>{user.adultFare}</td>
                  <td>{user.childFare}</td>
                  <td>{user.selectedDatetime}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default PassengerHistory;
