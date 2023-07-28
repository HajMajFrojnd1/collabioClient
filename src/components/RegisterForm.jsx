import { useState, useEffect } from "react";
import { validateRegistration } from "../utils/validation";
import { signUp } from "../serverConections/auth";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "./BackgroundImage";
import { Link } from "react-router-dom";
import { useToken } from "../utils/customHooks/useToken";

const RegisterForm = ({setToken}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [success, setSuccess] = useState(false);

    const token = useToken();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const eMessages = validateRegistration(
            firstName, 
            lastName, 
            email, 
            password, 
            confirmPassword
        );
        setErrorMessages(eMessages);

        if(eMessages.length === 0){
            try {
                const response = await signUp(
                    firstName, 
                    lastName, 
                    email, 
                    password, 
                    confirmPassword
                );

                if(!response.ok) {
                    const {message} = await response.json();
                    if(Array.isArray(message)){
                        setErrorMessages(message);
                    }else{
                        setErrorMessages([message]);
                    }
                    return;
                }

                const {acessToken} = await response.json();
                setToken(acessToken);
                setSuccess(true);
                setTimeout(() => {
                    navigate("/");
                }, 2000);

            } catch (error) {
                setErrorMessages(["Server error, try again later"]);
            }
        }
    };

    useEffect(()=> {
        if(token !== null){
            navigate("/");
        }
    }, []);

    return (
        <div className="relative text-white text-xl font-medium flex-1 flex flex-col items-center justify-center">
            <BackgroundImage/>
            {!success && 
                <div className="z-10 bg-mainShade px-8 py-8 rounded-md flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-large mb-12 font-bold">
                        Sign Up And Code!
                    </h2>
                    <form 
                        action="none"
                        className="flex flex-col gap-y-8 justify-center items-center"
                    >

                        <div className="w-96 px-2 py-2 border-b-2 border-white flex justify-between">    
                            <input 
                                value={firstName}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setFirstName(e.target.value);
                                }}
                                type="text" 
                                placeholder="First Name"
                                className="bg-transparent outline-0 w-full h-full" 
                                required               
                            />
                            <img 
                                src="/icons/user-solid.svg" 
                                alt="Login icon" 
                                className="w-6 h-6"
                            />
                        </div>
                        <div className="w-96 px-2 py-2 border-b-2 border-white flex justify-between">    
                            <input 
                                value={lastName}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setLastName(e.target.value);
                                }}
                                type="text" 
                                placeholder="Last Name"
                                className="bg-transparent outline-0 w-full h-full" 
                                required               
                            />
                            <img 
                                src="/icons/user-solid.svg" 
                                alt="Login icon" 
                                className="w-6 h-6"
                            />
                        </div>
                        <div className="w-96 px-2 py-2 border-b-2 border-white flex justify-between">
                            <input 
                                value={email}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setEmail(e.target.value);
                                }}
                                type="text" 
                                placeholder="Email address"
                                className="bg-transparent outline-0 w-full h-full"
                                required
                            />
                            <img 
                                src="/icons/envelope-solid.svg" 
                                alt="Login icon" 
                                className="w-6 h-6"
                            />
                        </div>
                        <div className="w-96 px-2 py-2 border-b-2 border-white flex justify-between">    
                            <input 
                                value={password}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setPassword(e.target.value);
                                }}
                                minLength="8" 
                                maxLength="32"
                                type="password" 
                                placeholder="Password"
                                className="bg-transparent outline-0 w-full h-full"   
                                required             
                            />
                            <img 
                                src="/icons/key-solid.svg" 
                                alt="Login icon" 
                                className="w-6 h-6"
                            />
                        </div>
                        <div className="w-96 px-2 py-2 border-b-2 border-white flex justify-between">
                            <input 
                                value={confirmPassword}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setConfirmPassword(e.target.value);
                                }}
                                minLength="8" 
                                maxLength="32"
                                type="password" 
                                placeholder="Confirm Password"
                                className="bg-transparent outline-0 w-full h-full"
                                required
                            />
                            <img 
                                src="/icons/key-solid.svg" 
                                alt="Login icon" 
                                className="w-6 h-6"
                            />
                        </div>
                        <div className="flex flex-col w-full justify-center text-center items-center gap-y-2">
                            {
                                errorMessages.map((errorMessage)=> <span className="text-error text-center w-96 text-base">{errorMessage}</span>)
                            }
                            {password !== confirmPassword && confirmPassword.length > 0 && 
                                <span className="text-error w-96 text-base">Passwords do not match</span>
                            }
                        </div>
                        <button 
                            type="submit" 
                            className="bg-orange py-2 w-96 rounded-md hover:bg-transparent border-2 border-transparent hover:border-orange"
                            onClick={handleSubmit}    
                        >
                            Sign Up
                        </button>
                        <Link
                            to={"/login"}
                            className="hover:opacity-75 text-base"
                        >
                            <u>Already have an account? Login here.</u>
                        </Link>
                    </form>
                </div>
            }
            {success &&
                <div className="z-10 bg-mainShade px-8 py-8 rounded-md flex flex-col items-center justify-center text-success">
                    <span>Sign Up was succesful. Redirecting...</span>
                </div>
            }
        </div>
    )
}

export default RegisterForm