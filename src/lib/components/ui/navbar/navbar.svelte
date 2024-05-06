<script>
    import { Button } from "$lib/components/ui/button";
    import { user } from "$lib/userStore";
    import { signOut } from "$lib/userStore";
</script>
<div class="fixed w-full bg-white outline-slate-300 shadow-md outline-1 outline">
    <div class="flex flex-row justify-between items-center mx-4 p-4">
        <a href="/" class="text-xl font-bold">OrgOrg</a>
        <div class="flex flex-row space-x-2">
            <Button href="/organize">Organize</Button>
            {#if $user}
                <Button href="/profile" variant="outline">Profile</Button>
                <Button on:click={signOut} variant="outline">Log out</Button>
            {:else}
                <Button href="/register" variant='outline'>Register</Button>
                <Button href="/login" variant='outline'>Login</Button>
            {/if}
        </div>
    </div>
</div>