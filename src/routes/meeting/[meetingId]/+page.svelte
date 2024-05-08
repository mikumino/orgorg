<script>
    import AvailabilityDialog from "$lib/components/ui/dialog/availability-dialog.svelte";
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
    import AvailabilityPicker from "$lib/components/availability/availabilitypicker.svelte";
    import AvailabilityLegend from "$lib/components/availability/availabilitylegend.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
	import { supabase } from "../../../supabaseClient.ts";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
    
    export let data;
    let meeting;
    let availabilities;
    let addMode = false;
    let cellColors = [];
    let userInfo;
    let meetingPass = '';
    let meetingId;

    onMount(async () => {
        const url = window.location.pathname;
        meetingId = url.split('/').pop();
        const user = await supabase.auth.getUser();
        let userData = user.data.user;

        const { data, error } = await supabase
            .from('users')
            .select('id, email, username, display_name')
            .eq('id', userData?.id)
            .single();
        if (error) {
            console.error(error);
        } else {
            userInfo = data;
        }
        fetchMeetingData();
    });
    async function fetchMeetingData(){
        try{
            const { data: meetingData, error: meetingError} = await supabase
                .from('Meetings')
                .select('*')
                .eq('id', meetingId)
                .single();

            if(meetingError){
                throw meetingError;
            }
            meeting = meetingData;
            meetingPass = meeting.password;
            const {data: availabilityData, error: availabilityError } = await supabase
                .from('Availabilities')
                .select('*')
                .eq('meeting_id', meetingId);

            if(availabilityError){
                throw availabilityError
            }
            availabilities = availabilityData;
            addMode = true;
                
    }catch(error){
        console.error("Error fetching data:", error.message);
    }
    }
    async function validatePassword(){
        try{
            if(meeting.pass_required){
                const enteredPass = window.prompt("This meeting requires a password. Please enter the password:");
                if(enteredPass !== meetingPass){
                    alert("Incorrect password");
                 
                }else{
                    fetchMeetingData();
                }
            }else{
                fetchMeetingData();
            }
        }catch(error){
            console.error("Error validating password:", error.message);
        }
        
    }

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
        
    // fetch the saved availabilities and fill in the availability component accordingly
    populateSavedAvailabilities(names);

    function populateSavedAvailabilities(nameList) {
        getCellColors(nameList);
        availabilities.forEach(function(availability) {
            availability.datetimes.forEach(function(timeSlot) {
                availabilitySelectionData.datetimes.push(new Date(timeSlot));
            })
        })
    }

    function getCellColors(nameList) {
        // color calculation
        let cappedNumResponses = Math.min(nameList.length, 10);

        let lightColor = "#dbeafe";
        let darkColor = "#172554";

        let step = 1 / cappedNumResponses;
        
        let newCellColors = [];

        for (let i = 0; i < cappedNumResponses; i++) {
            let darkness = step * i;
            let r = Math.round(parseInt(lightColor.slice(1, 3), 16) * (1 - darkness) + parseInt(darkColor.slice(1, 3), 16) * darkness);
            let g = Math.round(parseInt(lightColor.slice(3, 5), 16) * (1 - darkness) + parseInt(darkColor.slice(3, 5), 16) * darkness);
            let b = Math.round(parseInt(lightColor.slice(5, 7), 16) * (1 - darkness) + parseInt(darkColor.slice(5, 7), 16) * darkness);
            let color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            newCellColors.push(color);
        }
        newCellColors.unshift("none");

        cellColors = newCellColors;
    }
    
    function handleGuestMode(event) {
        console.log(event.detail);
        clearFields();
        availabilitySelectionData.username = event.detail.name;
        addMode = true;
    }

    function handleUserMode() {
        clearFields();
        console.log(userInfo);
        availabilitySelectionData.username = userInfo.display_name;
        addMode = true;
    }

    async function saveAvailability() {
        console.log("Saving availability");
        if (availabilitySelectionData.username === "") {
            console.error("No username provided");
            addMode = false;
            clearFields();
            refetchAvailabilities();
            return;
        } 
        if (availabilitySelectionData.datetimes.length === 0) {
            console.error("No datetimes provided");
            addMode = false;
            clearFields();
            refetchAvailabilities();
            return;
        }
        const { data, error } = await supabase
            .from('Availabilities')
            .insert([
                {
                    meeting_id: meeting.id,
                    username: availabilitySelectionData.username,
                    datetimes: availabilitySelectionData.datetimes,
                    user_id: userInfo ? userInfo.id : null
                }
            ])
            .select();
        if (error) {
            console.error(error);
        } else {
            console.log(data[0]);
            addMode = false;
            clearFields();
            refetchAvailabilities();
        }
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
            populateSavedAvailabilities(names); // this doesn't seem to do anything
        }
    }


</script>

<style>

</style>

<div class="h-screen">
    <Navbar />
    <div class="flex flex-col items-center justify-center gap-y-8 w-full max-w-screen-lg mx-auto py-32">
        <div class="flex flex-row items-center w-5/6 justify-between">
            <div class="flex flex-col space-y-2 mr-12 w-96">
                <h1 class="text-4xl font-bold">{meetingName}</h1>
                <h2 class="text-2xl">Availabilities</h2>
            </div>
            <div class="flex flex-col">
                {#if addMode}
                    <Button on:click={saveAvailability}>Save</Button>
                {:else}
                    {#if meeting.pass_required}
                        <div>
                            <label for="meetingPass">Enter Meeting Password:</label>
                            <input type="password" id="meetingPass" bind:value={meetingPass} />
                            <Button on:click={validatePassword}>Submit</Button>
                        </div>
                    {:else}
                        <AvailabilityDialog on:addAsUser={handleUserMode} on:addAsGuest={handleGuestMode}/>
                    {/if}
                {/if}
            </div>
        </div>
        <div class="flex flex-row gap-x-4 w-5/6 justify-between">
            <div class="flex flex-col basis-full min-w-0 grow">
                {#if names.length > 1}
                    <AvailabilityLegend cellColors={cellColors} numResponses={names.length} />
                {/if}
                <div class="flex-row max-h-full overflow-auto">
                    {#key availabilities}
                        <AvailabilityPicker bind:selectedSlots={availabilitySelectionData.datetimes} selectedDates={selectedDates} startHour={startHour} endHour={endHour} cellColors={cellColors} bind:addMode={addMode} />
                    {/key}
                </div>
            </div>
            <div class="flex flex-col gap-y-4 shrink text-wrap w-32">        
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