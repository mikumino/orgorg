<script>
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
</script>

<style>
    
</style>

<div class="h-screen">
    <Navbar />
    <div class="flex mt-24 ml-24 h-full">
        <div class="flex flex-col space-y-6 w-1/3">
            <h1 class="text-4xl font-bold">Organize meeting</h1>
            <form>
                <div class="flex flex-col space-y-4 mb-4 w-96">
                    <Label for="meetingName">Meeting name</Label>
                    <Input type="text" id="meetingName"/>
                </div>
                <div class="flex flex-col space-y-4">
                    <Label for="timeRange">Time range</Label>
                    <div class="flex flex-row space-x-4">
                        <Input id="startTime" class='w-fit' type="time" />
                        <p class="text-slate-500">to</p>
                        <Input id="endTime" class='w-fit' type="time" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>