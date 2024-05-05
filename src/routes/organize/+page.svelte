<!-- Form needs client-side validation -->

<script>
    import { supabase } from "../../supabaseClient";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
    import DatePicker from "$lib/components/ui/datepicker/datepicker.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
    import Timepicker from "$lib/components/ui/timepicker/timepicker.svelte";
	import { goto } from "$app/navigation";

    let startTimeHour = 7;
    let startTimePeriod = "AM";
    let endTimeHour = 7;
    let endTimePeriod = "PM";

    let formData = {
        meetingName: "",
        startTime: "",
        endTime: "",
        selectedDates: []
    };

    // turn time into iso string
    $: formData.startTime = `${startTimeHour}:00 ${startTimePeriod}`;
    $: formData.endTime = `${endTimeHour}:00 ${endTimePeriod}`;
    async function createMeeting() {
        const { data, error } = await supabase
            .from("Meetings")
            .insert([
                {
                    EventName: formData.meetingName,
                    MinTime: formData.startTime,
                    MaxTime: formData.endTime,
                    dates: formData.selectedDates
                }
            ])
            .select();
        if (error) {
            console.error(error);
        } else {
            console.log(data[0]);
            goto(`/meeting/${data[0].id}`);
        } 
    }

</script>

<style>
    
</style>

<div class="h-screen">
    <Navbar />
    <div class="flex flex-row items-center justify-center h-full">
        <div class="flex flex-col space-y-6 mr-12">
            <h1 class="text-4xl font-bold">Organize meeting</h1>
            <form class="w-fit" on:submit|preventDefault={createMeeting}>
                <div class="flex flex-col space-y-4 mb-4 w-96">
                    <Label for="meetingName">Meeting name</Label>
                    <Input type="text" id="meetingName" bind:value={formData.meetingName}/>
                </div>
                <div class="flex flex-col space-y-4 mb-4">
                    <Label for="timeRange">Time range</Label>
                    <div class="flex flex-row space-x-6">
                        <Timepicker bind:selectedHour={startTimeHour} bind:selectedPeriod={startTimePeriod} />
                        <p>to</p>
                        <Timepicker bind:selectedHour={endTimeHour} bind:selectedPeriod={endTimePeriod} />
                    </div>
                </div>
                <Button type="submit">Create meeting</Button>
            </form>
        </div>
        <div>
            <DatePicker bind:selectedDates={formData.selectedDates} />
        </div>
    </div>
</div>