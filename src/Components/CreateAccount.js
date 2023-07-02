import React, { useState } from "react"
import Profile from "./Profile"

//TODO: Get rid of if else bs. Do a confirm password field.

export default function CreateAccount () {

    const [formData, setFormData] = React.useState({
        username:"",
        email:"",
        password:"",
        tc:false
    });
    const [formErrors, setFormErrors] = React.useState({});
    const [submit, setSubmit] = useState(false);
    const [displayAccount, setDisplayAccount] = useState(false) 
    //Called every time a value changes
    function handleChange (event) {
        const {type, name, value, checked} = event.target;

        /*Change state by creating a clone of the previous 
        form data with the value changed in event.target.name
        which is assigned uniquely to each form input. Will
        return a Boolean (checked "value") if a checkbox otherwise string data (value)
        */
        setFormData(prevform => ({...prevform,[name]: type === "checkbox" ? checked : value}))
    }

    const validate = (data) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!data.username) errors.username="Username is empty";
        else if(data.username.length < 4 || data.username.length > 12) errors.username="Username must be 4-12 characters long";

        if(!data.password) errors.password="Password is empty";
        else if (data.password.length < 8) errors.password="Password must be 8 characters long";

        if (!regex.test(data.email)) errors.email="Valid email address is required";

        if(!data.tc) errors.tc="Accepted Terms & Conditions are required";
        return errors;
    }


    const handleSubmit = (event) => {
        setFormErrors(validate(formData));
        setSubmit(true);
        event.preventDefault();
    }

    React.useEffect(() => {
        if(Object.keys(formErrors).length === 0 && submit) setDisplayAccount(true);
    },[formErrors, submit])

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"    
                    onChange={handleChange}  
                    value={formData.username}       
                ></input>
                <p>{formErrors.username}</p>
                <input
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleChange} 
                    value={formData.email}        
                ></input>
                <p>{formErrors.email}</p>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"   
                    onChange={handleChange}  
                    value = {formData.password}
                ></input>
                <p>{formErrors.password}</p>
                <label>
                    <input
                    type="checkbox"
                    name="tc"
                    onChange={handleChange}
                    checked={formData.tc}
                    />
                    I Agree to non-existent Terms & Conditions
                    <p>{formErrors.tc}</p>
                </label>
                <button>Create Account</button>
            </form>
            {displayAccount && <Profile data={formData}/>}
        </main>
    )

}