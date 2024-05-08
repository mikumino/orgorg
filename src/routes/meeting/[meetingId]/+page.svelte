<script>
    import AvailabilityDialog from "$lib/components/ui/dialog/availability-dialog.svelte";
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
    import AvailabilityPicker from "$lib/components/availability/availabilitypicker.svelte";
    import AvailabilityLegend from "$lib/components/availability/availabilitylegend.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
	import { supabase } from "../../../supabaseClient.ts";
	import { onMount } from "svelte";
    import { Pencil } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { sha256 } from "js-sha256";
	import Account from "$lib/Account.svelte";

    export let data;
    let meeting;
    let availabilities;
    let addMode = false;
    let passwordAuthenticated = false;
    let passwordIncorrect = false;
    let meetingPass;
    // let editMode = false;
    // let selectedSlotsEdit = [];
    let selectedAvailability = null;
    let cellColors = [];
    let userInfo;
    let hoveredCell = null;
    let numResponses = 0;

    onMount(async () => {
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
    });

    $: {
        if(hoveredCell !== null) {
            names = availabilities.filter(availability => hasDate(availability.datetimes, hoveredCell)).map(availability => availability.username);
        } else {
            names = availabilities.map(availability => availability.username);
        }
    }
    
    if ('body' in data && 'meeting' in data.body) {
        meeting = data.body.meeting;
        availabilities = data.body.availabilities;
        numResponses = availabilities.length;
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

    /**
     * Given an array of dates and a date, returns true if the date is in the array
     * Uses timestamps to compare dates by value RAHHHH
     * shouldve moved this to a utils file lol ive used this in 3 files now
	 * @param {{getTime: () => number;}} date
	 * @param {any[]} array
	 */
     function hasDate(array, date) {
        return array.find(arrayDate => Date.parse(arrayDate) === date.getTime());
    }

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
        let darkColor = "#5b70fb";

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
        let existingAvailability = availabilities.find(availability => availability.username === event.detail.name);
        if (existingAvailability) {
            // treat as edit mode
            availabilitySelectionData.username = event.detail.name;
            availabilitySelectionData.datetimes = existingAvailability.datetimes;
            console.log(availabilitySelectionData.datetimes);
            addMode = true;
        } else {
            console.log(event.detail);
            clearFields();
            availabilitySelectionData.username = event.detail.name;
            addMode = true;
        }
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
        console.log(availabilitySelectionData.datetimes);
        // insert if new, update if existing
        let existingAvailability = availabilities.find(availability => availability.username === availabilitySelectionData.username);
        console.log(existingAvailability);
        if (existingAvailability) {
            existingAvailability.datetimes = availabilitySelectionData.datetimes;
            const { data, error } = await supabase
                .from('Availabilities')
                .upsert([existingAvailability]);
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                addMode = false;
                clearFields();
                refetchAvailabilities();
            }
        } else {
            const { data, error } = await supabase
                .from('Availabilities')
                .insert([
                    {
                        meeting_id: meeting.id,
                        username: availabilitySelectionData.username,
                        datetimes: availabilitySelectionData.datetimes,
                    }
                ]);
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                addMode = false;
                clearFields();
                refetchAvailabilities();
            }
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

    async function checkPassword() {
        const {data, error} = await supabase
            .from('Meetings')
            .select()
            .match({id: meeting.id, password: sha256(meetingPass)})
        if(data.length !== 0) {
            console.log(data);
            passwordIncorrect = false;
            passwordAuthenticated = true;
        } else {
            passwordIncorrect = true;
        }
    }

    // function toggleEditMode(){
    //     editMode != editMode;
    //      if(!editMode){
    //         addMode = false;
    //         clearFields();
    //      }
    // }

    function selectAvailability(index){
        editMode = true;
        selectedAvailability = availabilities[index];
    }

    // async function saveChanges(){
    //     if(!selectedAvailability){
    //         console.error("No availability selected for editing");
    //         return;
    //     }

    //     selectedAvailability.datetimes = availabilitySelectionData.datetimes;

    //     const { data, error } = await supabase
    //         .from('Availabilities')
    //         .upsert([selectedAvailability]);

    //     if(error){
    //         console.error("Error saving changes:", error.message);

    //     }else{
    //         console.log("Changes saved successfully");
    //         editMode = false;
    //         selectedAvailability = null;
    //         clearFields();

    //         refetchAvailabilities();
    //     }
    // }
</script>

<style>

</style>

<div class="h-screen">
    <Navbar />
    <div class="flex flex-col items-center justify-center gap-y-8 w-full max-w-screen-2xl mx-auto py-32">
    {#if meeting.password && !passwordAuthenticated}
        <div class="flex flex-col p-12 h-fit bg-white rounded-2xl shadow-lg justify-center w-3/4">
            <div class="flex flex-col">
                <div class="text-2xl font-medium pb-4">
                    This meeting requires a password.
                </div>
                <form on:submit|preventDefault={checkPassword}>
                    <Input type="password" required placeholder="Password" bind:value={meetingPass} />
                    {#if passwordIncorrect}
                        <p class="text-red-600">
                            The password you entered is incorrect.
                        </p>
                    {/if}
                    <Button type="submit" class="mt-4">Submit</Button>
                </form>
            </div>
        </div>
    {:else}
        <div class="flex flex-row items-center w-5/6 justify-between">
            <div class="flex flex-col space-y-2 mr-12 w-96">
                <h1 class="text-4xl font-bold">{meetingName}</h1>
                <h2 class="text-2xl">Availabilities</h2>
            </div>
            <div class="flex flex-col">
                {#if addMode}
                    <Button on:click={saveAvailability}>Save</Button>
                {:else if !userInfo}
                    <AvailabilityDialog on:addAsUser={handleUserMode} on:addAsGuest={handleGuestMode}/>
                {:else}
                    <Button on:click={handleUserMode}><Pencil class="mr-2 w-4 h-4"></Pencil> Add/Edit as {userInfo.display_name}</Button>
                {/if}
            </div>
        </div>
        <div class="flex flex-row gap-x-4 w-5/6 justify-between">
            <div class="flex flex-col basis-full min-w-0 grow">
                {#if numResponses > 1}
                    <AvailabilityLegend cellColors={cellColors} numResponses={numResponses} />
                {/if}
                <div class="flex-row max-h-full overflow-auto">
                    {#key availabilities}
                        <AvailabilityPicker bind:selectedSlots={availabilitySelectionData.datetimes} selectedDates={selectedDates} startHour={startHour} endHour={endHour} cellColors={cellColors} bind:addMode={addMode} bind:hoveredCell={hoveredCell}/>
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
                <!-- <Button on:click={toggleEditMode}>Edit Availability</Button>
                <Button on:click={saveChanges}>Save changes</Button> -->
            </div>
        </div>
        {/if}
    </div>
</div>