import React, { useState, useEffect } from "react";
import axios from "axios";

const UserCRUD = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "" });
  const apiUrl = "http://localhost:3000/users";

  useEffect(() => {
    axios.get(apiUrl).then((res) => setUsers(res.data));
  }, []);

  const handleAddUser = () => {
    if (!formData.name || !formData.age) {
      alert(
        "malumot yuq iltimos malumot kiriting 😊 yoke agega e qushilmaganligiga etibor bering"
      );
      return;
    }
    axios.post(apiUrl, formData).then((res) => {
      setUsers([...users, res.data]);
      setFormData({ name: "", age: "" });
    });
  };

  const handleDeleteUser = (id) => {
    axios.delete(`${apiUrl}/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        User CRUD
      </h1>

      <div className="flex space-x-4 justify-center mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddUser}
          className="w-1/3 bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
        >
          Add User
        </button>
      </div>

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
          >
            <span className="text-lg font-semibold text-gray-700">
              Ismingiz {user.name}, yoshingiz {user.age}
            </span>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md "
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCRUD;
