import React, { useEffect, useState, useContext } from 'react'
import TokenContext from '../context/TokenContext';

const AuthTry = () => {

    const [auth, setAuth] = useState("not authorized");
    const token = useContext(TokenContext);

    useEffect(()=>{
	
        
		const tryAuth = async () => {
			try {
				const response = await fetch(
                    "http://localhost:4001/authTry",
                    {
                        method: "POST",
                        mode: "cors",
                        headers:{'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            token: token
                        })
                    }
                );

                if (!response.ok){
                    const {message} = await response.json();
                    setAuth(message);
                    return;
                }

				const {user} = await response.json();
                setAuth(user.email);
			} catch (error) {
				setAuth("Error fetchning user");
			}
		}
	
		tryAuth();
	
	}, []);

    return (
        <div>{auth}</div>
    )
}

export default AuthTry