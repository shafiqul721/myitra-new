// js/cart.js
import { supabase } from './supabase-init.js';

export function getLocalCart(){ return JSON.parse(localStorage.getItem('myitra_cart') || '[]'); }
export function saveLocalCart(cart){ localStorage.setItem('myitra_cart', JSON.stringify(cart)); }

export async function addToCart(productId, qty=1){
  const { data: user } = await supabase.auth.getUser();
  if (user){ // logged in: store in DB
    const userId = user.id;
    // check existing cart item
    const { data: exists } = await supabase.from('cart_items').select('*').eq('user_id', userId).eq('product_id', productId).single();
    if (exists){
      await supabase.from('cart_items').update({ quantity: exists.quantity + qty }).eq('id', exists.id);
    } else {
      await supabase.from('cart_items').insert([{ user_id: userId, product_id: productId, quantity: qty }]);
    }
    alert('Added to cart (account)');
  } else { // guest: localStorage
    const cart = getLocalCart();
    const idx = cart.findIndex(i=>i.productId===productId);
    if (idx>-1) cart[idx].qty += qty; else cart.push({ productId, qty });
    saveLocalCart(cart);
    alert('Added to cart (guest)');
  }
}
