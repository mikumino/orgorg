<script>
    import { Button } from "$lib/components/ui/button";
    import { user } from "$lib/userStore";
	import { supabase } from "../supabaseClient";
    import { signOut } from "$lib/userStore";
    import calendar from "$lib/assets/calendar.png";
</script>

<svelte:head>
    <title>OrgOrg</title>
</svelte:head>

<div class="flex flex-row h-screen mx-auto max-w-screen-xl justify-center items-center">
    <div class="flex flex-col w-fit space-y-6 mr-28">
        <h1 class="text-6xl font-bold">OrgOrg</h1>
        <h3 class="text-xl">Meeting organization made easy.</h3>
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
    <img src={calendar} alt="calendar" class="w-1/3"/>
</div>