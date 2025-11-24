document.getElementById('signup-form').addEventListener('submit', async function (e) { 
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // 1. Create the user in Supabase
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert("Supabase Error: " + error.message);
    console.error(error);
    return;
  }

  // 2. Send confirmation email through Vercel serverless endpoint
  const resp = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: email,
      subject: "Welcome to MYITRA!",
      html: `<h2>Hello ${name},</h2><p>Your signup was successful!</p>`
    })
  });

  const r = await resp.json();
  if (!resp.ok) {
    alert("Error sending confirmation email");
    console.error(r);
    return;
  }

  alert("Signup successful! Confirmation email sent.");
  window.location.href = "../login_page/index.html";
});
