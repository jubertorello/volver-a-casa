import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/services/cloudinary.service';
import { createClient } from '@/lib/supabase/server';

const MAX_SIZE_MB = 3;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const altText = formData.get('alt_text') as string | undefined;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validar tipo de archivo
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: `Formato no permitido. Solo se aceptan: JPG, PNG, WebP, GIF y SVG.` 
      }, { status: 400 });
    }

    // Validar tamaño (máx. 3 MB)
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1);
      return NextResponse.json({ 
        error: `La imagen pesa ${sizeMB} MB. El tamaño máximo permitido es ${MAX_SIZE_MB} MB.` 
      }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result: any = await uploadImage(buffer, file.name.split('.')[0], altText);

    return NextResponse.json({
      url: result.secure_url,
      ...result
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
