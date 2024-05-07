<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '../../supabaseClient';
  
    let isLoading: boolean = true;
    let id = '';
    let email = '';
  
    onMount(async () => {
        const user = await supabase.auth.getUser();
        const userData = user.data.user;
        const { data, error } = await supabase
          .from('users')
          .select('id, email')
          .eq('id', userData?.id)
          .single();

        if (error) {
            console.error(error);
            } else {
            id = data.id;
            email = data.email;
        }
        isLoading = false;
    });
  </script>
  
  <div>
    <h1>Profile</h1>
    {#if isLoading}
      <p>Loading user data...</p>
    {:else}
      {#if id}
        <p>User ID: {id}</p>
      {:else}
        <p>User ID not found</p>
      {/if}
      {#if email}
        <p>Email: {email}</p>
      {:else}
        <p>Email not found</p>
      {/if}
    {/if}
  </div>
  