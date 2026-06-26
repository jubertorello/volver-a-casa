import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/services/cloudinary.service';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    // Verificar autenticación (opcional pero recomendado)
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
