import axios from "axios";
import { useEffect, useState } from "react";

export const Users = () => {
  const [user, setUser] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editUserId, setEditUserId] = useState(null);
  const API_URL = "http://localhost:3000/users";

  const fetchUser = async () => {
    const res = await axios.get(API_URL);
    //  console.log(res.data);
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      return alert("Please required all field");
    }

    try {
      if (editUserId === null) {
        await axios.post(API_URL, form);
      } else {
        await axios.put(`${API_URL}/${editUserId}`, form);
        setEditUserId(null);
      }
    } catch (error) {
      console.log(error);
    }
    setForm({ name: "", email: "" });
    fetchUser();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditUserId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      console.log(res.data);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="main">
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <button
          style={{ backgroundColor: "green", color: "white", padding: "5px",  width:"20.5rem", height: "2rem"}}
        >
          {editUserId === null ? "Add User" : "Update User"}
        </button>
      </form>

      <ul>
        {user.map((user) => {
          return (
            <li key={user.id}>
              <span>
                {user.name}-{user.email}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(user)}
                  style={{
                    backgroundColor: "yellow",
                    color: "black",
                    padding: "5px",
                    marginRight: "10px",
                    width:"5rem"
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{
                    backgroundColor: "red",
                    color: "black",
                    padding: "5px",
                    marginRight: "10px",
                    width:"5rem"
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
