// js/admin.js
import { supabase } from './supabase-init.js';

export async function uploadImageAndCreateProduct(file, productData){
  // upload file to storage
  const path = `products/${file.name}`;
  const { data: upData, error: upErr } = await supabase.storage.from('product-images').upload(path, file, { upsert: true });
  if (upErr) throw upErr;
  const { data: publicData } = supabase.storage.from('product-images').getPublicUrl(path);

  // create product row (admin only allowed by RLS)
  const { error } = await supabase.from('products').insert([{
    category_id: productData.category_id,
    title_en: productData.title_en,
    title_ms: productData.title_ms,
    short_description_en: productData.short_description_en,
    description_en: productData.description_en,
    price: productData.price,
    sku: productData.sku,
    stock: productData.stock || 0,
    image_url: publicData.publicUrl,
    status: 'active'
  }]);
  if (error) throw error;
  return true;
}
