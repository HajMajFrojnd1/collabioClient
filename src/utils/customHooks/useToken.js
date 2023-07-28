import TokenContext from "../../context/TokenContext";
import { useContext } from "react";

export const useToken = () =>{
    return useContext(TokenContext);
}