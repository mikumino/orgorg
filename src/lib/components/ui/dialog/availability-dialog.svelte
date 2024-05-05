<script>
    import * as Dialog from "$lib/components/ui/dialog";
	import { createEventDispatcher } from "svelte";
	import Button from "../button/button.svelte";
    import Input from "../input/input.svelte";
    import Label from "../label/label.svelte";

    export let name = "";
    const dispatch = createEventDispatcher();
    
    function addAsGuest() {
        dispatch("addAsGuest", {name});
    }
</script>

<Dialog.Root>
    <Dialog.Trigger>
        <Button>Add Availability</Button>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title class="text-2xl">Add Availability</Dialog.Title>
        </Dialog.Header>
        <div class="flex flex-col my-6 justify-center">
            <div>
                <Button class="w-full">Add as User</Button>
                <p class="text-center my-6">or</p>
            </div>
            <div class="flex flex-col">
                <Label class="mb-4" for="name">Name</Label>
                <Input class="mb-6" id="name" type="text" bind:value={name}  />
                <Button on:click={addAsGuest} variant="outline">Add as Guest</Button>
            </div>
        </div>
    </Dialog.Content>
</Dialog.Root>