<script>
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
    import Availability from "$lib/components/ui/datepicker/Availability.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    let meetingName = "Awesome meeting";
    let selectedDates = [
        new Date(2024, 3, 29),
        new Date(2024, 3, 30),
        new Date(2024, 4, 1),
        new Date(2024, 4, 2),
        new Date(2024, 4, 3)
    ];
    console.log(selectedDates[0]);
    let startHour = 0;
    let endHour = 5;
    let names = ["Alan", "Ava", "Dylan", "Daniel", "Lauren"]
</script>

<style>

</style>

<div class="h-screen">
    <Navbar />
    <div class="flex flex-col items-center justify-center h-full gap-y-8">
        <div class="flex flex-row items-center">
            <div class="flex flex-col space-y-2 mr-12 w-96">
                <h1 class="text-4xl font-bold">{meetingName}</h1>
                <h2 class="text-2xl">Availabilities</h2>
            </div>
            <div class="flex flex-col">
                <Button>Add Availability</Button>
            </div>
        </div>
        <div class="flex flex-row gap-x-4">
            <div class="flex flex-col items-center">
                <Availability selectedDates={selectedDates} startHour={startHour} endHour={endHour} />
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