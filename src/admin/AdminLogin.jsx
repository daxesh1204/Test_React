import { useState } from "react";
import { Users } from "./users";

export const AdminLogin = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [form, setForm] = useState({ email: "", password: "" });


  const handleSubmit=()=>{
    if(email==="admin12@gmail.com" && password==="admin"){
       <Users/>
    }
    else{
      <AdminLogin/>
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
    <h1>Admin Login Form</h1>
     <form onSubmit={handleSubmit}>
        <div style={{margin:"10px", padding:"10px"}}>
        <select name="" id="" style={{width:"20rem", height:"2rem"}}>
          <option value="admin" name="role">Admin</option>
          <option value="user" name="role">User</option>
        </select>
        <br /><br />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <br /><br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <br /><br />

        <button style={{backgroundColor:"blue", color:"white", padding:"3px",width:"5rem"}}>Login</button>
      </div>
     </form>
    </>
  );
};
