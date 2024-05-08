<script>
    import * as Dialog from "$lib/components/ui/dialog";
	import { createEventDispatcher } from "svelte";
	import Button from "../button/button.svelte";
    import Input from "../input/input.svelte";
    import Label from "../label/label.svelte";
    import { Pencil } from 'lucide-svelte';

    export let name = "";
    const dispatch = createEventDispatcher();
    
    function addAsGuest() {
        dispatch("addAsGuest", {name});
    }
    function addAsUser() {
        dispatch("addAsUser");
    }
</script>

<Dialog.Root>
    <Dialog.Trigger>
        <Button><Pencil class="mr-2 w-4 h-4" /> Add/Edit Availability</Button>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title class="text-2xl">Add/Edit Availability</Dialog.Title>
        </Dialog.Header>
        <div class="flex flex-col my-6 justify-center">
            <div>
                <Button on:click={addAsUser} class="w-full">Add/Edit as User</Button>
                <p class="text-center my-6">or</p>
            </div>
            <form class="flex flex-col" on:submit|preventDefault={addAsGuest}>
                <Label class="mb-4" for="name">Name</Label>
                <Input class="mb-6" id="name" type="text" required bind:value={name}  />
                <Button type="submit" variant="outline">Add/Edit as Guest</Button>
            </form>
        </div>
    </Dialog.Content>
</Dialog.Root>