// checkout-supabase.js
import { supabase } from "../js/supabase-init.js";

document.addEventListener("DOMContentLoaded", async () => {

  // ===== ELEMENTS =====
  const qtyEl = document.getElementById("checkoutQty");
  const totalEl = document.getElementById("checkoutTotal");
  const itemCountEl = document.getElementById("itemCount");
  const shippingFeeEl = document.getElementById("shippingFee");
  const subtotalEl = document.getElementById("subtotal");
  const shippingRadios = document.getElementsByName("shippingOption");
  const purchaseBtn = document.getElementById("purchaseBtn");
  const cartIcon = document.getElementById("cartIcon");

  const PRODUCT_ID = 1;
  const PRICE = 15;

  // ===== LOAD CART QTY (LOCAL OR SUPABASE) =====
  let qty = parseInt(localStorage.getItem("selectedQty")) || 1;

  // If user logged in, load DB cart instead of local
  const { data: session } = await supabase.auth.getUser();
  const user = session?.user;

  if (user) {
    const { data: dbCart } = await supabase
      .from("cart_items")
      .select("quantity")
      .eq("user_id", user.id)
      .eq("product_id", PRODUCT_ID)
      .single();

    if (dbCart) qty = dbCart.quantity;
  }

  // ===== UPDATE TOTALS =====
  const updateTotals = () => {
    const shippingSelected = [...shippingRadios].find(r => r.checked).nextSibling.textContent.includes("Ship");
    const shippingFee = shippingSelected ? 5 : 0;

    qtyEl.textContent = qty;
    itemCountEl.textContent = qty;
    totalEl.textContent = (qty * PRICE).toFixed(2);
    shippingFeeEl.textContent = `RM${shippingFee.toFixed(2)}`;
    subtotalEl.textContent = (qty * PRICE + shippingFee).toFixed(2);
  };

  shippingRadios.forEach(r => r.addEventListener("change", updateTotals));
  updateTotals();


  // ===== PURCHASE BUTTON → CREATE ORDER =====
  purchaseBtn.addEventListener("click", async () => {

    if (!user) {
      alert("Please login first.");
      return;
    }

    // BUILD ORDER DATA
    const orderData = {
      user_id: user.id,
      total_amount: parseFloat(subtotalEl.textContent),
      status: "pending",
      payment_method: "card",
      shipping_name: document.getElementById("fname").value + " " + document.getElementById("lname").value,
      shipping_address: document.getElementById("address").value,
      shipping_phone: "N/A"
    };

    // 1️⃣ Create order
    const { data: newOrder, error: orderErr } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (orderErr) {
      alert("Order failed.");
      console.error(orderErr);
      return;
    }

    // 2️⃣ Insert order_items
    await supabase.from("order_items").insert([
      { order_id: newOrder.id, product_id: PRODUCT_ID, quantity: qty, unit_price: PRICE }
    ]);

    // 3️⃣ Clear DB cart
    await supabase.from("cart_items").delete().eq("user_id", user.id);

    // 4️⃣ Clear local cart
    localStorage.removeItem("selectedQty");

    alert("🎉 Purchase successful!");
    window.location.href = "../product_catalog_page/product catalog.html";
  });


  // ===== CART ICON =====
  cartIcon.addEventListener("click", () => {
    if (qty > 0) alert(`🛒 You have ${qty} item(s) in your cart.`);
    else alert("🛒 Your cart is empty.");

    window.location.href = "../product_catalog_page/product catalog.html";
  });

});
