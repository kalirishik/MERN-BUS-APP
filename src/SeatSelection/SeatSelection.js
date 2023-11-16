import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Tab.css";

export default function SeatSelection({
  tripcode,
  classService,
  viaRoute,
  routeNo,
  deptTime,
  servicePoint,
  destination,
  adultFare,
  childFare,
  selectedDatetime,
}) {
  axios.defaults.baseURL = "http://localhost:3500";
  const initialPassengerData = {
    name: "",
    age: "",
    phoneno: "",
    gender: "",
    category: "",
    seatNo: "",
  };
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phoneno: "",
    gender: "",
    category: "",
    seatNo: "",
    tripcode: tripcode,
    classService: classService,
    viaRoute: viaRoute,
    routeNo: routeNo,
    deptTime: deptTime,
    servicePoint: servicePoint,
    destination: destination,
    adultFare: adultFare,
    childFare: childFare,
    selectedDatetime: selectedDatetime,
  });
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([
    "1A",
    "2A",
    "2B",
    "3B",
    "4A",
    "5C",
    "6A",
    "7B",
    "7C",
    "8B",
    "9B",
    "9C",
  ]);

  const getSeatNumber = (e) => {
    const newSeat = e.target.value;
    if (!reservedSeats.includes(newSeat) && !selectedSeats.includes(newSeat)) {
      setSelectedSeats([...selectedSeats, newSeat]);
    } else if (selectedSeats.includes(newSeat)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== newSeat));
    }
  };
  const handleChange = (e, name) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name.trim() === "" ||
      formData.age.trim() === "" ||
      formData.phoneno.trim() === "" ||
      formData.gender.trim() === "" ||
      formData.category.trim() === ""
    ) {
      alert("Please fill in all the fields before booking.");
      return;
    } else {
      const data = {
        ...formData,
        seatNo: selectedSeats[0], // Assuming only one seat is selected
      };
      const response = await axios.post("/storeData", data);
      console.log(response);
      if (response.data.success) {
        setFormData({
          name: "",
          age: "",
          phoneno: "",
          gender: "",
          category: "",
          seatNo: "",
          tripcode: tripcode,
          classService: classService,
          viaRoute: viaRoute,
          routeNo: routeNo,
          deptTime: deptTime,
          servicePoint: servicePoint,
          destination: destination,
          adultFare: adultFare,
          childFare: childFare,
          selectedDatetime: selectedDatetime,
        });
        setSelectedSeats([]);
        alert(response.data.message);
        navigate("/");
      } else {
        alert("Ticket was not booked");
      }
    }
  };
  const renderPassengerData = (formData, index) => {
    return (
      <form key={index} className="form seatfrm">
        <br />
        <p className="text-capitalize text-center">
          SEAT NO: {selectedSeats[index]}
        </p>
        <br />
        <br />
        <input
          className="form-control seatInp"
          onChange={(e) => handleChange(e, "name")}
          type="text"
          required
          name="name"
          placeholder="Enter Name"
        />
        <br />
        <br />
        <input
          className="form-control seatInp seatInp2"
          onChange={(e) => handleChange(e, "age")}
          type="number"
          name="age"
          placeholder="Enter Age"
          required
        />
        <br />
        <br />
        <input
          className="form-control seatInp seatInp2"
          onChange={(e) => handleChange(e, "phoneno")}
          type="number"
          name="phoneno"
          placeholder="Enter Phoneno"
          required
        />
        <br />
        <br />
        <label className="inClass">GENDER</label>
        <div className="form-check form-check-inline" required>
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={(e) => handleChange(e, "gender")}
          />
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={(e) => handleChange(e, "gender")}
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
        <br />
        <label className="inClass">CATEGORY</label>
        <div className="form-check form-check-inline" required>
          <input
            className="form-check-input"
            type="radio"
            name="category"
            value="adult"
            checked={formData.category === "adult"}
            onChange={(e) => handleChange(e, "category")}
          />
          <label className="form-check-label" htmlFor="adult">
            Adult
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            value="child"
            checked={formData.category === "child"}
            onClick={(e) => handleChange(e, "category")}
          />
          <label className="form-check-label" htmlFor="child">
            Child
          </label>
        </div>
        <br />
      </form>
    );
  };

  return (
    <div className="ss">
      <div className="row">
        <div className="column1">
          <div className="plane">
            <h2>SEAT LAYOUT</h2>
            <form onChange={(e) => getSeatNumber(e)}>
              <ol className="cabin fuselage">
                <li className="row row--1">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" disabled value="1A" id="1A" />
                      <label htmlFor="1A">1A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" id="1B" value="1B" />
                      <label htmlFor="1B">1B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--2">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" disabled value="2A" id="2A" />
                      <label htmlFor="2A">2A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" disabled value="2B" id="2B" />
                      <label htmlFor="2B">2B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--3">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="3A" id="3A" />
                      <label htmlFor="3A">3A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" disabled value="3B" id="3B" />
                      <label htmlFor="3B">3B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--4">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" disabled value="4A" id="4A" />
                      <label htmlFor="4A">4A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="4B" id="4B" />
                      <label htmlFor="4B">4B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--5">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="5A" id="5A" />
                      <label htmlFor="5A">5A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="5B" id="5B" />
                      <label htmlFor="5B">5B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--6">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" disabled value="6A" id="6A" />
                      <label htmlFor="6A">6A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="6B" id="6B" />
                      <label htmlFor="6B">6B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--7">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="7A" id="7A" />
                      <label htmlFor="7A">7A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" disabled value="7B" id="7B" />
                      <label htmlFor="7B">7B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--8">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="8A" id="8A" />
                      <label htmlFor="8A">8A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" disabled value="8B" id="8B" />
                      <label htmlFor="8B">8B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--9">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="9A" id="9A" />
                      <label htmlFor="9A">9A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" disabled value="9B" id="9B" />
                      <label htmlFor="9B">9B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--10">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="10A" id="10A" />
                      <label htmlFor="10A">10A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="10B" id="10B" />
                      <label htmlFor="10B">10B</label>
                    </li>
                  </ol>
                </li>
              </ol>
            </form>
            <br />
          </div>
        </div>
        <div className="column2">
          <div className="seatInfo">
            <form className="form-group">
              {selectedSeats.map((seat, index) => (
                <div key={index}>
                  {renderPassengerData(formData, index)}
                  <button
                    className="btn btn-info seatBT"
                    onClick={(e) => handleSubmit(e, index)}
                  >
                    BOOK
                  </button>
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
