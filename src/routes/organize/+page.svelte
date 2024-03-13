<script>
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
</script>

<div class="h-screen">
    <Navbar />
    <div class="flex items-center ml-24 h-full">
        <div class="flex flex-col space-y-6 w-1/2">
            <h1 class="text-4xl font-bold">Organize meeting</h1>
            <form>
                <div class="flex flex-col space-y-4 mb-4 w-96">
                    <Label for="meetingName">Meeting name</Label>
                    <Input type="text" id="meetingName"/>
                </div>
                <div class="flex flex-col space-y-4">
                    <Label for="timeRange">Time range</Label>
                    <div class="flex flex-row space-x-4">
                        <Input type="text" id="timeRange" placeholder="Start time"/>
                        <p class="text-slate-500">to</p>
                        <Input type="text" id="timeRange" placeholder="End time"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>