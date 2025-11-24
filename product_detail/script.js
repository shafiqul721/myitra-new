// Product Detail Page - Fully Working with Supabase
import { supabase } from "../js/supabase-init.js";

// This product page is for YOUR Kota Cantik product
const PRODUCT_ID = 1;

document.addEventListener("DOMContentLoaded", async () => {
  
  // 1️⃣ Load product details from Supabase (admin editable)
  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", PRODUCT_ID)
      .single();

    if (!error && product) {
      // Update UI
      document.querySelector("h1.fw-bold").textContent = `Price: RM ${product.price}`;
      document.querySelector(".kota-img-large").src = product.image_url;
    }

  } catch (err) {
    console.error("Error loading product:", err);
  }

  
  // 2️⃣ ADD button → add to cart
  const addBtn = document.getElementById("addBtn");
  
  addBtn.addEventListener("click", async () => {

    const { data: session } = await supabase.auth.getUser();
    const user = session?.user;

    if (!user) {
      // Guest user → local storage
      localStorage.setItem("selectedProductId", PRODUCT_ID);
      localStorage.setItem("selectedQty", 1);
      alert("Product added to cart!");
      window.location.href = "../product_cart_page/product_cart.html";
      return;
    }

    // Logged in → Supabase DB cart
    const { data: existing } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", PRODUCT_ID)
      .single();

    if (existing) {
      await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + 1 })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("cart_items")
        .insert([{ user_id: user.id, product_id: PRODUCT_ID, quantity: 1 }]);
    }

    alert("Added to cart!");
    window.location.href = "../product_cart_page/product_cart.html";
  });

  // 3️⃣ Cart icon → cart page
  const cartIcon = document.getElementById("cartIcon");

  cartIcon.addEventListener("click", () => {
    const qty = localStorage.getItem("selectedQty");

    if (qty && parseInt(qty) > 0) {
      alert(`🛒 You have ${qty} item(s) in your cart.`);
    } else {
      alert("🛒 Your cart is empty.");
    }

    window.location.href = "../product_cart_page/product_cart.html";
  });

});
