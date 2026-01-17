// Supabase Configuration for TeamConnect
// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://rfainvcebtqayaimgbll.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmYWludmNlYnRxYXlhaW1nYmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1Njg3MDMsImV4cCI6MjA4NDE0NDcwM30.vBVX_-yz6ROj9Xj6dKI5DVzXpEQfNlBwVwBY3h5AcVg';

// Initialize Supabase client
let supabase;

function initializeSupabase() {
    if (supabase) return true; // Already initialized

    if (typeof window.supabase === 'undefined') {
        console.error("❌ Supabase SDK not loaded yet.");
        return false;
    }

    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("✅ Supabase initialized successfully");
        return true;
    } catch (error) {
        console.error("❌ Supabase initialization error:", error);
        return false;
    }
}

// Helper function to check if user is logged in
async function checkAuth() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session?.user || null;
    } catch (error) {
        console.error("Auth check error:", error);
        return null;
    }
}

// Helper function to get current user
async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    } catch (error) {
        console.error("Get user error:", error);
        return null;
    }
}

// Helper function to sign out
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        console.log("✅ User signed out");
        return true;
    } catch (error) {
        console.error("❌ Sign out error:", error);
        return false;
    }
}

// Helper function to upload file to storage
async function uploadFile(bucket, path, file, onProgress) {
    try {
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return publicUrl;
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}

// Helper function to get user profile
async function getUserProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Get profile error:", error);
        return null;
    }
}

// Helper function to update user profile
async function updateUserProfile(userId, updates) {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Update profile error:", error);
        throw error;
    }
}
