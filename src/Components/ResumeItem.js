import React from "react";
import { useContext } from "react";
import DetailContext from "../../../resume-builder/src/Context/details/DetailContext";

const ResumeItem = (props) => {
    const context = useContext(DetailContext)
    const {deleteDetail} = context;
  const { detail, updateDetail, showAlert } = props;

    return (
        <div className='container-fluid col border border-dark border-2 mb-3 mx-1 '>
            <div className="row bg-info h-20">
                <div className="col-2">
                    <h2 className="bg-light">AS</h2>
                </div>
                <div className="col-6">
                    <h3>{detail.name} {detail.lastName}</h3>
                    <p><b>{detail.JobTitle}</b></p>
                </div>
                <div className='col-4 mt-2' style={{ lineHeight: "5px", fontSize: "small" }}>
                    <p>{detail.address}</p>
                    <p>{detail.city}</p>
                    <p>{detail.email}</p>
                    <p>{detail.phone}</p>
                </div>
            </div>


            <div className='row'>
                <p style={{ lineHeight: "20px", fontSize: "small" }}>Human resource generalist with 8 years of experience in HR, including hiring and terminating, disciplining employees and helping department managers improve employee performence. Worked with labour unions to negotiate compensation packages for workers. Organized new hire training intiatives as well as ongoing training to adhere to workplace safety standards. Worked with OSHA to ensure that all safety regulations are followed.
                </p>
            </div>

            <hr className="border border-dark border-2" />

            <div>
                <h4 className='h4 text-info'>Professional Experience</h4>
                <div className='row'>
                    <div className='col-4' style={{ lineHeight: "15px", fontSize: "small" }}>
                        <p>January 2016-Present</p>
                    </div>
                    <div className='col-8' style={{ lineHeight: "15px", fontSize: "small" }}>
                        <p><b>Human Resource Manager</b> Jim's widget Factory,Plano,TX</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4' style={{ lineHeight: "15px", fontSize: "small" }}>
                    <p>March 2015-January 2016</p>
                    </div>
                    
                    <div className='col-8' style={{ lineHeight: "15px", fontSize: "small" }}>
                        <p><b>Human Resources Associate</b> Jim's widget Factory,Plano,TX</p>
                    </div>
                </div>
            </div>

            <hr className="border border-dark border-2" />

            <div className='row'>
                <h4 className='h4 text-info'>Education</h4>
                <div className='col-6' style={{ lineHeight: "5px", fontSize: "small" }}>
                    <p>September 2007-May-2011</p>
                </div>
                <div className="col-6" style={{ lineHeight: "15px", fontSize: "small" }}>
                    <p><b>Bachlor in Computer Application</b> The University of Texas at Dallas</p>
                    <ul>
                        <li>Academic Awards of AY 2007-2008</li>
                    </ul>
                </div>
            </div>

            <hr className="border border-dark border-2" />

            <div>
                <h4 className='h4 text-info'>Key Skills</h4>
                <ul style={{ lineHeight: "15px", fontSize: "small" }}>
                    <li>Detail Oriented</li>
                    <li>Well-Versed in Texas employement Law</li>
                    <li>Excellent written and oral communication skills</li>
                    <li>Develops positive workplace relationships</li>
                </ul>
            </div>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteDetail(detail._id);showAlert("Deleted Successfully", "success")}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateDetail(detail);}}></i>
        </div>
    )
}

export default ResumeItem