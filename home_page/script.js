// ---------------------------
// NAVIGATION HANDLERS
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {

  const links = {
    "home-link": "../home_page/home_page.html",
    "aboutus-link": "../About_us_page/about_us.html",
    "whychooseus-link": "../Why choose us page/index.html",
    "footer-logo": "../Home page/index.html",
    "fhome-link": "../Home page/index.html",
    "ourstory": "../About us page/index.html",
  };

  Object.entries(links).forEach(([id, page]) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("click", () => {
        window.location.href = page;
      });
    }
  });

  // ---------------------------
  // SUPABASE CONNECTION
  // ---------------------------
  initSupabase();
});


// ---------------------------
// INITIALIZE SUPABASE
// ---------------------------
function initSupabase() {
  loadHomepageContent();
}


// ---------------------------
// SUPABASE CLIENT
// ---------------------------
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://szfpwaascymteojkcmeb.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZnB3YWFzY3ltdGVvamtjbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMzYzNDUsImV4cCI6MjA3ODcxMjM0NX0.3t74vMgm19iB4INDNruCfKz8QrHWcOK81Iks-os3t2A";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);


// ---------------------------
// LOAD HOMEPAGE CONTENT FROM SUPABASE
// ---------------------------
async function loadHomepageContent() {
  
  const { data, error } = await supabase
    .from("homepage_content")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("❌ Supabase fetch error:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.log("⚠️ No homepage content found in Supabase.");
    return;
  }

  const content = data[0];

  // ----------------------------
  // HERO SECTION
  // ----------------------------
  if (document.getElementById("hero-title"))
    document.getElementById("hero-title").textContent = content.hero_title;

  if (document.getElementById("hero-subtitle"))
    document.getElementById("hero-subtitle").textContent = content.hero_subtitle;

  // ----------------------------
  // MISSION SECTION
  // ----------------------------
  if (document.getElementById("mission-title"))
    document.getElementById("mission-title").textContent = content.mission_title;

  if (document.getElementById("mission-desc"))
    document.getElementById("mission-desc").textContent = content.mission_desc;

  // ----------------------------
  // IMPACT NUMBERS
  // ----------------------------
  if (document.getElementById("impact-boxes"))
    document.getElementById("impact-boxes").textContent = content.impact_boxes;

  if (document.getElementById("impact-women"))
    document.getElementById("impact-women").textContent = content.impact_women;

  if (document.getElementById("impact-communities"))
    document.getElementById("impact-communities").textContent =
      content.impact_communities;

  if (document.getElementById("impact-volunteers"))
    document.getElementById("impact-volunteers").textContent =
      content.impact_volunteers;

  console.log("✅ Homepage content loaded from Supabase:", content);
}
