import { useContext } from "react";
import { UserContext } from "../context/contextUser";

export function useUser(){
    return useContext(UserContext);
}