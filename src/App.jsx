import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import TokenContext from "./context/TokenContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { refreshTokenInterval, refreshTokenTry } from "./serverConections/refreshToken";
import Background404 from "./components/Background404";
import ProfilePage from "./components/ProfilePage";
import FriendsPage from "./components/FriendsPage";
import ProjectsPage from "./components/ProjectsPage";
import SettingsPage from "./components/SettingsPage";
import { useNavigate } from "react-router-dom";

function App() {
	const [JWT, setJWT] = useState(null);
	const  [interval, setIntervalState] = useState(0);
	const navigate = useNavigate();

	const updateIntervalState = (interval, state) => {
		clearInterval(interval);
		setIntervalState(state);
	}

	useEffect(() => {

		if(JWT !== null){
			console.log("Setting interval state");
			updateIntervalState(interval, refreshTokenInterval(setJWT));
		}else{
			updateIntervalState(0);
			navigate("/");
		}

	}, [JWT]);

	useEffect(() => {
		refreshTokenTry(setJWT);

		return () => {
				clearInterval(interval);
		}
	},[]);

    return (
		<div className="w-screen h-screen max-w-screen max-h-screen bg-main flex gap-x-8 px-8 py-8">	
			<TokenContext.Provider value={JWT}>
				<NavBar
					setToken={setJWT}
					token={JWT}
				/>
				<Routes>
					<Route	
						path="/" 
						element={<Home/>}
					/>
					<Route	
						path="/login" 
						element={<LoginForm setToken={setJWT}/>}
					/>
					<Route	
						path="/signup" 
						element={<RegisterForm setToken={setJWT}/>}
					/>
					<Route	
						path="/profile/*" 
						element={<ProfilePage/>}
					/>
					<Route	
						path="/friends/*" 
						element={<FriendsPage/>}
					/>
					<Route	
						path="/projects/*" 
						element={<ProjectsPage/>}
					/>
					<Route	
						path="/settings/*" 
						element={<SettingsPage/>}
					/>
					<Route	
						path="*" 
						element={<Background404/>}
					/>
				</Routes>
			</TokenContext.Provider>
		</div>
    );
  }

export default App;
