import { useState } from "react";
import DetailContext from "./DetailContext";

const DetailState = (props) => {
  const host = "http://localhost:5000";
  const detailsInitial = [];

  const [details, setDetails] = useState(detailsInitial);

  //Get all Notes
  const getDetails = async () => {
    // API call
    const response = await fetch(`${host}/api/details/Fetchalldetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setDetails(json);
  };

  //Add a Note
  const addDetail = async (name, lastName, jobTitle, address, city, state, zipCode, phone, email) => {
    // API call
    const response = await fetch(`${host}/api/details/adddetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ name, lastName, jobTitle, address, city, state, zipCode, phone, email }),
    });
    const detail = await response.json();
    setDetails(details.concat(detail));
  };




  //Delete a Note
  const deleteDetail = async (id) => {
    const response = await fetch(`${host}/api/details/deleteDetails/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json);

    // console.log("Deleting the note with id "+ id)
    const newDetails = details.filter((detail) => {
      return detail._id !== id;
    });
    setDetails(newDetails);
  };



  //Edit a Note
  const editDetail = async (id, name, lastName, jobTitle, address, city, state, zipCode, phone, email) => {
    // API call
    const response = await fetch(`${host}/api/details/updatedetails/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ name, lastName, jobTitle, address, city, state, zipCode, phone, email }),
    });
    const json = await response.json();
    console.log(json);

    let newDetails = JSON.parse(JSON.stringify(details));

    //Logic to edit in client
    for (let index = 0; index < details.length; index++) {
      const element = details[index];
      if (element._id === id) {
        newDetails[index].name = name;
        newDetails[index].lastName = lastName;
        newDetails[index].jobTitle = jobTitle;
        newDetails[index].address = address;
        newDetails[index].city = city;
        newDetails[index].state = state;
        newDetails[index].zipCode = zipCode;
        newDetails[index].phone = phone;
        newDetails[index].email = email;
        break;
      }
    }
    setDetails(newDetails);
  };

  return (
    <DetailContext.Provider
      value={{ details, addDetail, deleteDetail, editDetail, getDetails }}
    >
      {props.children}
    </DetailContext.Provider>
  );
};

export default DetailState;
