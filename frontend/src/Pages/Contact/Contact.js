import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchContactUs } from "../../Redux/Slices/User";
import { useLocation, useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = ({ path = "loginsignup" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const { currentUser } = users;

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: currentUser?.otherDeatils?.name ?? "",
    email: currentUser?.otherDeatils?.email ?? "",
    message: "",
  });
  let name;
  let value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const contactSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = userData;
    if (!name || !email || !message) {
      alert("please fill all details");
    }
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (!storedUserInfo) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    dispatch(
      FetchContactUs({
        name,
        email,
        message,
        userId: currentUser?.otherDeatils?._id,
      })
    );
    setUserData({ ...userData, message: "" });
  };
  return (
    <>
      <div className="contact">
        <h2>Contact Us</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.9842993059196!2d85.00840087445927!3d24.795991147835952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32a3d0d5ec137%3A0x36e4502d95c59c2d!2sKiran%20Cinema!5e0!3m2!1sen!2sin!4v1695652125206!5m2!1sen!2sin"
          title="Unique Title"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="contact-form">
          <form onSubmit={contactSubmit}>
            <div className="form-input">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="your name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="your email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <textarea
              type="text"
              className="textarea"
              placeholder="your message"
              name="message"
              value={userData.message}
              onChange={handleChange}
            />
            <br />
            <button type="submit" className="contact-btn">
              Send message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
