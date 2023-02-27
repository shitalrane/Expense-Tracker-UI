import "../css/Login.css"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from "react-bootstrap";
import { STORAGE_USER } from "../types/Types";


export default function LoginPage() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false)
  const [show, isShow] = useState(false)
  const [variant, setVariant] = useState('')

  const navigate = useNavigate()

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
      let res = await fetch('http://localhost:8090/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailId: emailId,
          password: password
        })
      })

      let resJson = await res.json();

      if (res.status === 200) {
        setVariant('success')
        isShow(true)
        setMessage("User login successfully");

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

  function handleRegister() {
    navigate("/registerform")
  }

  return (
    <div className='login'>

      {show &&
        <Alert variant={variant} onClose={() => isShow(false)} dismissible>
          <Alert.Heading>
            {variant == 'danger' ? 'Error!' : 'Success'}</Alert.Heading>
          <p>
            {message}
          </p>
        </Alert>
      }
      <div className="app">
        <div className="app-title">
          <h1>Expense Tracker</h1>
        </div>

        <div className="login-form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" onChange={(e) => setEmailId(e.target.value)}  required />
              <Form.Control.Feedback type="invalid">
                Please Enter Valid Email Address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}  required />
              <Form.Control.Feedback type="invalid">
                Please Enter Password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Form.Group className="mb-3" controlId="formBasicRegister">
              <Form.Text className="text-muted" >Not a user? <span onClick={handleRegister}><u><i><a href=''>Register here!</a></i></u></span></Form.Text>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>

  );
}
