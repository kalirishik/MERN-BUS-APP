import "./LoginPage.css";
import RegisterPage from "./RegisterPage";
import { useState } from "react";
import axios from "axios";
import AdminPage from "../AdminMain/AdminPage";
import SearchBus from "../SearchMain/SearchBus";
import {useNavigate} from "react-router-dom";
export default function LoginPage({ setShowLogin }) {
  axios.defaults.baseURL = "http://localhost:3500";
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showBus, setShowBus] = useState(false);
  const [adminRedirect, setAdminRedirect] = useState(false);
  function handleLoginPage() {
    setShowLoginPage(true);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/SignIn", formData);
    console.log(data);
    if (data.data.success) {
      if (data.data.redirectToAdmin) {
        alert(data.data.message);
        navigate("/AdminPanel");
        // setAdminRedirect(true);
      } else {
        setFormData({});
        setShowBus(true);
        alert(data.data.message);
      }
    } else alert("User not found. Please Register first.");
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div>
         {!showLoginPage ? (
          !showBus ? (
            <div>
              <div className="formStyles">
                <div className="child">
                  <form onSubmit={handleSubmit}>
                    <label>EMAIL ID: </label>
                    <input
                      type="email"
                      required
                      name="email"
                      autoFocus
                      onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label>PASSWORD: </label>
                    <input
                      type="password"
                      required
                      name="password"
                      onChange={handleChange}
                    />
                    <br />
                    <br />
                    <input type="submit" value="SUBMIT" />
                  </form>
                </div>
              </div>
              <br />
              <br />
              <button id="myButton2" onClick={handleLoginPage}>
                DON'T HAVE AN ACCOUNT? CREATE ACCOUNT
              </button>
              <br />
              <br />
              <br />
              <br />
              <button className="btn-go" onClick={() => setShowLogin(false)}>
                GO BACK
              </button>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          ) : (
            <SearchBus setShowBus={setShowBus} />
          )
        ) : (
          <RegisterPage />
        )
        }
    </div>
  );
}
