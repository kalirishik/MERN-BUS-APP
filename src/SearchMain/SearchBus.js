import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SearchBusStyle.css";
const SearchBus = ({ setShowBus }) => {
  const [selectedDatetime, setSelectedDatetime] = useState(new Date());
  const [startingPlace, setStartingPlace] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  axios.defaults.baseURL = "http://localhost:3500";
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  useEffect(() => {
    filterRecords();
  }, [startingPlace, destinationPlace]);

  const filterRecords = () => {
    const filteredData = data.filter(
      (item) =>
        item.servicePoint
          .toLowerCase()
          .includes(
            startingPlace.toLowerCase() || startingPlace.toUpperCase()
          ) &&
        item.destination
          .toLowerCase()
          .includes(
            destinationPlace.toLowerCase() || destinationPlace.toUpperCase()
          )
    );
    setRecords(filteredData);
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
        name="search1"
        value={startingPlace}
        onChange={(e) => setStartingPlace(e.target.value)}
        className="search-box"
        autoFocus
        placeholder="Search Start place...🔎"
      />
      <br />
      <br />
      <input
        type="text"
        name="search2"
        value={destinationPlace}
        onChange={(e) => setDestinationPlace(e.target.value)}
        className="search-box"
        placeholder="Search End place...🔎"
      />
      <br />
      <br />
      <input
        type="datetime-local"
        value={selectedDatetime.toISOString().slice(0, 16)}
        name="date1"
        onChange={(e) => setSelectedDatetime(new Date(e.target.value))}
        className="search-box"
      />
      <br />
      <br />
      <div>
        <table>
          <tr>
            <th>TRIPCODE</th>
            <th>CLASS OF SERVICE</th>
            <th>VIA.ROUTE</th>
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
                  <Link
                    to={`/booking/${user.tripcode}/${user.class}/${user.via}/${
                      user.routeNo
                    }/${user.deptTime}/${user.servicePoint}/${
                      user.destination
                    }/${user.adultFare}/${user.childFare}/${selectedDatetime
                      .toISOString()
                      .slice(0, 16)}`}
                  >
                    <button className="btn">BOOK</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn-go" onClick={() => setShowBus(false)}>
        GO BACK
      </button>
      <br />
      <br />
      <br />
    </div>
  );
};

export default SearchBus;
