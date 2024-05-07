import { writable } from "svelte/store";
import { supabase } from "../supabaseClient";

export const user = writable(supabase.auth.getUser());

supabase.auth.onAuthStateChange((event, session) => {
    if(session){
        user.set(session?.user);
    } else {
        user.set(null);
    }
});

export async function signOut() {
    await supabase.auth.signOut();
}