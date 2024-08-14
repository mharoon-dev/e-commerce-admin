import "./NewUser.css";
import { useState } from "react";
import { userRequest } from "../../requestMethod.js";

export default function NewUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // generate 6 digit random number
    const refrenceCode = Math.floor(Math.random() * 1000006);
    if (username && email && password) {
      const addUser = await userRequest
        .post("/auth/register", {
          username,
          email,
          password,
          refrenceCode,
        })
        .then((res) => {
          console.log(res.data);
          alert("User added successfully");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Please fill all the fields 📝");
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div>
          <div className="newUserItem">
            <label>Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="john"
            />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="john@gmail.com"
            />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </div>
        </div>

        <button className="newUserButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
