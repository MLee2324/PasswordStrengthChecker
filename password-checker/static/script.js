const overlay = document.getElementById("overlay");
const openApp = document.getElementById("openApp");
var pass = document.getElementById("passwordInput");
var message = document.getElementById("message")
var strength = document.getElementById("strength");

openApp.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});
//when clicked out of window exit out of window
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.classList.add("hidden");
});

//when escape button is pressed exit out of window
document.addEventListener('keydown', function(event) {
  if(event.key === 'Escape') overlay.classList.add("hidden");
});

pass.addEventListener('input', () => {
  if(pass.value.length > 0)
  {
    message.style.display = "Block";
  }
  else
  {
    message.style.display = "None";
  }
});