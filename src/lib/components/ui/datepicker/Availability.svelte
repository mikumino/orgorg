<script>
    /**
     * @type {Date[]}
     */
    
    export let selectedDates = [];

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
    
    /**
     * @type {number}
     */
    let dayOfWeek = 0;
    let timeSlot = 0;
    /**
     * 
     * @param {number} dayOfWeek
     * @param {string} timeSlot
     * @returns {boolean}
     */
    function isDateSelected(dayOfWeek, timeSlot){
        const selectedDate = selectedDates.find(date => date.getDay() === dayOfWeek && date.getHours() === parseInt(timeSlot.split(':')[0], 10) );
        return !!selectedDate;
    }
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

<div class="grid-container">
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




