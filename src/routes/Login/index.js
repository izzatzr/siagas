import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEye } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import secureLocalStorage from "react-secure-storage";

import Button from "../../components/Button";
import CardLogin from "../../components/CardLogin";
import Checkbox from "../../components/Checkbox";
import TextInput from "../../components/TextInput";

import logo from "../../assets/images/logo.png";
import announcementLogo from "../../assets/images/announcement.svg";
import { doLogin } from "../../services/Auth/login";
import Loading from "../../components/Loading";
import Slider from "react-slick";

import imageOne from "../../assets/images/slider/1.jpeg";
import imageTwo from "../../assets/images/slider/2.jpeg";
import imageThree from "../../assets/images/slider/3.jpeg";
import Innovation from "./Components/Innovation";
import { GET_ALL_INNOVATION_STATISTIC } from "../../constans/constans";
import { getInnovationStatistic } from "../../services/Dashboard/InnovationStatistic/innovationStatistic";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
};

const Login = () => {
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
          const token = {
            token: res.token,
            token_expired_at: res.token_expired_at,
          };
          secureLocalStorage.setItem("isLoggedIn", true);
          secureLocalStorage.setItem("token", token);
          secureLocalStorage.setItem("user", res.role);

          setLoading(false);

          window.location.reload();

          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
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
    <div className="box-border flex flex-col w-screen h-screen bg-[#063a69]">
      {loading && <Loading />}
      {/* <div className="z-10 flex items-center justify-between w-full px-24 py-6 bg-[#063a69] text-white shadow-lg">
        <div className="flex gap-4">
          <img src={logo} alt="logo" className="w-[53px] h-[56px]" />
          <div className="flex flex-col">
            <span className="text-base font-bold">SIAGAS</span>
            <span className="text-base">KABUPATEN SORONG</span>
          </div>
        </div>
        <div className="flex items-center justify-end flex-1 gap-4">
          <Link to="/pengumuman">
            <CardLogin label="Pengumuman" image={announcementLogo} />
          </Link>
          <Link to="/manual-book">
            <CardLogin label="Manual Book" image={announcementLogo} />
          </Link>
          <Link to="/petunjuk-teknis">
            <CardLogin label="Petunjuk Teknis" image={announcementLogo} />
          </Link>
        </div>
      </div>
      <div className="w-full">
        <Slider {...settings}>
          <div className="w-full bg-red-400">
            <img
              src={imageOne}
              className="w-full object-cover h-[900px]"
              alt="Kabupaten Sorong"
            />
          </div>
          <div className="w-full bg-red-400">
            <img
              src={imageTwo}
              className="w-full object-cover h-[900px]"
              alt="Kabupaten Sorong"
            />
          </div>
          <div className="w-full bg-red-400">
            <img
              src={imageThree}
              className="w-full object-cover h-[900px]"
              alt="Kabupaten Sorong"
            />
          </div>
        </Slider>
      </div> */}
      <div className="flex items-center justify-center pb-24 bg-cover bg-[#063a69]">
        <div className="flex mt-[54px] flex-col gap-4 bg-white p-10 w-[484px] items-center shadow-lg rounded-lg">
          <div className="flex flex-col gap-2 text-center">
            <span className="font-bold text-2xl text-[#333333]">
              Selamat datang di menu inovasi
            </span>
            <span className=" text-base text-[#828282]">
              Login dibawah untuk akses akun Anda
            </span>
          </div>
          <div className="w-full">
            <TextInput
              value={payload.username}
              onChange={(e) => handleChange("username", e.target.value)}
              label={"Username"}
              name="username"
              placeholder={"Masukan username"}
              errorMessage={errors?.username}
            />
          </div>
          <div className="w-full">
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
          // <div className="flex justify-between w-full">
          //   <Checkbox
          //     checked={payload.rememberMe}
          //     onChange={() => handleChange("rememberMe", !payload.rememberMe)}
          //     label="Ingatkan Saya"
          //   />
          // </div>
          {/* ini buat reChapta nunggu GOOGLE SITE KEY */}
          <div className="w-full">
            <Button text="Masuk" onClick={handleLogin} />
          </div>
        </div>
      </div>

      {/* <Innovation /> */}
    </div>
  );
};

export default Login;
