<script>
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { supabase } from "../../supabaseClient";

    let loading = false;
    let email = "";

    const handleLogin = async () => {
        console.log("handleLogin");
        try {
            loading = true;
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) throw error;
            alert("Check your email for the login link!");
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    }
</script>

<div class="flex h-screen items-center justify-center">
    <Card.Root class="w-[350px] drop-shadow-lg">
        <Card.Header>
            <h1 class="text-2xl font-bold">Login</h1>
        </Card.Header>
        <Card.Content>
            <form on:submit|preventDefault={handleLogin}>
                <div class="flex flex-col space-y-4">
                    <div class="flex flex-col space-y-2">
                        <Label for="email">Email</Label>
                        <Input type="email" id="email" bind:value={email} />
                    </div>
                    <div class="flex flex-row">
                    </div>
                </div>
                <Button type="submit">Login</Button>
            </form>
        </Card.Content>
        <Card.Footer>
        </Card.Footer>
    </Card.Root>
</div>