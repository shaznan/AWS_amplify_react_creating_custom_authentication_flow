import './App.css';
import React, {useState} from 'react'
import { Auth } from 'aws-amplify'
import NavigationBar from './components/navigation/NavigationBar';
import Login from './container/Login/Login';

const initialFormState = {
   password: "", email:"", authCode: "", formType: 'signup'
}


function App() {
const [formState, updateFormState] = useState(initialFormState)

  const {formType} = formState

  const signUp = async ()=>{
    try {
      const {password, email} = formState
      const {user} = await Auth.signUp({
        username: email,
        password,
      })
      console.log(user)
    } catch (error) {
      console.error(error)
    }
    updateFormState(()=>({...formState, formType: "confirmSignUp"}))
  }

  async function confirmSignUp() {
    try {
      const { authCode, email} = formState
      await Auth.confirmSignUp(email, authCode);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
    updateFormState(()=>({...formState, formType: "signin"}))

}

async function signIn() {
  const { password, email} = formState

  try {
      const user = await Auth.signIn(email, password);
      console.log(user)
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
      <NavigationBar />
      <Login />
   {
     formType === 'signup' && (
       <div>
         <input name='email' onChange={onChange} placeholder="email" />
         <input name='password' onChange={onChange} placeholder="password" />
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
         <input name='email' onChange={onChange} placeholder="email" />
         <input name='password' onChange={onChange} placeholder="password" />
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
