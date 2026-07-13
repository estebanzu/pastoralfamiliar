require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase;

if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
} else {
    console.warn("⚠️ Warning: SUPABASE_URL or SUPABASE_KEY environment variables are missing. Database integrations will be mocked.");
    supabase = {
        from: () => ({
            insert: async () => ({ data: null, error: null }),
            select: () => ({
                limit: () => ({ data: [], error: null })
            })
        })
    };
}

module.exports = supabase;
