import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_USER, User } from "../types/Types";
import { Alert, Button, Form } from 'react-bootstrap';
import '../css/App.css'
import NavBar from './NavBar';


export default function RegisterForm(props: any) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const [show, isShow] = useState(false)
  const [variant, setVariant] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem(STORAGE_USER)
    if (userStr) {
      navigate('/userexpenses')
    }
  }, [])

  let handleSubmit = async (event: any) => {

    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() === false) {
      return
    }

    try {

      const user: User = {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: password
      }

      let res = await fetch('http://localhost:8090/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })

      let resJson = await res.json();

      if (res.status === 201) {
        setVariant('success')
        isShow(true)
        setMessage("User created successfully");
        localStorage.setItem(STORAGE_USER, JSON.stringify(resJson.data))
        navigate("/userexpenses")
      } else {
        setVariant('danger')
        isShow(true)
        setMessage(resJson.msg);
      }
    } catch (err) {
      console.log(err);
    }

    
  };


  return (
    <>
      <div className='register'>
        {show &&
          <Alert variant={variant} onClose={() => isShow(false)} dismissible>
            <Alert.Heading>
              {variant == 'danger' ? 'Error!' : 'Success'}</Alert.Heading>
            <p>
              {message}
            </p>
          </Alert>
        }
        <NavBar />
        <div className='d-flex justify-content-center div-translate-y-20'>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className='form'>
            <Form.Group className="mb-3 input-container" >
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                Please give first name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 input-container" >
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} required />

              <Form.Control.Feedback type="invalid">
                Please give last name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 input-container">
              <Form.Label>Email Id</Form.Label>
              <Form.Control type="email" onChange={(e) => setEmailId(e.target.value)} required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please enter valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 input-container">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                Please give valid password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant='primary'>Submit</Button>
            {/* <div className="message">{message ? <p className="errmessage">{message}</p> : null}</div> */}
          </Form>
        </div>
      </div>
    </>
  );
}
