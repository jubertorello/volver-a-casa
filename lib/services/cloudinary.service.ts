import { v2 as cloudinary } from 'cloudinary';
import { createClient } from '../supabase/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(fileBuffer: Buffer, filename: string, altText?: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'volver-a-casa',
        use_filename: true,
        unique_filename: true,
        format: 'webp',
        transformation: [
          { width: 1920, crop: 'limit' },
          { quality: 'auto' }
        ]
      },
      async (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('No result from Cloudinary'));

        // Save to Supabase media_assets
        const supabase = await createClient();
        const { data, error: dbError } = await supabase
          .from('media_assets')
          .insert({
            cloudinary_public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            alt_text: altText || filename,
            title: filename,
          })
          .select()
          .single();

        if (dbError) {
          console.error('Error saving media to DB:', dbError);
          // Opcionalmente podriamos borrar de Cloudinary si falla DB
        }

        resolve(data || { secure_url: result.secure_url });
      }
    ).end(fileBuffer);
  });
}

export async function getMediaAssets() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteMediaAsset(id: string, cloudinary_public_id: string) {
  // 1. Delete from Cloudinary
  if (cloudinary_public_id) {
    try {
      await cloudinary.uploader.destroy(cloudinary_public_id);
    } catch (err) {
      console.error("Error deleting from Cloudinary:", err);
      // We continue to delete from DB even if Cloudinary fails (e.g. already deleted)
    }
  }

  // 2. Delete from Supabase
  const supabase = await createClient();
  const { error } = await supabase
    .from('media_assets')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error deleting media from database: ${error.message}`);
  }

  return { success: true };
}
