document.addEventListener("DOMContentLoaded", () => {
  const quantityInput = document.getElementById("quantity");
  const finalQty = document.getElementById("finalQty");
  const totalPrice = document.getElementById("totalPrice");
  const deleteBtn = document.getElementById("deleteBtn");
  const proceedBtn = document.getElementById("proceedToCheckoutBtn");
  const promoInput = document.querySelector("input[placeholder='Enter Promo Code']");
  const promoMessage = document.getElementById("promoMessage");

  const unitPrice = 15.00; // Price of Kota Cantik
  let discount = 0; // Promo code discount
  let promoApplied = false;

  // Load quantity from localStorage
  const savedQty = localStorage.getItem("selectedQty");
  if (savedQty && parseInt(savedQty) > 0) {
    quantityInput.value = savedQty;
  } else {
    quantityInput.value = 1;
  }

  function updateTotal() {
    const qty = parseInt(quantityInput.value) || 1;
    finalQty.textContent = qty;
    const total = unitPrice * qty + discount;
    totalPrice.textContent = total.toFixed(2);
  }

  updateTotal();

  // Update quantity + price when user changes quantity
  quantityInput.addEventListener("input", () => {
    let qty = parseInt(quantityInput.value);
    if (isNaN(qty) || qty < 1) {
      qty = 1;
      quantityInput.value = 1;
    }

    // Save to localStorage
    localStorage.setItem("selectedQty", qty);
    updateTotal();
  });

  // Apply Promo Code
  promoInput.addEventListener("input", () => {
    const code = promoInput.value.trim().toUpperCase();

    if (code === "MYITRA") {
      discount = -10;
      if (!promoApplied) {
        promoApplied = true;
        promoMessage.textContent = "Promo code applied successfully!";
      }
    } else {
      discount = 0;
      promoApplied = false;
      promoMessage.textContent = "";
    }
    updateTotal();
  });

  // Delete item from cart
  deleteBtn.addEventListener("click", () => {
    alert("Item removed from cart.");
    quantityInput.value = 1;
    finalQty.textContent = "1";
    totalPrice.textContent = unitPrice.toFixed(2);
    promoInput.value = "";
    promoMessage.textContent = "";
    discount = 0;
    promoApplied = false;
    localStorage.removeItem("selectedQty");
  });

  // Proceed to checkout
  proceedBtn.addEventListener("click", () => {
    const qty = parseInt(quantityInput.value) || 1;

    localStorage.setItem("selectedQty", qty);
    localStorage.setItem("discountApplied", discount);

    window.location.href = "../product_checkout_page/product_checkout.html";
  });
});
