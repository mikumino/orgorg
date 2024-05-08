import { supabase } from "../../../supabaseClient";

export async function load({ params }) {
    const { meetingId } = params;
    console.log(meetingId);

    const { data, error } = await supabase
        .from('Meetings')
        .select('*')
        .eq('id', meetingId)
        .single();

    const { data: availabilities, error: availabilitiesError  } = await supabase
        .from('Availabilities')
        .select('*')
        .eq('meeting_id', meetingId);

    if (error) {
        return {
            status: 500,
            body: error
        };
    }

    if (availabilitiesError) {
        return {
            status: 500,
            body: availabilitiesError
        };
    }

    return {
        status: 200,
        body: {
            meeting: data,
            availabilities: availabilities
        }
    };
}