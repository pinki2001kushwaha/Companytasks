import React, { useState } from "react";
import axios from 'axios'

const Task3 = () => {
  const [phonenumber, setPhoneNumber] = useState("");
  const [headers, setHeaders] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      const response = await axios.post(
        "https://chimpu.online/api/post.php",
        { phonenumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

     
      setHeaders(response.headers);
    } catch (error) {
    console.log("error")
    }
  };

  return (
    <div className="pt-16">
      <h1 className="text-xl font-bold mb-4">Task3</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Phone Number:
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="border rounded p-2 w-full"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>


      {headers && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Response Headers:</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(headers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Task3;
