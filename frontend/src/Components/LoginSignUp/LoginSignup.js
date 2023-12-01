import React, { useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdFace } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchLogin, fetchRegister } from "../../Redux/Slices/User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [pic, setPic] = useState(null);
  const location = useLocation();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const users = useSelector((state) => state.user);
  const { error, loading, message } = users;

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const navigate = useNavigate();

  const switchTabs = async (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const registerDataChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegisterData({ ...registerData, [name]: value });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = registerData;
    if (!name || !email || !mobile || !password) {
      return;
    }

    await dispatch(fetchRegister({ name, email, mobile, password, pic }));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      setRegisterData({
        name: "",
        email: "",
        mobile: "",
        password: "",
      });
      setPic(null);
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
  }, [message]);

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.warning("all fields are required");
    }
    await dispatch(fetchLogin({ email: loginEmail, password: loginPassword }));
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (storedUserInfo) {
      toast.success("You successfully login");
      setTimeout(() => {
        navigate(location.state || "/");
      }, 5000);
    }
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 1000);
    }
  }, [dispatch, error]);
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (storedUserInfo) {
      navigate(location.state || "/");
    }
  }, [location.state, navigate]);

  return (
    <>
      <div className="LoginSignUpContainer">
        {error && (
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MdEmail />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            {loading ? (
              <CircularProgress />
            ) : (
              <input type="submit" value="Login" className="loginBtn" />
            )}
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <MdFace />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={registerData.name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MdEmail />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={registerData.email}
                onChange={registerDataChange}
              />
            </div>
            <div>
              <MdEmail />
              <input
                type="text"
                placeholder="Phone"
                required
                name="mobile"
                value={registerData.mobile}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={registerData.password}
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage">
              <CgProfile />
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={(e) => setPic(e.target.files[0])}
              />
            </div>
            {loading ? (
              <CircularProgress />
            ) : (
              <input type="submit" value="Register" className="signUpBtn" />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
