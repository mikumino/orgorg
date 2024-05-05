<script lang="ts">
// @ts-nocheck

    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
    import DatePicker from "$lib/components/ui/datepicker/datepicker.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
    import { supabase } from "$lib/supabaseClient";
   
    let EventName = ''
    let MinTime = ''
    let MaxTime = ''
    let selectedDate = ''

   
    async function createMeeting(EventName, MinTime, MaxTime, selectedDate){
        const { data, error } = await supabase
            .from('Meetings')
            .insert([
                {EventName, MinTime, MaxTime, selectedDate}
            ]);
            

        if(error){
            console.error('error creating meetings: ', error.message);
            return null;
        }else{
            console.log('Meeting created:', data);
            return data;
            
        }    
    }  
async function handleSubmit() {
    console.log("Form submitted");
  // Get form data
  const { EventName, MinTime, MaxTime, selectedDate } = formData;

  // Insert meeting into database
  const insertedMeeting = await createMeeting(EventName, MinTime, MaxTime, selectedDate);
  if (insertedMeeting) {
    console.log('Meeting created successfully:', insertedMeeting);
    // Optionally, navigate to a different page or show a success message
  } else {
    // Handle error
    console.error('Failed to create meeting.');
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
            <form class="form-widget" on:submit|preventDefault="{handleSubmit}">
                <div class="flex flex-col space-y-4 mb-4 w-96">
                    <Label for="meetingName">Meeting name</Label>
                    <Input type="text" id="meetingName" bind:value="{EventName}" />
                </div>
                <div class="flex flex-col space-y-4 mb-4">
                    <Label for="timeRange">Time range</Label>
                    <div class="flex flex-row space-x-4">
                        <Input id="startTime" class='w-fit' type="time" bind:value="{MinTime}" />
                        <p class="text-slate-500">to</p>
                        <Input id="endTime" class='w-fit' type="time" bind:value="{MaxTime}"/>
                    </div>
                </div>
                <Button type="submit" >Create meeting</Button>
            </form>
        </div>
        <div>
            <DatePicker bind:selectedDate="{selectedDate}" />
        </div>
    </div>
</div>