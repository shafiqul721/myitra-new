// js/products.js
import { supabase } from './supabase-init.js';

export async function loadProducts(containerId = 'product-list'){
  const { data: products, error } = await supabase
    .from('products')
    .select('id,title_en,price,image_url,short_description_en,stock,status')
    .eq('status','active')
    .order('id',{ascending:false});
  if (error) { console.error(error); return; }
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image_url}" alt="${p.title_en}" />
      <h3>${p.title_en}</h3>
      <p>RM ${p.price}</p>
      <p>${p.short_description_en || ''}</p>
      <button onclick="viewProduct(${p.id})">View</button>
      <button onclick="addToCart(${p.id},1)">Add to cart</button>
    `;
    container.appendChild(card);
  });
}

export async function getProduct(id){
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}
