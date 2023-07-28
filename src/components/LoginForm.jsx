import { useState, useEffect } from "react"
import { validateLogin } from "../utils/validation";
import { login } from "../serverConections/auth";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "./BackgroundImage";
import { useToken } from "../utils/customHooks/useToken";

const LoginForm = ({setToken}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const navigate = useNavigate();

    const token = useToken();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eMessages = validateLogin(
            email, 
            password
        );
        setErrorMessages(eMessages);
        
        if(eMessages.length === 0){
            try {
                const response = await login(
                    email, 
                    password 
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
    }

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
                        Login And Start Coding
                    </h2>
                    <form 
                        action="none"
                        className="flex flex-col gap-y-8 justify-center items-center"
                    >
                        <div className="w-96 px-2 py-2 border-b-2 border-white flex justify-between">    
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text" 
                                placeholder="Email address"
                                className="bg-transparent outline-0 w-full h-full"                
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
                                onChange={(e) => setPassword(e.target.value)}
                                minLength="8" 
                                maxLength="32"
                                type="password" 
                                placeholder="Password"
                                className="bg-transparent outline-0 w-full h-full"
                            />
                            <img 
                                src="/icons/key-solid.svg" 
                                alt="Login icon" 
                                className="w-6 h-6"
                            />
                        </div>
                        <div className="flex flex-col w-full justify-center text-center items-center gap-y-2">
                            {errorMessages.map((errorMessage)=> <span className="text-error text-center w-96 text-base">{errorMessage}</span>)}
                        </div>
                        <button 
                            className="bg-orange w-full py-2 rounded-md hover:bg-transparent border-2 border-transparent hover:border-orange"
                            onClick={handleSubmit}    
                        >
                            Login
                        </button>
                        <Link
                            to={"/signup"}
                            className="hover:opacity-75 text-base"
                        >
                            <u>Dont have an account? Sign Up here.</u>
                        </Link>
                    </form>
                </div>
            }
            {success &&
                <div className="z-10 bg-mainShade px-8 py-8 rounded-md flex flex-col items-center justify-center text-success">
                    <span>Login was succesful. Redirecting...</span>
                </div>
            }
        </div>
    )
}

export default LoginForm