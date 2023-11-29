import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../Redux/Slices/User";
import Options from "./Options";
import CircularProgress from "@mui/material/CircularProgress";

const MyProfile = ({ path = "loginsignup" }) => {
  const [option, setOption] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const { UserAllDetails, currentUser, loading } = users;
  const { _id, name, email, createdAt, pic } = UserAllDetails;
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  useEffect(() => {
    if (!storedUserInfo || !currentUser) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    dispatch(fetchUserData());
    // eslint-disable-next-line
  }, [dispatch, _id]);

  return (
    <>
      <div className="my-profile">
        {loading ? (
          <div
            style={{
              position: "relative",
              left: "50%",
              marginTop: "50px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="top">
              <h2>My Profile</h2>
              <span onClick={() => setOption(!option)}>
                <img src={pic?.url} alt="user" />
              </span>
            </div>
            {option && <Options setOption={setOption} />}
            <div className="bottom">
              <img src={pic?.url} alt="profile" />
              <div className="profile-details">
                <div className="name">
                  <h4>Name</h4>
                  <p>{name}</p>
                </div>
                <div className="email">
                  <h4>Email</h4>
                  <p>{email}</p>
                </div>
                <div className="joined-date">
                  <h4>Joined On</h4>
                  <p>{formattedDate}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyProfile;
