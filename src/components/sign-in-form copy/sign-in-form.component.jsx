import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import { useState } from "react"
import { 
  signInWithGooglePopup, 
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  } from "../../routes/utils/firebase/firebase.utils"

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

    const resetFormFirlds = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }
  
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response);
      resetFormFirlds()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Wrong password, please try again.')
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email, please try again.')
          break;
        default:
          console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target

    setFormFields ({...formFields, [name]: value}) 
  }

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
      
        <FormInput
        label='Email'
        type='email' 
        required 
        onChange={handleChange} 
        name='email' 
        value={email} />

        <FormInput
        label='Password'
        type='password'  
        required 
        onChange={handleChange} 
        name='password' 
        value={password} />

        <div className='buttons-container'>
        <Button type='submit'>SIGN IN</Button>
        <Button
        type='button' onClick={signInWithGoogle} buttonType='google'>
          google Sign in
        </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm