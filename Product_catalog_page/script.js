// Product Catalog Page - Simple Add-To-Cart + Supabase Connection
import { supabase } from "../js/supabase-init.js";

// PRODUCT ID FOR “KOTA CANTIK” (admin can update table later)
const STATIC_PRODUCT_NAME = "Kota Cantik";

// When page loads
document.addEventListener("DOMContentLoaded", async () => {

  // Get product ID for Kota Cantik from Supabase
  let kotaProductId = null;
  try {
    const { data } = await supabase
      .from("products")
      .select("id, title_en")
      .ilike("title_en", STATIC_PRODUCT_NAME)
      .maybeSingle();

    if (data) kotaProductId = data.id;  
    else kotaProductId = "kota_static"; // fallback for guest/local
  } catch (err) {
    console.error("Failed to load product:", err);
    kotaProductId = "kota_static";
  }

  // Button that the user clicks
  const addBtn = document.getElementById("addBtn");
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      await addToCart(kotaProductId, 1);
      alert("Added to cart!");
      window.location.href = "../Product cart page/product cart.html";
    });
  }

  // Cart Icon click
  const cartIcon = document.getElementById("cartIcon");
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      window.location.href = "../Product cart page/product cart.html";
    });
  }
});


// ----------------------
// Simple Add-To-Cart function
// ----------------------
async function addToCart(productId, qty = 1) {

  // Check if logged in
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (user) {
    // Logged-in → store in Supabase table
    await supabase.from("cart_items").insert([
      { user_id: user.id, product_id: productId, quantity: qty }
    ]);
  } else {
    // Guest → store in localStorage
    const cart = JSON.parse(localStorage.getItem("myitra_cart") || "{}");
    cart[productId] = (cart[productId] || 0) + qty;
    localStorage.setItem("myitra_cart", JSON.stringify(cart));
  }
}






