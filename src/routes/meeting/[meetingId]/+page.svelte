<script>
    import AvailabilityDialog from "$lib/components/ui/dialog/availability-dialog.svelte";
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
    import AvailabilityPicker from "$lib/components/availability/availabilitypicker.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
	import { supabase } from "../../../supabaseClient.ts";

    export let data;
    let meeting;
    let availabilities;
    let addMode = false;
    
    if ('body' in data && 'meeting' in data.body) {
        meeting = data.body.meeting;
        availabilities = data.body.availabilities;
        console.log(meeting);
        console.log(availabilities);
    }
    let meetingName = meeting.EventName;
    let selectedDates = meeting.dates.map((/** @type {string} */ date) => {
        let [year, month, day] = date.split("-").map((/** @type {string} */ datePart) => parseInt(datePart));
        return new Date(year, month-1, day);
    });
    let startHour = parseInt(meeting.MinTime.split(":")[0]);
    let endHour = parseInt(meeting.MaxTime.split(":")[0]);
    let names = availabilities.map((/** @type {any} */ availability) => availability.username);

    // TODO: handle logged in user
    let availabilitySelectionData = {
        username: "",
        datetimes: [],
    }

    function populateSavedAvailabilities() {
        if(!addMode) {
             availabilities.forEach(function(availability) {
                availability.datetimes.forEach(function(timeSlot) {
                    availabilitySelectionData.datetimes.push(new Date(timeSlot));
                })
             })
        }
    }     
    function handleGuestMode(event) {
        console.log(event.detail);
        clearFields();
        availabilitySelectionData.username = event.detail.name;
        addMode = true;
    }
    async function saveAvailability() {
        console.log("Saving availability");
        if (availabilitySelectionData.username === "") {
            console.error("No username provided");
            addMode = false;
            return;
        } 
        if (availabilitySelectionData.datetimes.length === 0) {
            console.error("No datetimes provided");
            addMode = false;
            return;
        }
        const { data, error } = await supabase
            .from('Availabilities')
            .insert([
                {
                    meeting_id: meeting.id,
                    username: availabilitySelectionData.username,
                    datetimes: availabilitySelectionData.datetimes
                }
            ])
            .select();
        if (error) {
            console.error(error);
        } else {
            console.log(data[0]);
            refetchAvailabilities();
            clearFields();
        }
        addMode = false;
    }

    function clearFields() {
        availabilitySelectionData.username = "";
        availabilitySelectionData.datetimes = [];
    }

    async function refetchAvailabilities() {
        const { data, error } = await supabase
            .from('Availabilities')
            .select()
            .eq('meeting_id', meeting.id);
        if (error) {
            console.error(error);
        } else {
            console.log(data);
            availabilities = data;
            names = availabilities.map((/** @type {any} */ availability) => availability.username);
            populateSavedAvailabilities(); // this doesn't seem to do anything
        }
    }

    populateSavedAvailabilities();

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
                {#if addMode}
                    <Button on:click={saveAvailability}>Save</Button>
                {:else}
                    <AvailabilityDialog on:addAsGuest={handleGuestMode}/>
                {/if}
            </div>
        </div>
        <div class="flex flex-row gap-x-4 w-5/6 justify-between">
            <div class="flex flex-col basis-full shrink min-w-0 max-h-96 h-96 overflow-y-scroll">
                <AvailabilityPicker bind:selectedSlots={availabilitySelectionData.datetimes} selectedDates={selectedDates} startHour={startHour} endHour={endHour} numResponses={names.length} bind:addMode={addMode} />
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