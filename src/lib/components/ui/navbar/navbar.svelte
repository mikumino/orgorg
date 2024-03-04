<script>
    import { Button } from "$lib/components/ui/button";
</script>
<div class="m-4">
    <div class="w-full bg-slate-100 rounded-lg drop-shadow-lg">
        <div class="flex flex-row justify-between items-center p-4">
            <h1 class="text-xl font-bold">OrgOrg</h1>
            <div class="flex flex-row space-x-2">
                <Button href="/organize">Organize</Button>
                <Button href="/register" variant='outline'>Register</Button>
                <Button href="/login" variant='outline'>Login</Button>
            </div>
        </div>
    </div>
</div>