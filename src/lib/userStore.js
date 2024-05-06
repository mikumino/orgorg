import { writable } from "svelte/store";
import { supabase } from "./supabaseClient";

export const user = writable(null);

supabase.auth.onAuthStateChange((event, session) => {
    if(session){
        user.set(session?.user);
    }else{
        user.set(null);
    }
    
});