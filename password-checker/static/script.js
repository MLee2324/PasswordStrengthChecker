const overlay = document.getElementById("overlay");
const openApp = document.getElementById("openApp");

openApp.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.classList.add("hidden");
});
