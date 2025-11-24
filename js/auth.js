// js/auth.js
import { supabase } from "./supabase-init.js";

const signupBtn = document.getElementById("signup-btn");

signupBtn.addEventListener("click", async () => {
    console.log("Signup button clicked");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    console.log({ name, email, password });

    if (!name || !email || !password) {
        alert("Please fill all fields!");
        return;
    }

    try {
        // Create the user in Supabase with metadata (full_name)
        const { data, error } = await supabase.auth.signUp(
            { email, password },
            { data: { full_name: name } }
        );

        if (error) {
            alert("Error: " + error.message);
            console.error(error);
            return;
        }

        // Success message
        alert("Account created successfully! Check your email to confirm.");

        // Redirect to login page
        window.location.href = "../login_page/index.html";

    } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
    }
});
