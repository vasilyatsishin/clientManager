import { useContext } from "react";
import { InitializeContext } from "../providers/InitializeProvider";

export const useAuth = () => useContext(InitializeContext);
