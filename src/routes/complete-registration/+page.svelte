<script>
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { supabase } from "../../supabaseClient";

    let loading = false;
    let username = "";
    let displayName = "";

    const handleFinalizeRegistration = async () => {

    }
</script>

<div class="flex bg-slate-200 h-screen items-center justify-center">
    <Card.Root class="w-[350px] drop-shadow-lg">
        <Card.Header>
            <h1 class="text-2xl font-bold">Complete registration</h1>
        </Card.Header>
        <Card.Content>
            <form on:submit|preventDefault={handleFinalizeRegistration}>
                <div class="flex flex-col space-y-4">
                    <div class="flex flex-col space-y-2">
                        <Label for="username">Username</Label>
                        <Input type="username" id="username" bind:value={username} />
                    </div>
                    <div class="flex flex-col space-y-2">
                        <Label for="displayName">Display name</Label>
                        <Input type="displayName" id="displayName" bind:value={displayName} />
                    </div>
                    <div class="flex flex-row">
                    </div>
                </div>
                <Button type="submit">Create account</Button>
            </form>
        </Card.Content>
        <Card.Footer>
        </Card.Footer>
    </Card.Root>
</div>