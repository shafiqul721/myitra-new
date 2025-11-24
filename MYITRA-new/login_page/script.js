// login_page/login.js
import { supabase } from "../js/supabase-init.js";

// 1️⃣ CHECK EMAIL CONFIRMATION TOKEN (KEEPING YOUR EXISTING FEATURE)
const hashToken = window.location.hash.replace("#token=", "");

if (hashToken) {
    console.log("Email confirmation token:", hashToken);

    supabase.auth.verifyOtp({
        token_hash: hashToken,
        type: "signup"
    })
    .then(({ data, error }) => {
        if (error) {
            console.error("Confirmation error:", error.message);
            alert("Invalid or expired confirmation link.");
        } else {
            console.log("Email confirmed:", data);
            alert("Your email is confirmed! You can now log in.");
        }
    });
}

// 2️⃣ NORMAL LOGIN FORM — WITH NAME FIELD INCLUDED (FORMALITY)
document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim(); // <-- KEEPING NAME
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // CHECK ALL FIELDS (FORMALITY)
    if (!name || !email || !password) {
        alert("Please fill all fields including your name!");
        return;
    }

    // LOGIN USING SUPABASE
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Login failed: " + error.message);
        console.error(error);
        return;
    }

    alert("Logged in successfully!");

    // REDIRECT TO HOME PAGE
    window.location.href = "../home_page/home_page.html";
}); 
