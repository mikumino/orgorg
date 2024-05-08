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
    import Terminal from "lucide-svelte/icons/terminal";
    import CircleAlert from "lucide-svelte/icons/circle-alert";
    import * as Alert from "$lib/components/ui/alert/index.ts";

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

    let errors = [];

    async function createMeeting() {
        // error checking - this solution is rough and doesn't use the error functions or components that we have
        errors = [];
        
        // time checking
        let startTimeRaw = startTimeHour;
        let endTimeRaw = endTimeHour
        // convert 12h PM times to 24h
        if(startTimePeriod == "PM")
            startTimeRaw += 12;
        if(endTimePeriod == "PM")
            endTimeRaw += 12;
        if(endTimeRaw - startTimeRaw <= 0) { // can't set times to be the same or backwards
            errors.push("Please enter a valid time range.");
        }

        // name checking
        if(formData.meetingName.trim() == "") {
            errors.push("Please enter a meeting name.");
        }

        // date checking
        if(formData.selectedDates.length == 0) {
            errors.push("Please select at least one meeting date.");
        }

        // halt function if any errors are present
        if(errors.length != 0) {
            return;
        }
        
        // create the database entry if no errors are found
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

<!-- display errors in an elegant fashion -->
{#if errors.length > 0}
  <Alert.Root variant="destructive">
    <CircleAlert class="h-4 w-4" />
    <Alert.Title>Error!</Alert.Title>
    {#each errors as error (error)}
      <Alert.Description>{error}</Alert.Description>
    {/each}
  </Alert.Root>
{/if}

<style>
    
</style>

<div class="h-screen">
    <Navbar />
    <div class="flex items-center bg-slate-200 justify-center h-full">
        <div class="flex flex-row p-12 h-fit bg-white rounded-2xl shadow-lg items-center justify-center">
            <div class="flex flex-col space-y-6 mr-64">
                <h1 class="text-5xl font-bold">Organize meeting</h1>
                <form class="flex flex-col w-fit" on:submit|preventDefault={createMeeting}>
                    <div class="flex flex-col space-y-4 mb-4 w-96">
                        <Label for="meetingName">Meeting name</Label>
                        <Input type="text" id="meetingName" required bind:value={formData.meetingName}/>
                    </div>
                    <div class="flex flex-col space-y-4 mb-8">
                        <Label for="timeRange">Time range</Label>
                        <div class="flex flex-row space-x-6">
                            <Timepicker bind:selectedHour={startTimeHour} bind:selectedPeriod={startTimePeriod} />
                            <p>to</p>
                            <Timepicker bind:selectedHour={endTimeHour} bind:selectedPeriod={endTimePeriod} />
                        </div>
                    </div>
                    <div>
                        <Button type="submit">Create meeting</Button>
                    </div>
                </form>
            </div>
            <div>
                <DatePicker bind:selectedDates={formData.selectedDates} />
            </div>
        </div>
    </div>

</div>