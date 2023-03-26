import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useForm, FormProvider } from 'react-hook-form' // useFormContext, Controller part of react-hook-form

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Basic information",
    "Contact Information",
    "Personal Information",
    "Payment",
  ];
}

const BasicInformation = () => {
  // const { control } = useFormContext();
  return (
    <div className="container p-5">
      {/* <controller
        control={control} 
        name="name"
        render={(field) => { */}
      <div className="row">
        <TextField
          className="col-5 me-3"
          id="name"
          label="First Name"
          placeholder="Enter Your First Name"
          margin="normal"
          name="name"
        // {...field}
        />
        {/* }} /> */}
        <TextField
          className="col-6"
          id="lastName"
          label="Last Name"
          placeholder="Enter Your Last Name"
          margin="normal"
          name="lastName"
        />
      </div>

      <div className="row">
        <TextField
          style={{ width: "95%" }}
          id="jobTitle"
          label="Job Title"
          placeholder="Enter Your Job Title"
          // fullWidth
          margin="normal"
          name="jobTitle"
        />
      </div>
      <div className="row">
        <TextField
          style={{ width: "95%" }}
          id="address"
          label="Address"
          placeholder="Enter Your Address"
          // fullWidth
          margin="normal"
          name="address"
        />
      </div>
      <div className="row">
        <TextField
          className="col-4 me-2"
          id="city"
          label="City"
          placeholder="Enter Your City"
          margin="normal"
          name="city"
        />
        <TextField
          className="col-3 me-2"
          id="state"
          label="State"
          placeholder="Enter Your State"
          margin="normal"
          name="state"
        />
        <TextField
          className="col-4"
          id="zipCode"
          label="Zip Code"
          placeholder="Enter Your Zip Code"
          margin="normal"
          name="zipCode"
        />
      </div>
      <div className="row">
        <TextField
          className="col-5 me-3"
          id="phone"
          label="Phone Number"
          placeholder="Enter Your Phone Number"
          margin="normal"
          name="phone"
        />
        <TextField
          className="col-6"
          id="email"
          label="Email"
          placeholder="Enter Your Email"
          margin="normal"
          name="email"
        />
      </div>
    </div>
  )
}
const ContactInformation = () => {
  return (
    <>
      <TextField
        id="email"
        label="E-mail"
        placeholder="Enter Your E-mail Address"
        fullWidth
        margin="normal"
        name="emailAddress"
      />
      <TextField
        id="phone-number"
        label="Phone Number"
        placeholder="Enter Your Phone Number"
        fullWidth
        margin="normal"
        name="phoneNumber"
      />
      <TextField
        id="alternate-phone"
        label="Alternate Phone"
        placeholder="Enter Your Alternate Phone"
        fullWidth
        margin="normal"
        name="alternatePhone"
      />
    </>
  )
}
const PersonalInformation = () => {
  return (
    <>
      <TextField
        id="address1"
        label="Address 1"
        placeholder="Enter Your Address 1"
        fullWidth
        margin="normal"
        name="address1"
      />
      <TextField
        id="address2"
        label="Address 2"
        placeholder="Enter Your Address 2"
        fullWidth
        margin="normal"
        name="address2"
      />
      <TextField
        id="country"
        label="Country"
        placeholder="Enter Your Country Name"
        fullWidth
        margin="normal"
        name="country"
      />
    </>
  )
}
const Payment = () => {
  return (
    <>
      <TextField
        id="cardNumber"
        label="Card Number"
        placeholder="Enter Your Card Number"
        fullWidth
        margin="normal"
        name="cardNumber"
      />
      <TextField
        id="cardMonth"
        label="Card Month"
        placeholder="Enter Your Card Month"
        fullWidth
        margin="normal"
        name="cardMonth"
      />
      <TextField
        id="cardYear"
        label="Card Year"
        placeholder="Enter Your Card Year"
        fullWidth
        margin="normal"
        name="cardYear"
      />
    </>
  )
}

// const {formData, setFormData} = useState({
//     name: "",
//     lastName: "",
//     jobTitle: "",
//     address: "",
//     city: "",
//     state: "",
//     Email: "",
//     pinCode: "",
//     phone: "",
// });
// const onChange = (e) => {
//   setDetail({ ...formData, [e.target.name]: e.target.value });
// };

// console.log(formData);

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInformation />
    case 1:
      return <ContactInformation />
    case 2:
      return <PersonalInformation />
    case 3:
      return <Payment />
    default:
      return "unknown step";
  }
}

const LinaerStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const methods = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      jobTitle: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: ""
    }
  });

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{getStepContent(activeStep)}
              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
                type="submit"
              >
                back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  skip
                </Button>
              )}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </>
  );
};

export default LinaerStepper;
