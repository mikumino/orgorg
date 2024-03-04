<script>
    import { Button } from "$lib/components/ui/button";
</script>

<div class="flex flex-row h-screen items-center">
    <div class="flex flex-col ml-24 space-y-6 w-2/3">
        <h1 class="text-6xl font-bold">OrgOrg</h1>
        <h3 class="text-xl">Meeting organization made easy.</h3>
        <div class="flex flex-row space-x-2">
            <Button href="/organize">Organize</Button>
            <Button href="/register" variant='outline'>Register</Button>
            <Button href="/login" variant='outline'>Login</Button>
        </div>
    </div>
    <div class="flex flex-col bg-slate-200 w-1/3 h-full">
    
    </div>
</div>

