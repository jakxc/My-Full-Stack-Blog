import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const LogIn = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), formData.email, formData.password);
            navigate('/articles');
        } catch (error) {
            setError(error.message);
        }
        
    }

    function handleChange(event)
    {
         const { name, value } = event.target;

         setFormData(prevData => {
            return {...prevData, [name]: value }
         })
    }

    return (
        <>
            <h1>Log In</h1>
            {error && <p className="error">{error}</p>}
            <input 
                placeholder="Your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <input 
                type="password"
                placeholder="Your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />

            <div className="button-text-container">
                <button onClick={logIn}>Log In</button>
                <Link to="/create-account">Don't have an account? Create one here</Link>
            </div>
        </>
    )
}

export default LogIn;