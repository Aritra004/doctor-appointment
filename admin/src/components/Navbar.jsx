import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    atoken && setAtoken("");
    atoken && localStorage.removeItem("atoken");
    dtoken && setDtoken("");
    dtoken && localStorage.removeItem("dtoken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          onClick={() => navigate("/")}
          src={assets.admin_logo}
          alt="logo"
          className="w-36 sm:w-48 cursor-pointer"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray text-gray-600">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
