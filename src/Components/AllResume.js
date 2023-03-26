import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import DetailContext from "../../../resume-builder/src/Context/details/DetailContext";
// import Form from "./Form";
import ResumeItem from "./ResumeItem";

const AllResumes = (props) => {
  const context = useContext(DetailContext);
  const { details, getDetails, editDetail } = context;
  let history = useHistory();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getDetails();
    }else{
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [detail, setDetail] = useState({
    id: "",
    ename: "",
    elastName: "",
    ejobTitle: "",
    eaddress: "",
    ecity: "",
    estate: "",
    eEmail: "",
    epinCode: "",
    ephone: "",
  });

  const updateDetail = (currentNote) => {
    ref.current.click();
    setDetail({
      id: currentNote._id,
      ename: currentNote.name,
      elastName: currentNote.lastName,
      ejobTitle: currentNote.jobTitle,
      eaddress: currentNote.address,
      ecity: currentNote.city,
      estate: currentNote.state,
      epinCode: currentNote.pinCode,
      ephone: currentNote.phone,
      eEmail: currentNote.email,
    });
  };
  
  const handleClick = (e) => {
    console.log("updating the detail", detail);
    editDetail(detail.id, detail.ename, detail.elastName, detail.ejobTitle,detail.eaddress,detail.ecity,detail.estate,detail.epinCode,detail.ephone,detail.eEmail)
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* <Form showAlert={props.showAlert} /> */}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Resume
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ename"
                    name="ename"
                    value={detail.ename}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={3} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="elastName"
                    name="elastName"
                    value={detail.elastName}
                    onChange={onChange}
                    minLength={4} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ejobTitle"
                    name="ejobTitle"
                    value={detail.ejobTitle}
                    onChange={onChange}
                    minLength={4} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eaddress"
                    name="eaddress"
                    value={detail.eaddress}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ecity"
                    name="ecity"
                    value={detail.ecity}
                    onChange={onChange}
                    minLength={3} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="estate"
                    name="estate"
                    value={detail.estate}
                    onChange={onChange}
                    minLength={4} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pinCode" className="form-label">
                    Pin Code 
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="epinCode"
                    name="epinCode"
                    value={detail.epinCode}
                    onChange={onChange}
                    minLength={6} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="ephone"
                    name="ephone"
                    value={detail.ephone}
                    onChange={onChange}
                    minLength={10} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="eEmail"
                    name="eEmail"
                    value={detail.eEmail}
                    onChange={onChange}
                    minLength={7} required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                disabled={detail.ephone.length<10 || detail.ename.length<3 || detail.eaddress.length<5}
              >
                Update Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 mb-5">
        <h2 className="text-danger text-center">Your Resumes</h2>
        <div className="container text-danger">
        {detail.length===0 && 'No Resumes to display'}
        </div>
        {details.map((detail) => {
          return (
            <ResumeItem key={detail._id} updateDetail={updateDetail} detail={detail} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default AllResumes;