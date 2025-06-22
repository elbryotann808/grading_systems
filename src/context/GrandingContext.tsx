import { createContext } from "react";
import type { typesGrandingContext } from "../types";

//Crea el contexto 
export const GrandingContext = createContext<typesGrandingContext | null>(null)