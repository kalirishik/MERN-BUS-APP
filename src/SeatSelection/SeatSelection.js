import React, { useState } from "react";
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
  };
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getSeatNumber = (e) => {
    const newSeat = e.target.value;
    if (!selectedSeats.includes(newSeat)) {
      setSelectedSeats([...selectedSeats, newSeat]);
      setPassengers((prevPassengers) => [
        ...prevPassengers,
        {
          ...initialPassengerData,
          seatNo: newSeat,
        },
      ]);
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== newSeat));
      setPassengers((prevPassengers) =>
        prevPassengers.filter((passenger) => passenger.seatNo !== newSeat)
      );
    }
  };

  const handleChange = (e, index, name) => {
    const { value } = e.target;
    const newPassengers = [...passengers];
    newPassengers[index][name] = value;
    setPassengers(newPassengers);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passengers.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    
    // Check if all passenger details are filled for selected seats
    const isAnyPassengerDataMissing = passengers.some(
      (passenger) =>
        !passenger.name ||
        !passenger.age ||
        !passenger.phoneno ||
        !passenger.gender ||
        !passenger.category
        );
        
        if (isAnyPassengerDataMissing) {
          alert("Please fill passenger details for all selected seats.");
          return;
        }
    try {
      const responses = await Promise.all(
        passengers.map(async (passenger) => {
          return await axios.post("/storeData", passenger);
        })
      );

      const allSuccess = responses.every((response) => response.data.success);
      if (allSuccess) {
        alert("Your Tickets was  booked successfully");
        navigate("/");
      } else {
        alert("Some tickets were not booked");
      }
    } catch (error) {
      console.error("Error booking tickets:", error);
      alert("Error booking tickets");
    }
  };

  const renderPassengerForms = () => {
    return selectedSeats.map((seat, index) => (
      <form key={index} className="form seatfrm">
        <br />
        <p className="text-capitalize text-center">SEAT NO: {seat}</p>
        <br />
        <br />
        <input
          className="form-control seatInp"
          onChange={(e) => handleChange(e, index, "name")}
          type="text"
          required
          name={`name ${index}`}
          placeholder="Enter Name"
        />
        <br />
        <br />
        <input
          className="form-control seatInp seatInp2"
          onChange={(e) => handleChange(e, index, "age")}
          type="number"
          required
          name={`age ${index}`}
          placeholder="Enter Age"
        />
        <br />
        <br />
        <input
          className="form-control seatInp seatInp2"
          onChange={(e) => handleChange(e, index, "phoneno")}
          type="number"
          required
          name={`phoneno ${index}`}
          placeholder="Enter Phoneno"
        />
        <br />
        <br />
        <label className="inClass">GENDER</label>
        <div className="form-check form-check-inline" required>
          <input
            className="form-check-input"
            type="radio"
            name={`gender${index}`}
            value="male"
            onChange={(e) => handleChange(e, index, "gender")}
          />
          <label className="form-check-label" htmlFor={`male${index}`}>
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={`gender${index}`}
            value="female"
            onChange={(e) => handleChange(e, index, "gender")}
          />
          <label className="form-check-label" htmlFor={`female${index}`}>
            Female
          </label>
        </div>
        <br />
        <label className="inClass">CATEGORY</label>
        <div className="form-check form-check-inline" required>
          <input
            className="form-check-input"
            type="radio"
            name={`category${index}`}
            value="adult"
            onChange={(e) => handleChange(e, index, "category")}
          />
          <label className="form-check-label" htmlFor={`adult${index}`}>
            Adult
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={`category${index}`}
            value="child"
            onChange={(e) => handleChange(e, index, "category")}
          />
          <label className="form-check-label" htmlFor={`child${index}`}>
            Child
          </label>
        </div>
        <br />
      </form>
    ));
  };

  return (
    <div className="ss">
      <div className="row">
        <div className="column1">
          <div className="plane">
            <h2 style={{ marginLeft: 170 }}>SEAT LAYOUT</h2>
            <form onChange={(e) => getSeatNumber(e)}>
              <ol className="cabin fuselage">
                <li className="row row--1">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="1A" id="1A" />
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
                      <input type="checkbox"  value="2A" id="2A" />
                      <label htmlFor="2A">2A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox"  value="2B" id="2B" />
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
                      <input type="checkbox"  value="3B" id="3B" />
                      <label htmlFor="3B">3B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--4">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox"  disabled value="4A" id="4A" />
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
                      <input type="checkbox" disabled value="5B" id="5B" />
                      <label htmlFor="5B">5B</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--6">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox"   disabled value="6A" id="6A" />
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
                      <input type="checkbox"  disabled value="7B" id="7B" />
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
                      <input type="checkbox"  value="8B" id="8B" />
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
                      <input type="checkbox"  disabled value="10A" id="10A" />
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
            <form className="form-group" onSubmit={handleSubmit}>
              {renderPassengerForms()}
              <button className="btn btn-info seatBT" type="submit">
                BOOK
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
