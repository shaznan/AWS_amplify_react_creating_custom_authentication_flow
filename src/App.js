import './App.css';
import React, {useState} from 'react'
import { Auth } from 'aws-amplify';

const initialFormState = {
  userName: "", password: "", email:"", authCode: "", formType: 'signup'
}


function App() {
const [formState, updateFormState] = useState(initialFormState)

console.log(formState)

  const {formType} = formState

  const signUp = async ()=>{
    try {
      const {userName, password, email} = formState
      const {user} = await Auth.signUp({
        username: userName,
        password,
        // attributes:{
        //   email,
        // }
      })
      console.log(user)
    } catch (error) {
      console.error(error)
    }
    updateFormState(()=>({...formState, formType: "confirmSignUp"}))
  }

  async function confirmSignUp() {
    try {
      const {userName, authCode} = formState
      await Auth.confirmSignUp(userName, authCode);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
    updateFormState(()=>({...formState, formType: "signin"}))

}

async function signIn() {
  const {userName, password} = formState

  try {
      const user = await Auth.signIn(userName, password);
  } catch (error) {
      console.log('error signing in', error);
  }
  updateFormState(()=>({...formState, formType: "welcomeScreen"}))

}

const onChange = (e)=> {
  e.persist()
  updateFormState((prev)=> ({...prev, [e.target.name]: e.target.value}))
}


  return (
    <div className="App">
   {
     formType === 'signup' && (
       <div>
         <input name='userName' onChange={onChange} placeholder="username" />
         <input name='password' onChange={onChange} placeholder="password" />
         <input name='email' onChange={onChange} placeholder="email" />
         <button onClick={signUp}>Sign up</button>
       </div>
     )
   }
      {
     formType === 'confirmSignUp' && (
       <div>
         <input name='authCode' onChange={onChange} placeholder="Confirmation code" />
         <button onClick={confirmSignUp}>Confirm signup</button>
       </div>
     )
   }
   {
     formType === 'signin' && (
       <div>
         <input name='username' onChange={onChange} placeholder="username" />
         <input name='password' onChange={onChange} placeholder="password" />
         <input name='email' onChange={onChange} placeholder="email" />
         <button onClick={signIn}>Sign In</button>
       </div>
     )
   }
   {
     formType === 'welcomeScreen' && (
       <div>
         <h1>Hello World, Welcome User!</h1>
       </div>
     )
   }
    </div> 
  );
}

export default App;
