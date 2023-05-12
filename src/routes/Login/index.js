import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEye } from "react-icons/fa";
import { useMutation } from "react-query";
import secureLocalStorage from "react-secure-storage";

import Button from "../../components/Button";
import CardLogin from "../../components/CardLogin";
import Checkbox from "../../components/Checkbox";
import TextInput from "../../components/TextInput";

import logo from "../../assets/images/logo.svg";
import sideImage from "../../assets/images/side-image.png";
import announcementLogo from "../../assets/images/announcement.svg";
import { doLogin } from "../../services/Auth/login";
import Loading from "../../components/Loading";

const Login = (props) => {
  const [loading, setLoading] = React.useState(false);
  const { auth } = useSelector((state) => state);

  const [payload, setPayload] = React.useState({
    username: "",
    password: "",
    rememberMe: "",
  });

  const [errors, setErrors] = React.useState();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (name, value) => {
    if (value.length < 0) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const loginMutation = useMutation(doLogin);

  const handleLogin = () => {
    setLoading(true);
    loginMutation.mutate(
      {
        username: payload.username,
        password: payload.password,
        remember_me: payload.rememberMe,
      },
      {
        onSuccess: (res) => {
          secureLocalStorage.setItem("isLoggedIn", true);
          secureLocalStorage.setItem("token", res);
          alert("Berhasil login");
          setLoading(false);

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        onError: (error) => {
          alert(error);
          setLoading(false);
        },
      }
    );
  };

  return auth.isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="m-0 p-0 flex items-center w-screen h-full">
      {loading && <Loading />}
      <div className=" h-screen">
        <img src={sideImage} alt="side" className="h-screen" />
      </div>
      <div className="flex-1 h-screen flex flex-col py-12 px-[38px]">
        <div className="flex gap-4 h-[56px]">
          <img src={logo} alt="logo" className="w-[53px] h-[56px]" />
          <div className="flex flex-col">
            <span className="font-bold text-[#333333] text-base">SIAGAS</span>
            <span className="text-[#333333] text-base">KABUPATEN SORONG</span>
          </div>
        </div>
        <div className="flex gap-4 w-full mt-12">
          <Link to="/pengumuman">
            <CardLogin label="Pengumuman" image={announcementLogo} />
          </Link>
          <Link to="/panduan">
            <CardLogin label="Manual Book" image={announcementLogo} />
          </Link>
          <Link to="/dokumen">
            <CardLogin label="Petunjuk Teknis" image={announcementLogo} />
          </Link>
        </div>
        <div className="flex mt-[54px] flex-col gap-4 ml-28">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-2xl text-[#333333]">
              Selamat datang
            </span>
            <span className=" text-base text-[#828282]">
              Login dibawah untuk akses akun Anda
            </span>
          </div>
          <div className="w-3/5">
            <TextInput
              value={payload.username}
              onChange={(e) => handleChange("username", e.target.value)}
              label={"Username"}
              name="username"
              placeholder={"Masukan username"}
              errorMessage={errors?.username}
            />
          </div>
          <div className="w-3/5">
            <TextInput
              value={payload.password}
              onChange={(e) => handleChange("password", e.target.value)}
              label={"Password"}
              name="password"
              placeholder={"Masukan password"}
              icon={<FaEye />}
              type={showPassword ? "text" : "password"}
              clickIcon={() => setShowPassword(!showPassword)}
              errorMessage={errors?.password}
            />
          </div>
          <Checkbox
            checked={payload.rememberMe}
            onChange={() => handleChange("rememberMe", !payload.rememberMe)}
            label="ingatkan saya"
          />
          {/* ini buat reChapta nunggu GOOGLE SITE KEY */}
          <div className="w-28">
            <Button text="Masuk" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
