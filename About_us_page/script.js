document.addEventListener("DOMContentLoaded", () => {

  // Navigation link mapping
  const links = {
    "home-link": "../Home page/index.html",
    "aboutus-link": "../About us page/index.html",
    "whychooseus-link": "../Why choose us page/index.html",
    "footer-logo": "../Home page/index.html",
    "fhome-link": "../Home page/index.html"
  };

  // Attach click events to all defined links
  Object.entries(links).forEach(([id, page]) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.cursor = "pointer"; // make it clickable
      element.addEventListener("click", () => {
        window.location.href = page;
      });
    }
  });

});


// ================================
// 1. SUPABASE CONNECTION
// ================================
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://szfpwaascymteojkcmeb.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZnB3YWFzY3ltdGVvamtjbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMzYzNDUsImV4cCI6MjA3ODcxMjM0NX0.3t74vMgm19iB4INDNruCfKz8QrHWcOK81Iks-os3t2A";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);


// ================================
// 2. LOAD ABOUT-US CONTENT
// ================================
document.addEventListener("DOMContentLoaded", () => {
  loadAboutUsContent();
});

async function loadAboutUsContent() {
  const { data, error } = await supabase
    .from("aboutus_content")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("❌ Supabase Error:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.log("⚠ No About Us content found.");
    return;
  }

  const content = data[0];

  // HERO
  setText("header-title", content.header_title);
  setText("header-subtext", content.header_subtext);

  // VISION
  setText("vision-title", content.vision_title);
  setText("vision-content", content.vision_content);

  // MISSION
  setText("mission-title", content.mission_title);
  setText("mission-content", content.mission_content);

  // TEAM MEMBER 1
  setText("team1-name", content.team1_name);
  setText("team1-role", content.team1_role);
  setText("team1-desc", content.team1_desc);
  setImage("team1-img", content.team1_img);

  // TEAM MEMBER 2
  setText("team2-name", content.team2_name);
  setText("team2-role", content.team2_role);
  setText("team2-desc", content.team2_desc);
  setImage("team2-img", content.team2_img);

  // TEAM MEMBER 3
  setText("team3-name", content.team3_name);
  setText("team3-role", content.team3_role);
  setText("team3-desc", content.team3_desc);
  setImage("team3-img", content.team3_img);

  // TEAM MEMBER 4
  setText("team4-name", content.team4_name);
  setText("team4-role", content.team4_role);
  setText("team4-desc", content.team4_desc);
  setImage("team4-img", content.team4_img);

  console.log("✅ About Us content loaded successfully.");
}

// ----------------------------
// HELPER FUNCTIONS
// ----------------------------
function setText(id, value) {
  if (document.getElementById(id) && value) {
    document.getElementById(id).textContent = value;
  }
}

function setImage(id, url) {
  if (document.getElementById(id) && url) {
    document.getElementById(id).src = url;
  }
}
