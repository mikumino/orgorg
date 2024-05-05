import { supabase } from "../../../supabaseServerClient";

export async function load({ params }) {
    const { meetingId } = params;
    console.log(meetingId);

    const { data, error } = await supabase
        .from('Meetings')
        .select('*')
        .eq('id', meetingId)
        .single();

    if (error) {
        return {
            status: 500,
            body: error
        };
    }

    return {
        status: 200,
        body: {
            meeting: data
        }
    };
}