import React, { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { Card } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import "./signIn.css";
import { basic_eye } from "react-icons-kit/linea/basic_eye";
import { basic_eye_closed } from "react-icons-kit/linea/basic_eye_closed";
import { arrows_exclamation } from "react-icons-kit/linea/arrows_exclamation";
import { arrows_circle_check } from "react-icons-kit/linea/arrows_circle_check";

import Header from "../component/Header";
import Footer from "../component/Footer";

const SignIn = ({ history }) => {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [passwordStartedTyping, setPasswordStartedTyping] = useState(false); // Track password input

  const togglePassword = () => {
    setVisible(!visible);
  };

  const { email, password } = values;

  // Validation states
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    // Check if the password field is being typed in
    if (name === "password") {
      setPasswordStartedTyping(value.length > 0);
    }

    // Validation logic
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");

    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/api/signin", {
        email,
        password,
      });

      if (data.success === true) {
        setValues({ email: "", password: "" });
        toast.success("Log In successfully");
        localStorage.setItem("token", JSON.stringify(data));
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("isAuthenticated", true);

        if (typeof window !== "undefined") {
          setTimeout(() => {
            history.push("/");
          }, 2000);
        }
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container custom_className">
        <Card style={{ margin: 250, width: "600px" }}>
          <h2 className="signup_title text-center" style={{ marginTop: 20 }}>
            {t("SIGN_IN")}
          </h2>
          <form className="col-sm-6 offset-3 pt-5 signup_form">
            <div className="form-outline mb-4">
              <label>Enter Email</label>
              <input
                onChange={handleChange}
                type="email"
                id="form4Example2"
                className="form-control"
                name="email"
                value={email}
                placeholder={t("EMAIL")}
              />
            </div>

            <div className="form-outline mb-4">
              <label>Enter Password</label>
              <input
                onChange={handleChange}
                type={visible ? "text" : "password"}
                id="form4Example3"
                className="form-control"
                name="password"
                value={password}
                placeholder={t("PASSWORD")}
              />
              <i
                className={`fas ${visible ? "fa-eye" : "fa-eye-slash"}`}
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            </div>
            {/* Validation tracker */}
            {passwordStartedTyping && (
              <main className="tracker-box">
                <ValidationItem
                  validated={lowerValidated}
                  text="At least one lowercase letter"
                />
                <ValidationItem
                  validated={upperValidated}
                  text="At least one uppercase letter"
                />
                <ValidationItem
                  validated={numberValidated}
                  text="At least one number"
                />
                <ValidationItem
                  validated={specialValidated}
                  text="At least one special character"
                />
                <ValidationItem
                  validated={lengthValidated}
                  text="At least 8 characters"
                />
              </main>
            )}
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary btn-block mb-4 mt-4"
            >
              {t("LOGIN")}
            </button>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

// Helper component for validation items
const ValidationItem = ({ validated, text }) => (
  <div className={validated ? "validated" : "not-validated"}>
    {validated ? (
      <span className="list-icon green">
        <Icon icon={arrows_circle_check} />
      </span>
    ) : (
      <span className="list-icon">
        <Icon icon={arrows_exclamation} />
      </span>
    )}
    {text}
  </div>
);

export default SignIn;
