import React from 'react';
import './multistepperform.css';

const Multistepperform = () => {

    var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n === (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
};

const nextPrev = (n) => {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n === 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
      // ... the form gets submitted:
      document.getElementById("regForm").submit();
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }
  
  function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value === "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
  }
  
  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
  }

    return (
        <form id="regForm">
  <h1>Register:</h1>
  {/* <!-- One "tab" for each step in the form: --> */}
  <div className="tab">Name:
    <p><input placeholder="First name..." onInput={this.className = ''} name="fname"/></p>
    <p><input placeholder="Last name..." onInput={this.className = ''} name="lname"/></p>
  </div>
  <div className="tab">Contact Info:
    <p><input placeholder="E-mail..." onInput={this.className = ''} name="email"/></p>
    <p><input placeholder="Phone..." onInput={this.className = ''} name="phone"/></p>
  </div>
  <div className="tab">Birthday:
    <p><input placeholder="dd" onInput={this.className = ''} name="dd"/></p>
    <p><input placeholder="mm" onInput={this.className = ''} name="nn"/></p>
    <p><input placeholder="yyyy" onInput={this.className = ''} name="yyyy"/></p>
  </div>
  <div className="tab">Login Info:
    <p><input placeholder="Username..." onInput={this.className = ''} name="uname"/></p>
    <p><input placeholder="Password..." onInput={this.className = ''} name="pword" type="password"/></p>
  </div>
  <div style={{overflow:"auto"}}>
    <div style={{float:"right"}}>
      <button type="button" id="prevBtn" onClick={nextPrev(-1)}>Previous</button>
      <button type="button" id="nextBtn" onClick={nextPrev(1)}>Next</button>
    </div>
  </div>
  {/* <!-- Circles which indicates the steps of the form: --> */}
  <div style={{textAlign:"center",marginTop:"40px"}}>
    <span className="step"></span>
    <span className="step"></span>
    <span className="step"></span>
    <span className="step"></span>
  </div>
</form>
    )
}

export default Multistepperform;