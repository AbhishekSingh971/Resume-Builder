import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sample from "./Sample";
// import LinearStepper from "./LinearStepper";
// import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

const Details = () => {

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mb-5">
      <h1 className="h1 text-danger text-center">Build Your Resume -</h1>
      <h3 className="h3 text-danger text-center"> Build Your Future </h3>

      <div className="row mt-2" style={{ borderTop: "4px solid black" }}>
        <div className="col-5 my-3 me-2">
          <Sample />
        </div>

        <div className="col-6 my-3" style={{ borderLeft: "4px solid black" }}>
          <h2 style={{ whiteSpace: "nowrap" }}>Contact Information</h2>
          {/* <CssBaseline />
          <Container component={Box} p={4}>
            <Paper component={Box} p={3}>
              <LinearStepper />
            </Paper>
          </Container> */}
        </div>
      </div>
    </div>
  );
};

export default Details;
