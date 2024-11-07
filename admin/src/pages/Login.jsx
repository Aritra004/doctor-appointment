import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");

  const { setAtoken, backendUrl } = useContext(AdminContext);
  const { setDtoken } = useContext(DoctorContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setAtoken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dtoken", data.token);
          setDtoken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p className="">Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#dadada] rounded w-full p-2 mt-1"
            required
          />
        </div>
        <div className="w-full">
          <p className="">Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#dadada] rounded w-full p-2 mt-1"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p className="">
            Doctor Login?
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="">
            Admin Login?
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
