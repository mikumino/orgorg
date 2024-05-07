<!-- This is not functional right now, just UI -->

<script>
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { supabase } from "../../supabaseClient";
    let username, displayName, email, password, confirmPassword;

    async function handleSubmit() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        } else {
            console.log(data);
            await supabase.from("users").insert([
                {
                    id: data.user.id,
                    username: username,
                    display_name: displayName,
                    email: data.user.email,
                },
            ]);
            alert("Account created! Please check your email for a verification link.");
        }
    }
</script>

<div class="flex bg-slate-200 h-screen items-center justify-center">
    <Card.Root class="w-[350px] drop-shadow-lg">
        <form on:submit|preventDefault={handleSubmit} id="signup">
        <Card.Header>
            <h1 class="text-2xl font-bold">Register</h1>
        </Card.Header>
        <Card.Content>
                <div class="flex flex-col space-y-4">
                    <div class="flex flex-col space-y-2">
                        <Label for="username">Username</Label>
                        <Input bind:value={username} type="text" id="username" />
                    </div>
                    <div class="flex flex-col space-y-2">
                        <Label for="displayName">Display name</Label>
                        <Input bind:value={displayName} type="text" id="displayName" />
                    </div>
                    <div class="flex flex-col space-y-2">
                        <Label for="email">Email</Label>
                        <Input bind:value={email} type="email" id="email" />
                    </div>
                    <div class="flex flex-col space-y-2">
                        <Label for="password">Password</Label>
                        <Input bind:value={password} type="password" id="password" />
                    </div>
                    <div class="flex flex-col space-y-2">
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input bind:value={confirmPassword} type="password" id="confirmPassword" />
                    </div>
                    <div class="flex flex-row">
                        <Button type="submit">Register</Button>
                    </div>
                </div>
            </Card.Content>
            <Card.Footer>
                <p>Already have an account? <a class="underline" href="/login">Login</a></p>
            </Card.Footer>
        </form>
    </Card.Root>
</div>