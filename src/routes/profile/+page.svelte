

<script lang="ts">
    import { user } from '$lib/userStore.js'
    import { onMount } from 'svelte';
    import type { AuthSession, User } from '@supabase/supabase-js';
    import { supabase } from '$lib/supabaseClient';
  

    let email: string | null = null
    let avatarUrl: string | null = null
  
    onMount(() => {
      
      const unsubscribe = user.subscribe(async (currentUser: User | null) => {
        if(currentUser){
            const userId = currentUser?.id;
            if(userId){
                const { data, error } = await supabase
                .from('users')
                .select('email, avatar_url')
                .eq('id', userId)
                .single();

            if(error){
                console.error('Error: ', error.message);
            }else{
                email = data?.email || null;
                avatarUrl = data?.avatar_url || null
            }
        }
            
      }
    });
    return () => {
        unsubscribe();
    }
      
});
  
</script>
  
<div>
    <h1>Profile</h1>
    {#if email}
        <p>Email: {email}</p>
    {:else}
        <p>Email not found</p>
    {/if}

    {#if avatarUrl}
        <img src={avatarUrl} alt="User avatar" />
    {:else}
        <p>No avatar found</p>
    {/if}
</div>