"use server";

import { supabase, BUCKET_NAME } from "@/server/supabase";
import { getSession } from "@/server/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
];

export async function uploadDishImage(formData: FormData) {
    try {
        // Check authentication
        const session = await getSession();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" }
        }

        const file = formData.get('file') as File
        if (!file) {
            return { success: false, error: "No file provided" }
        }

        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return {
                success: false,
                error: "Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed."
            }
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return {
                success: false,
                error: "File size exceeds 5MB limit."
            }
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${session.user.id}-${Date.now()}.${fileExt}`
        const filePath = `dishes/${fileName}`

        // Convert File to ArrayBuffer then to Buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Upload to Supabase
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false,
            })

        if (error) {
            console.error('Supabase upload error:', error)
            return {
                success: false,
                error: `Upload failed: ${error.message}`
            }
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath)

        return {
            success: true,
            url: publicUrl
        }
    } catch (error) {
        console.error('Upload error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Upload failed"
        }
    }
}