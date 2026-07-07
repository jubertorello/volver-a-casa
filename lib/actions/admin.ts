'use server';

import { revalidatePath } from 'next/cache';
import { upsertPageBlock, updatePage } from '../services/pages.service';
import { upsertSettings } from '../services/settings.service';
import { upsertNews, archiveNews } from '../services/news.service';
import { upsertVideo, archiveVideo } from '../services/videos.service';
import { updateLegalPage } from '../services/legal.service';
import { deleteMediaAsset } from '../services/cloudinary.service';
import { createClient } from '../supabase/server';

async function verifyAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('No autorizado: debes iniciar sesión');
  }
}

export async function updatePageAction(pageId: string, updates: any) {
  try {
    await verifyAuth();
    const res = await updatePage(pageId, updates);
    revalidatePath('/');
    revalidatePath(`/admin/pages`);
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function savePageBlockAction(pageId: string, type: string, contentJson: any, orderIndex: number = 0) {
  try {
    await verifyAuth();
    const res = await upsertPageBlock(pageId, type, contentJson, orderIndex);
    revalidatePath('/');
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateSettingsAction(key: string, dataObj: any) {
  try {
    await verifyAuth();
    const res = await upsertSettings(key, dataObj);
    revalidatePath('/');
    revalidatePath(`/admin/settings`);
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveNewsAction(newsData: any) {
  try {
    await verifyAuth();
    const res = await upsertNews(newsData);
    revalidatePath('/noticias');
    revalidatePath('/admin/news');
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function archiveNewsAction(id: string) {
  try {
    await verifyAuth();
    await archiveNews(id);
    revalidatePath('/noticias');
    revalidatePath('/admin/news');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveVideoAction(videoData: any) {
  try {
    await verifyAuth();
    const res = await upsertVideo(videoData);
    revalidatePath('/');
    revalidatePath('/admin/videos');
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function archiveVideoAction(id: string) {
  try {
    await verifyAuth();
    await archiveVideo(id);
    revalidatePath('/');
    revalidatePath('/admin/videos');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateLegalPageAction(id: string, updates: any) {
  try {
    await verifyAuth();
    const res = await updateLegalPage(id, updates);
    revalidatePath('/');
    revalidatePath('/aviso-legal');
    revalidatePath('/politica-privacidad');
    revalidatePath('/cookies');
    revalidatePath('/admin/legal');
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMediaAction(id: string, cloudinary_public_id: string) {
  try {
    await verifyAuth();
    const res = await deleteMediaAsset(id, cloudinary_public_id);
    revalidatePath('/admin/media');
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
