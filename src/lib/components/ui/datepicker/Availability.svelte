<script>
    /**
     * @type {number}
     */
    export let startHour;
    export let endHour;
    
    /**
     * @type {Date[]}
    */
    export let selectedDates = [];

    //const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    //const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
    

    const numPeriods = (endHour-startHour) * 2; // number of 30-minute periods in the given timeframe
    let timeSlots = Array.from({length : numPeriods}, (_, index) => {
        const hour = Math.floor(index/2) + startHour;
        const minute = index % 2 === 0 ? '00' : '30';
        return hour.toString().padStart(2, '0') + ":" + minute;
    })
    
    
    /*const periods = Array.from({ length: numPeriods }, (i) => {
        const hour = Math.floor(i/2);
        const minute = i % 2 === 0 ? '00' : '30';
        return hour.toString().padStart(2, '0') + ':' + minute;
    }); */ 
    console.log(timeSlots.length);
</script>

<style>
    .grid-container{
        display: grid;
        grid-template-columns: auto repeat(5, 1fr);
        gap: 8px
    }

    .time-slot{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 40px;
        border: 1px solid #ccc;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.3s ease;
    }

    .time-slot.selected{
        background-color: lightblue;
    }
</style>

<div class="flex flex-row h-96 w-full justify-center">
    <div class="flex flex-col gap-y-2">
        <div class="flex flex-row px-4 border-b-2">
            &nbsp;
        </div>
        {#each timeSlots as period, index}
            <div class="flex flex-row px-4 {index %2 != 0 ? 'border-b-2' : ''}">
                {period}
            </div>
        {/each}
    </div>    
    {#each selectedDates as date}
        <div class="flex flex-col gap-y-2">
            <div class="flex flex-row px-4 border-b-2">
                {date.getMonth() + 1}/{date.getDate()}
            </div>
            {#each timeSlots as period, index}
                <div class="flex flex-row px-4 justify-center {index % 2 != 0 ? 'border-b-2' : ''}">
                    -
                </div>
            {/each}
        </div>
    {/each}
</div>

<!-- <div class="grid-container">
        {#each daysOfWeek as day}
            <div class="time-slot">{day}</div>
        {/each}
    
        {#each daysOfWeek as _, dayIndex}
            {#each timeSlots as time}
                <div
                    class="time-slot {isDateSelected(dayIndex, time) ? 'selected' : ''}"
                >
                    {time}
                </div>
            {/each}
        {/each}
    </div>
-->




