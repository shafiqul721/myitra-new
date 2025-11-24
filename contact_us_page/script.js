// 💡 CONNECT TO SUPABASE
import { supabase } from "../js/supabase-init.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const cartIcon = document.getElementById("cartIcon");

  // --------------------------
  // 1️⃣ NAVIGATION LINKS
  // --------------------------
  const links = {
    "home-link": "../Home page/index.html",
    "about-link": "../About us page/index.html",
    "stories-link": "../Stories page/index.html",
    "contact-link": "../Contact us page/contact us.html",

    "fhome-link": "../Home page/index.html",
    "fabout-link": "../About us page/index.html",
    "fstories-link": "../Stories page/index.html",
    "fcontact-link": "../Contact us page/contact us.html"
  };

  Object.entries(links).forEach(([id, page]) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        window.location.href = page;
      });
    }
  });

  // --------------------------
  // 2️⃣ CONTACT FORM SUBMIT
  // --------------------------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (!name || !email || !phone || !comment) {
      alert("❗ Please fill in all required fields.");
      return;
    }

    // Insert into Supabase table: contact_messages
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          phone,
          message: comment,
        }
      ]);

    if (error) {
      console.error("Supabase Error:", error.message);
      alert("❌ Failed to send message. Please try again later.");
      return;
    }

    alert("✅ Message sent successfully! We'll get back to you soon.");
    form.reset();
  });

  // --------------------------
  // 3️⃣ CART ICON BEHAVIOR
  // --------------------------
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      const qty = localStorage.getItem("selectedQty");
      window.location.href = "../Product cart page/product cart.html";

      if (qty && parseInt(qty) > 0) {
        alert(`🛒 You have ${qty} Kota Cantik in your cart.`);
      } else {
        alert("🛒 Your cart is empty.");
      }
    });
  }

});
