// ======================
// 1. YOUR ORIGINAL CODE
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const links = {
    "home-link": "../Home page/index.html",
    "aboutus-link": "../About us page/index.html",
    "whychooseus-link": "../Why choose us page/index.html",
    "footer-logo": "../Home page/index.html",
    "fhome-link": "../Home page/index.html",
  };

  Object.entries(links).forEach(([id, page]) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("click", () => {
        window.location.href = page;
      });
    }
  });
});


// ================================
// 2. SUPABASE CONNECTION
// ================================
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Replace with your values
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON = "YOUR_ANON_KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);


// ================================
// 3. LOAD STORIES FROM SUPABASE
// ================================
async function loadStories() {
  const container = document.getElementById("storiesContainer");
  if (!container) return; // keep safe

  container.innerHTML = "<p>Loading stories…</p>";

  // Fetch stories from Supabase table: "stories"
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    container.innerHTML = "<p>Failed to load stories.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No stories available yet.</p>";
    return;
  }

  // Render stories (non-invasive, minimal markup)
  container.innerHTML = data
    .map(
      (story) => `
        <div class="story-box p-3 my-3 shadow-sm rounded">
          <h5 class="fw-bold">${story.title || "Untitled Story"}</h5>
          <p>${story.content || ""}</p>
        </div>
      `
    )
    .join("");
}

// Run it
loadStories();
