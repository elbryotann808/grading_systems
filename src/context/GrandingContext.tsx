import { createContext } from "react";
import type { typesGrandingContext } from "../types";

export const GrandingContext  = createContext<typesGrandingContext | null>(null)