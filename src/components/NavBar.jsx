import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import usePathname from "../utils/usePathname";
import { signOut } from "../serverConections/auth";
import ImageLink from "./ImageLink";
const NavBar = ({setToken, token}) => {

    
    const [smallerMenu, setSmallerMenu] = useState(false);
    
    const location = usePathname().split("/")[0];
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            const response = await signOut();

            if (!response.ok){
                const {message} = await response.json();
            }
            setToken(null);
            navigate("/");

        } catch (error) {
            console.error(error);
        }
    }

    if(token !== null){
        return (
            <div 
                className="relative flex flex-col text-white gap-y-4 justify-between px-4 py-4 bg-mainShade rounded-md font-medium text-xl"
            >
                {smallerMenu === false ?
                    <>
                        <div className="flex flex-col gap-y-2">
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/house-solid.svg" }
                                imageAlt={"Home link icon"}
                                imageSize={"6"}
                                linkText={"Home"}
                                to={"/"}
                            />
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "profile" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/user-solid.svg" }
                                imageAlt={"Profile link icon"}
                                imageSize={"6"}
                                linkText={"Profile"}
                                to={"/profile"}
                            />
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "friends" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/user-group-solid.svg" }
                                imageAlt={"Friends link icon"}
                                imageSize={"6"}
                                linkText={"Friends"}
                                to={"/friends"}
                            />
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "projects" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/diagram-project-solid.svg" }
                                imageAlt={"Projects link icon"}
                                imageSize={"6"}
                                linkText={"Projects"}
                                to={"/projects"}
                            />
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "settings" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/sliders-solid.svg" }
                                imageAlt={"Settings link icon"}
                                imageSize={"6"}
                                linkText={"Settings"}
                                to={"/settings"}
                            />
                        </div>
                        <button 
                            onClick={handleSignout}
                            className="svg hover:text-orange rounded-md px-4 py-4 text-white flex gap-x-8 w-full justify-between items-center hover:bg-main"
                        >
                            <span>Sign Out</span>
                            <img 
                                src="/icons/right-to-bracket-solid.svg" 
                                alt="Sign Out icon" 
                                className="w-6 h-6 fill-white"
                            />
                        </button>
                        <div 
                            className="absolute top-1/2 right-0 translate-x-full px-1 py-4 bg-mainShade hover:opacity-100 cursor-pointer"
                            onClick={() => {
                                setSmallerMenu((value) => !value)
                            }}
                        >
                            <img src="/icons/chevron-left-solid.svg" alt="arrow icon" className="w-6 h-6"/>
                        </div>
                    </>
                :
                    <>
                        <div className="flex flex-col gap-y-2">
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/house-solid.svg" }
                                imageAlt={"Home link icon"}
                                imageSize={"6"}
                                to={"/"}
                            />
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "profile" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/user-solid.svg" }
                                imageAlt={"Profile link icon"}
                                imageSize={"6"}
                                to={"/profile"}
                            />
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "friends" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/user-group-solid.svg" }
                                imageAlt={"Friends link icon"}
                                imageSize={"6"}
                                to={"/friends"}
                            />
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "projects" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/diagram-project-solid.svg" }
                                imageAlt={"Projects link icon"}
                                imageSize={"6"}
                                to={"/projects"}
                            />
                            <ImageLink 
                                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "settings" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                                imageUrl={"/icons/sliders-solid.svg" }
                                imageAlt={"Settings link icon"}
                                imageSize={"6"}
                                to={"/settings"}
                            />
                        </div>
                        <button 
                            onClick={handleSignout}
                            className="svg hover:text-orange rounded-md px-4 py-4 text-white flex gap-x-8 opacity-75 w-full justify-between items-center hover:bg-main"
                        >
                            <img 
                                src="/icons/right-to-bracket-solid.svg" 
                                alt="Sign Out icon" 
                                className="w-6 h-6 fill-white"
                            />
                        </button>
                        <div 
                            className="absolute top-1/2 right-0 translate-x-full px-1 py-4 bg-mainShade opacity-75 hover:opacity-100 cursor-pointer"
                            onClick={() => {
                                setSmallerMenu((value) => !value)
                            }}
                        >
                            <img src="/icons/chevron-left-solid.svg" alt="arrow icon" className="w-6 h-6 rotate-180"/>
                        </div>
                    </>
    
                }
                
            </div>
        )
    }

    return (
        <div 
            className="relative flex text-white flex-col gap-y-4 justify-between px-4 py-4 bg-mainShade rounded-md font-medium text-xl"
        >
            {smallerMenu === false ?
                <>
                    <div className="flex flex-col gap-y-2">
                        <ImageLink 
                            className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                            imageUrl={"/icons/house-solid.svg" }
                            imageAlt={"Home link icon"}
                            imageSize={"6"}
                            linkText={"Home"}
                            to={"/"}
                        />
                        <ImageLink 
                            className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "login" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                            imageUrl={"/icons/right-from-bracket-solid.svg" }
                            imageAlt={"Login link icon"}
                            imageSize={"6"}
                            linkText={"Login"}
                            to={"/login"}
                        />
                        <ImageLink 
                            className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "signup" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                            imageUrl={"/icons/user-plus-solid.svg" }
                            imageAlt={"Sign Up link icon"}
                            imageSize={"6"}
                            linkText={"Sign Up"}
                            to={"/signup"}
                        />
                    </div>
                    <div 
                        className="absolute top-1/2 right-0 translate-x-full px-1 py-4 bg-mainShade opacity-75 hover:opacity-100 cursor-pointer"
                        onClick={() => {
                            setSmallerMenu((value) => !value)
                        }}
                    >
                        <img src="/icons/chevron-left-solid.svg" alt="arrow icon" className="w-6 h-6"/>
                    </div>
                </>
            :
                <>
                    <div className="flex flex-col gap-y-2">
                        <ImageLink 
                            className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                            imageUrl={"/icons/house-solid.svg" }
                            imageAlt={"Home link icon"}
                            imageSize={"6"}
                            to={"/"}
                        />
                        <ImageLink 
                            className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "login" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                            imageUrl={"/icons/right-from-bracket-solid.svg" }
                            imageAlt={"Login link icon"}
                            imageSize={"6"}
                            to={"/login"}
                        />
                        <ImageLink 
                            className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-main " + (location === "signup" ? "bg-main opacity-100 filter-svg text-orange" : " ")}
                            imageUrl={"/icons/user-plus-solid.svg" }
                            imageAlt={"Sign Up link icon"}
                            imageSize={"6"}
                            to={"/signup"}
                        />
                    </div>
                    <div 
                        className="absolute top-1/2 right-0 translate-x-full px-1 py-4 bg-mainShade opacity-75 hover:opacity-100 cursor-pointer"
                        onClick={() => {
                            setSmallerMenu((value) => !value)
                        }}
                    >
                        <img src="/icons/chevron-left-solid.svg" alt="arrow icon" className="w-6 h-6 rotate-180"/>
                    </div>
                </>

            }
            
        </div>
    )
}

export default NavBar