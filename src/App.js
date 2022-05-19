import "./App.css";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import NavigationBar from "./components/navigation/NavigationBar";
import Login from "./container/Login/Login";

const initialFormState = {
  password: "",
  email: "",
  authCode: "",
  formType: "signup",
};

function App() {
  const [formState, updateFormState] = useState(initialFormState);

  const { password, email, authCode, formType } = formState;

  const signUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
      });
      console.log(user);
    } catch (error) {
      console.error(error);
    }
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  };

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(email, authCode);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
    updateFormState(() => ({ ...formState, formType: "signin" }));
  }

  async function signIn() {
    try {
      const user = await Auth.signIn(email, password);
      console.log(user);
    } catch (error) {
      console.log("error signing in", error);
    }
    updateFormState(() => ({ ...formState, formType: "welcomeScreen" }));
  }

  const onChange = (e) => {
    e.persist();
    updateFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(formState, "formState");

  return (
    <div className="App">
      <NavigationBar />
      {formType === "signup" && (
        <Login
          onClickHandler={signUp}
          formType={formType}
          onChange={onChange}
        />
      )}
      {formType === "confirmSignUp" && (
        <div>
          {/* <input name='authCode' onChange={onChange} placeholder="Confirmation code" />
         <button onClick={confirmSignUp}>Confirm signup</button> */}
          <Login
            onClickHandler={confirmSignUp}
            onChange={onChange}
            formType={formType}
          />
        </div>
      )}
      {formType === "signin" && (
        <div>
          <Login
            onClickHandler={signIn}
            formType={formType}
            onChange={onChange}
          />
        </div>
      )}
      {formType === "welcomeScreen" && (
        <div>
          <h1>Hello World, Welcome User!</h1>
        </div>
      )}
    </div>
  );
}

export default App;
