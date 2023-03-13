import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const CreateAccount = () => {
    const [formData, setFormData] = useState({ 
        email: "", 
        password: "", 
        confirmPassword: "" });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (formData.password !== formData.confirmPassword) {
                setError("Password and confirm password do not match.");
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), formData.email, formData.password);
            navigate("/articles");
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
            <h1>Create Account</h1>
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
            <input 
                type="password"
                placeholder="Re-enter your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <div className="button-text-container">
                <button onClick={createAccount}>Create Account</button>
                <Link to="/login">Already have an account? Log in here</Link>
            </div>
        </>
    )
}

export default CreateAccount;