<script>
    export let cellColors;
    export let numResponses;

    let cappedNumResponses = Math.min(numResponses, 10);
    console.log(cellColors);

</script>

<div class="flex flex-row justify-between pb-4">
    <div class="flow-col h-4 w-8 content-center text-center text-gray-400">
        1
    </div>
    {#each {length: cappedNumResponses} as _, i}
        {@const bg = cellColors[i+1]}
        <div class="flex-col h-4 grow stretch content-center" style="background-color: {bg}">
            
        </div>
    {/each}
    <div class="flex-col h-4 w-8 content-center text-center text-gray-400">
        {numResponses > cappedNumResponses ? '10+' : numResponses}
    </div>
</div>