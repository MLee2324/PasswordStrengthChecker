const overlay = document.getElementById("overlay");
const openApp = document.getElementById("openApp");
const closeApp = document.getElementById("closeApp");
const cpCase = document.getElementById("cpCase");
const cpSymbol = document.getElementById("cpSymbol");
const cpLength = document.getElementById("cpLength");
const cpRepeated = document.getElementById("cpRepeated");
const commonPasswords = ["password", "123456", "qwerty", "asdfasdf", "letmein", "admin", "welcome"];
const showpassword = document.getElementById("checkPass");
const checkBtn = document.getElementById("checkBtn");
var pass = document.getElementById("passwordInput");
var message = document.getElementById("message")
var strength = document.getElementById("strength");
const minLength = 12;

function setCheckpoint(row, passed) {
  const img = row.querySelector(".checkpointIcon");
  if (passed) 
  {
    img.src = "/static/checkpoint.jpg";
  } 
  else 
  {
    img.src = "/static/x.png";
  }
}

function resetAll() {
  pass.value = "";
  message.style.display = "none";
  strength.innerHTML = "";

  setCheckpoint(cpCase, false);
  setCheckpoint(cpSymbol, false);
  setCheckpoint(cpLength, false);
  setCheckpoint(cpRepeated, false);
  showpassword.textContent = "Show password";

}

openApp.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  pass.focus();
});

closeApp.addEventListener("click", () => {
  overlay.classList.add("hidden");
  resetAll();
});
//when clicked out of window exit out of window
overlay.addEventListener("click", (e) => {
  if (e.target === overlay)
  {
      overlay.classList.add("hidden");
      resetAll();
  }
});

//when escape button is pressed exit out of window
document.addEventListener('keydown', function(event) {
  if(event.key === 'Escape')
  {
    overlay.classList.add("hidden");
    resetAll();
  } 
});

showpassword.addEventListener("click", () => {
  if (pass.type === "password") 
  {
    pass.type = "text";
    showpassword.textContent = "Hide password";
  } 
  else 
  {
    pass.type = "password";
    showpassword.textContent = "Show password";
  }
});

function evaluatePassword() {
  const pw = pass.value;

  if (pw.length === 0) 
  {
    message.style.display = "none";
    strength.innerHTML = "";
    return;
  }

  message.style.display = "block";

  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasSymbol = /[^A-Za-z0-9]/.test(pw);
  const longEnough = pw.length >= minLength;
  const pwLower = pw.toLowerCase();
  let isCommon = false; 
  const hasRepeatingPattern = /(.)\1{2,}/.test(pw) || /(?:abc|123|qwerty)/i.test(pw);

  if (commonPasswords.includes(pwLower))
  {
    isCommon = true;
  } 
  else 
  {
    isCommon = false;
  }

  setCheckpoint(cpCase, hasLower && hasUpper);
  setCheckpoint(cpSymbol, hasSymbol);
  setCheckpoint(cpLength, longEnough);

  setCheckpoint(cpRepeated, !isCommon && !hasRepeatingPattern);
  // Strength text
  let score = 0;
  if (hasLower && hasUpper) score++;
  if (hasSymbol) score++;
  if (longEnough) score++;
  if (!isCommon && !hasRepeatingPattern) score++;

  if (score <= 1) 
  {
    strength.innerHTML = "weak";
  } 
  else if (score <= 3) 
  {
    strength.innerHTML = "okay";
  } 
  else 
  {
    strength.innerHTML = "strong";
  }
}

checkBtn.addEventListener("click", evaluatePassword);
pass.addEventListener("input", evaluatePassword);
