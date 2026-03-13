import { useContext } from "react";
import { UserContext } from "../context/contextUser.jsx";

export function useUser(){
    return useContext(UserContext);
}