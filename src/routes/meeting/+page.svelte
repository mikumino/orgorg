<script>
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
    import AvailabilityPicker from "$lib/components/availability/availabilitypicker.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    let meetingName = "Awesome meeting";
    let selectedDates = [
        new Date(2024, 3, 29),
        new Date(2024, 3, 30),
        new Date(2024, 4, 1),
        new Date(2024, 4, 2),
        new Date(2024, 4, 3),
        new Date(2024, 4, 4),
        new Date(2024, 4, 5),
        new Date(2024, 4, 6),
        new Date(2024, 4, 7),
        new Date(2024, 4, 8),
        new Date(2024, 4, 9),
        new Date(2024, 4, 10),
    ];
    let startHour = 0;
    let endHour = 24;
    let names = ["Alan", "Ava", "Dylan", "Daniel", "Lauren"]
</script>

<style>

</style>

<div class="h-screen">
    <Navbar />
    <div class="flex flex-col items-center justify-center h-full gap-y-8 w-full max-w-screen-lg mx-auto">
        <div class="flex flex-row items-center w-5/6 justify-between">
            <div class="flex flex-col space-y-2 mr-12 w-96">
                <h1 class="text-4xl font-bold">{meetingName}</h1>
                <h2 class="text-2xl">Availabilities</h2>
            </div>
            <div class="flex flex-col">
                <Button>Add Availability</Button>
            </div>
        </div>
        <div class="flex flex-row gap-x-4 w-5/6 justify-between">
            <div class="flex flex-col basis-full shrink min-w-0 max-h-96 h-96 overflow-y-scroll">
                <AvailabilityPicker selectedDates={selectedDates} startHour={startHour} endHour={endHour} />
            </div>
            <div class="flex flex-col gap-y-4">        
                <h3 class="text-2xl font-medium">Responders ({names.length})</h3>
                {#each names as name}
                <p>
                    {name}
                </p>
                {/each}
            </div>
        </div>
    </div>
</div>