<script>
    export let selectedHour = 7;
    export let selectedPeriod = 'AM';

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const periods = ['AM', 'PM'];

    function handleHourChange(event) {
        selectedHour = event.target.value;
    }

    function handlePeriodChange(event) {
        selectedPeriod = event.target.value;
    }
</script>

<div>
    <select bind:value={selectedHour} on:change={() => handleHourChange}>
        {#each hours as hour}
            <option value={hour}>{hour}</option>
        {/each}
    </select>

    <select bind:value={selectedPeriod} on:change={() => handlePeriodChange}>
        {#each periods as period}
            <option value={period}>{period}</option>
        {/each}
    </select>
</div>