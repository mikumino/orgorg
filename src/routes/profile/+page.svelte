<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '../../supabaseClient';
  
    let isLoading: boolean = true;
    let id = '';
    let email = '';
    let username = '';
    let displayName = '';
  
    onMount(async () => {
        const user = await supabase.auth.getUser();
        const userData = user.data.user;
        const { data, error } = await supabase
          .from('users')
          .select('id, email, username, display_name')
          .eq('id', userData?.id)
          .single();

        if (error) {
            console.error(error);
            } else {
            id = data.id;
            email = data.email;
            username = data.username;
            displayName = data.display_name;
        }
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
    {/if}
  </div>
  