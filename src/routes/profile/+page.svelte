<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '../../supabaseClient';
    import { goto } from '$app/navigation';
	
    interface Meeting {
      id: string;
      EventName: string;
      MinTime: string;
      MaxTime: string;
      dates: Date[];
      password: string;
      creator_id: string;
    }
    let isLoading: boolean = true;
    let id = '';
    let email = '';
    let username = '';
    let displayName = '';
    let meetings: Meeting[] = [];
    onMount(async () => {
        const user = await supabase.auth.getUser();
        if (!user.data.user){
          goto('/login');
          return;
        }

        const userData = user.data.user;
        const { data: userDataResponse, error: userError } = await supabase
          .from('users')
          .select('id, email, username, display_name')
          .eq('id', userData?.id)
          .single();

        if (userError) {
            console.error(userError);
          } else {
            id = userDataResponse.id;
            email = userDataResponse.email;
            username = userDataResponse.username;
            displayName = userDataResponse.display_name;
        }

        const {data: meetingDataResponse, error: meetingError} = await supabase
          .from('Meetings')
          .select('*')
          .eq('creator_id', user.data.user?.id);


        meetings = meetingDataResponse ?? [];
        isLoading = false;
    });
  </script>
  
 
  <div>
    <h1>Profile</h1>
    {#if isLoading}
        <p>Loading user data...</p>
    {:else}
        <p>User ID: {id}</p>
        <p>Email: {email}</p>
        <p>Username: {username}</p>
        <p>Display name: {displayName}</p>
        <h2>meetings created by user</h2>
        {#if meetings.length > 0}
          <ul>
            {#each meetings as meeting}
              <li>{meeting.EventName}</li>
            {/each}
          </ul>
        {:else}
          <p>No meetings found.</p>
        {/if}
    {/if}
  </div>
  