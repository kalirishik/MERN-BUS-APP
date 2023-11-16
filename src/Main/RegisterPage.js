import "./LoginPage.css";
import { useState } from "react";
import axios from "axios";
import LoginPage from "./LoginPage";
export default function RegisterPage() {
    axios.defaults.baseURL = "http://localhost:3500";
    const [showRegisterPage, setShowRegisterPage] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    function handleRegisterPage() {
        setShowRegisterPage(true);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post("/create", formData);
        console.log(data);
        if (data.data.success) {
            setFormData({
                username: "",
                email: "",
                password: "",
              });
            setShowLogin(true);
            alert(data.data.message);
        } else alert("Already Registered this email");
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }});
    };
    return (
        <div>
            {!showRegisterPage ? (
                !showLogin ? (
                    <div>
                        <div className="formStyles">
                            <div className="child">
                                <form metthod="post" onSubmit={handleSubmit}>
                                    <label>USRNAME:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                    />
                                    <br />
                                    <br />
                                    <label>EMAIL ID: </label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                    />
                                    <br />
                                    <br />
                                    <label>PASSWORD: </label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        required
                                    />
                                    <br />
                                    <br />
                                    <input type="submit" value="SUBMIT" />
                                </form>
                            </div>
                        </div>
                        <br />
                        <br />{" "}
                        <button
                            id="myButton2"
                            style={{ marginLeft: 570 }}
                            onClick={handleRegisterPage}
                        >
                            CREATE ACCOUNT? CLICK TO LOGIN
                        </button>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                ) : (
                    <LoginPage />
                )
            ) : (
                <LoginPage />
            )}
        </div>
    );
}
