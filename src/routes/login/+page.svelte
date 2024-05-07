<script>
	import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { supabase } from "../../supabaseClient";

    let loading = false;
    let email, password;

    const handleLogin = async () => {
        console.log("handleLogin");
        try {
            loading = true;
            const { error } = await supabase.auth.signInWithPassword({ email: email, password: password });
            if (error) throw error;
        } catch (error) {
            console.error("Error logging in:", error.message);
        } finally {
            loading = false;
            goto("/");
        }
    }
</script>

<div class="flex h-screen items-center justify-center">
    <Card.Root class="w-[350px] drop-shadow-lg">
        <form on:submit|preventDefault={handleLogin}>
        <Card.Header>
            <h1 class="text-2xl font-bold">Login</h1>
        </Card.Header>
        <Card.Content>
                <div class="flex flex-col space-y-4">
                    <div class="flex flex-col space-y-4">
                        <Label for="email">Email</Label>
                        <Input type="email" id="email" bind:value={email} />
                        <Label for="password">Password</Label>
                        <Input type="password" id="password" bind:value={password} />
                    </div>
                    <div class="flex flex-row">
                    </div>
                </div>
            </Card.Content>
            <Card.Footer>
                <div class="flex flex-col space-y-2">
                    <Button type="submit">Login</Button>
                    <p class="text-slate-500">Don't have an account? <a class="underline" href="/login">Sign up</a></p>
                </div>
            </Card.Footer>
        </form>
    </Card.Root>
</div>