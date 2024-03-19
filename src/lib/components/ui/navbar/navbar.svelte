<script>
    import { Button } from "$lib/components/ui/button";
</script>
<div class="w-full outline-slate-300 shadow-md outline-1 outline">
    <div class="flex flex-row justify-between items-center mx-4 p-4">
        <a href="/" class="text-xl font-bold">OrgOrg</a>
        <div class="flex flex-row space-x-2">
            <Button href="/organize">Organize</Button>
            <Button href="/register" variant='outline'>Register</Button>
            <Button href="/login" variant='outline'>Login</Button>
        </div>
    </div>
</div>