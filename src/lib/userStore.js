import { writable } from "svelte/store";
import { supabase } from "../supabaseClient";

export const user = writable(supabase.auth.getUser());

supabase.auth.onAuthStateChange((event, session) => {
    user.set(session?.user);
});

export async function signOut() {
    await supabase.auth.signOut();
}