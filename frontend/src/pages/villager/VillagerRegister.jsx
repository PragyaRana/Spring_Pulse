<<<<<<< Updated upstream:frontend/src/pages/villager/VillagerRegister.jsx
import {useState} from "react"
import API from "../../api/api"
import {useNavigate,useParams} from "react-router-dom"
=======
import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes:frontend/src/pages/Register.jsx

function Register() {
  const navigate = useNavigate();

<<<<<<< Updated upstream:frontend/src/pages/villager/VillagerRegister.jsx
 const navigate = useNavigate()
 const { role } = useParams()
=======
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    village: "",
    district: "",
    password: "",
  });
>>>>>>> Stashed changes:frontend/src/pages/Register.jsx

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

<<<<<<< Updated upstream:frontend/src/pages/villager/VillagerRegister.jsx
  await API.post(`/${role}/register`,form)

  navigate(`/${role}/login`)
=======
      <form onSubmit={submit}>
        <input name="name" placeholder="Name" value={form.name} onChange={change} required />

        <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
>>>>>>> Stashed changes:frontend/src/pages/Register.jsx

        <input name="phone" placeholder="Phone" value={form.phone} onChange={change} required />

        <input name="village" placeholder="Village" value={form.village} onChange={change} />

        <input name="district" placeholder="District" value={form.district} onChange={change} />

<<<<<<< Updated upstream:frontend/src/pages/villager/VillagerRegister.jsx
   <h2>{role} Register</h2>

   <form onSubmit={submit}>

    <input name="name" placeholder="Name" onChange={change}/>
    <input name="email" placeholder="Email" onChange={change}/>
    <input name="phone" placeholder="Phone" onChange={change}/>
    <input name="village" placeholder="Village" onChange={change}/>
    <input name="district" placeholder="District" onChange={change}/>
    <input name="password" type="password" placeholder="Password" onChange={change}/>

    <button type="submit">Register</button>

   </form>

  </div>

 )
=======
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={change}
          required
        />
>>>>>>> Stashed changes:frontend/src/pages/Register.jsx

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;