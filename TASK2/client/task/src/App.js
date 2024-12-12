import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios"

function NotesApp() {
  //---------------------get----------------------//
 const [notes ,setNewNote]=useState([])

 const getData=async()=>{
try{
  const res=await axios.get("http://localhost:4500/get")
  setNewNote(res.data)
  console.log(res.data)
}
catch(error){
  console.log(error)
}
 }

 useEffect(()=>{
  getData()
 },[])
 //-----------------------post----------------------//
 const [description,setDescription]=useState("")


 const post=async()=>{
  try{
  const data = { description: description };
  let res=await axios.post("http://localhost:4500/add",data)
  console.log(res)
 getData()
  }
  catch(error){
    console.log(error)
  }
 }
 async function deletedata(id) {
  let res = await axios.delete(`http://localhost:4500/delete/${id}`);
  console.log(res);
  getData();
}

  return (
    <>
      <div>
        <Navbar expand="lg" style={{ backgroundColor: "black" }}>
          <Container>
            <Navbar.Brand href="#" style={{ color: "white" }}>
              Notes
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className="container mt-5">
        <h1 className="mb-4 text-primary">Notes</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Take a note..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="btn btn-success"  onClick={()=>post()}>
            Add Note
          </button>
        </div>
        <div className="row">
          {notes.map((note) => (
            <div className="col-md-4 mb-3" key={note.id}>
              <div
                className="card"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #007bff",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="card-body">
                  <p className="card-text">{note.description}</p>
                
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletedata(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NotesApp;
