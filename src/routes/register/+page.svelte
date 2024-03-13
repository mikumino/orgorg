<!-- This is not functional right now, just UI -->

<script>
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
</script>

<div class="flex h-screen items-center justify-center">
    <Card.Root class="w-[350px] drop-shadow-lg">
        <Card.Header>
            <h1 class="text-2xl font-bold">Register</h1>
        </Card.Header>
        <Card.Content>
            <form>
                <div class="flex flex-col space-y-4">
                    <div class="flex flex-col space-y-2">
                        <Label for="username">Username</Label>
                        <Input type="text" id="username" />
                    </div>
                    <div class="flex flex-col space-y-2">
                        <Label for="email">Email</Label>
                        <Input type="email" id="email" />
                    </div>
                    <div class="flex flex-col space-y-2">
                        <Label for="password">Password</Label>
                        <Input type="password" id="password" />
                    </div>
                    <div class="flex flex-col space-y-2">
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input type="password" id="confirmPassword" />
                    </div>
                    <div class="flex flex-row">
                        <Button type="submit">Register</Button>
                    </div>
                </div>
            </form>
        </Card.Content>
        <Card.Footer>
            <p>Already have an account? <a class="underline" href="/login">Login</a></p>
        </Card.Footer>
    </Card.Root>
</div>