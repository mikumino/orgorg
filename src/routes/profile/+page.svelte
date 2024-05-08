<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '../../supabaseClient';
    import { goto } from '$app/navigation';
    import Navbar from "$lib/components/ui/navbar/navbar.svelte"
	
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
  
 
  <div class="h-screen">
    <Navbar />
    <div class="flex items-center bg-slate-200 justify-center h-full">
      <div class="flex flex-col p-12 h-fit bg-white rounded-2xl shadow-lg justify-center w-3/4">
        <div class="flex flex-col">
          {#if isLoading}
          <p>
            Loading user data...
          </p>
          {:else}
              <h1 class="text-5xl font-bold pb-2">{displayName}</h1>  
              <h2 class="text-2xl font-medium pb-2">
                @{username} · <a href="mailto:{email}">{email}</a>
              </h2>
              <p title="User ID">{id}</p>
              <h2 class="text-2xl font-medium pt-4">
                {displayName}'s Created Meetings
              </h2>
              {#if meetings.length > 0}
                <ul>
                  {#each meetings as meeting}
                    <li>
                      <a href="/meeting/{meeting.id}">{meeting.EventName}</a>
                    </li>
                  {/each}
                </ul>
              {:else}
                <p>No meetings found.</p>
              {/if}
          {/if}
        </div>      
      </div>
    </div>
  </div>  