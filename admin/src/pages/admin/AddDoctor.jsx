import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { atoken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fee", Number(fee));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // console log form data
      // formData.forEach((value, key) => {
      //   console.log(`${key} : ${value}`);
      // });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPasword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFee("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            className=""
            onChange={(e) => setDocImg(e.target.files[0])}
            hidden
          />
          <p className="">
            Upload <br /> Doctor Picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p className="">Doctor Name</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded py-2 px-3"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="">Doctor Email</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded py-2 px-3"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="">Doctor Password</p>
              <input
                type="password"
                onChange={(e) => setPasword(e.target.value)}
                value={password}
                className="border rounded py-2 px-3"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="">Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                name=""
                id=""
                className="border rounded py-2 px-3"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="">Fee</p>
              <input
                type="number"
                onChange={(e) => setFee(e.target.value)}
                value={fee}
                className="border rounded py-2 px-3"
                placeholder="Fee"
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p className="">Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                name=""
                id=""
                className="border rounded py-2 px-3"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="">Eductaion</p>
              <input
                type="text"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded py-2 px-3"
                placeholder="Education"
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p className="">Address</p>
              <input
                type="text"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded py-2 px-3"
                placeholder="Address 1"
                required
              />
              <input
                type="text"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded py-2 px-3"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
          <div className="">
            <p className="mt-4 mb-2">About Doctor</p>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              className="w-full px-4 pt-2 border rounded"
              placeholder="Write About Doctor"
              rows={5}
            />
          </div>

          <button
            type="submit"
            className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
