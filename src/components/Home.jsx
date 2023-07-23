import { useContext, useState, useEffect } from "react";
import TokenContext from "../context/TokenContext";
import { Link } from "react-router-dom";
import BackgroundImage from "./BackgroundImage";
import CurrentProjects from "./CurrentProjects";

const Home = () => {
	const token = useContext(TokenContext);

	if (token !== null) {
		return (
			<div className="relative flex-1 p-4 grid grid-cols-16 grid-rows-16 gap-4 bg-mainShade rounded-md text-white">
				<CurrentProjects/>
			</div>
		);
	}

	return (
		<div className="relative flex-1 px-4 py-4 flex bg-mainShade rounded-md text-white items-center justify-center">
			<BackgroundImage/>
			<div className="z-10 flex-1 flex flex-col items-center justify-center">
				<h1 className="font-large font-bold text-8xl text-orange">COLLABIO</h1>
				<span
					className="font-medium text-2xl w-128 text-center my-8"
				>
					Login or Sign Up and start working on coding project with your friends or colleagues
				</span>

				<div className="flex items-center gap-x-8 w-96">
					<Link 
						className={"svg hover:text-orange rounded-md px-4 py-4 text-white flex gap-x-8 justify-between items-center bg-main flex-1"}
						to={"/login"}
					>
						<span>Login</span>
						<img 
							src="/icons/right-from-bracket-solid.svg" 
							alt="Login icon" 
							className="w-6 h-6"
						/>
					</Link>
					<Link 
						className={"svg hover:text-orange rounded-md px-4 py-4 text-white flex gap-x-8 justify-between items-center bg-main flex-1"}
						to={"/signup"}
					>
						<span>Sign Up</span>
						<img 
							src="/icons/user-plus-solid.svg" 
							alt="Sign Up icon" 
							className="w-6 h-6"
						/>
					</Link>
				</div>
			</div>
    	</div>
	)
}

export default Home