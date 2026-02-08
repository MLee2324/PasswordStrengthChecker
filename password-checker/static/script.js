const overlay = document.getElementById("overlay");
const openApp = document.getElementById("openApp");
const closeApp = document.getElementById("closeApp");

const cpCase = document.getElementById("cpCase");
const cpSymbol = document.getElementById("cpSymbol");
const cpLength = document.getElementById("cpLength");
const cpRepeated = document.getElementById("cpRepeated");

const showpassword = document.getElementById("checkPass");

var pass = document.getElementById("passwordInput");
var message = document.getElementById("message");
var strength = document.getElementById("strength");

const historyList = document.getElementById("historyList");
let history = [];

const minLength = 12;
const commonPasswords = [
  "password", "123456", "qwerty", "asdf", "asdfasdf", "letmein", "admin", "welcome"
];

function setCheckpoint(row, passed) {
  const img = row.querySelector(".checkpointIcon");
  if (passed) {
    img.src = "/static/checkpoint.jpg";
  } else {
    img.src = "/static/x.png";
  }
}

function resetFeedback() {
  message.style.display = "none";
  strength.innerHTML = "";
  strength.classList.remove("weak", "okay", "strong");

  setCheckpoint(cpCase, false);
  setCheckpoint(cpSymbol, false);
  setCheckpoint(cpLength, false);
  setCheckpoint(cpRepeated, false);
}

function renderHistory() {
  historyList.innerHTML = "";

  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function estimateCrackTime(score, length) {
  if (score <= 1) return "~seconds";
  if (score === 2) return "~minutes";
  if (score === 3) return "~hours";
  return "~years";
}

function addToHistory(score, length, strengthText) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const crackTime = estimateCrackTime(score, length);

  // NOTE: We DO NOT store the password, only metadata (time/length/strength/estimate)
  history.unshift(`${time} — ${length} chars — ${strengthText} — ${crackTime}`);

  if (history.length > 5) {
    history.pop();
  }

  renderHistory();
}

function resetAll() {
  pass.value = "";
  pass.type = "password";
  showpassword.textContent = "Show password";

  history = [];
  renderHistory();

  resetFeedback();
}

openApp.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  pass.focus();
});

closeApp.addEventListener("click", () => {
  overlay.classList.add("hidden");
  resetAll();
});

// Optional: close modal when clicking outside the window
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
    resetAll();
  }
});

// close modal on ESC (only if open)
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    if (!overlay.classList.contains("hidden")) {
      overlay.classList.add("hidden");
      resetAll();
    }
  }
});

showpassword.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    showpassword.textContent = "Hide password";
  } else {
    pass.type = "password";
    showpassword.textContent = "Show password";
  }
});

function evaluatePassword() {
  const pw = pass.value;

  if (pw.length === 0) {
    resetFeedback();
    return;
  }

  message.style.display = "block";

  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasSymbol = /[^A-Za-z0-9]/.test(pw);
  const longEnough = pw.length >= minLength;

  const pwLower = pw.toLowerCase();
  let isCommon = false;

  const hasRepeatingPattern =
    /(.)\1{2,}/.test(pw) || /(?:abc|123|qwerty)/i.test(pw);

  if (commonPasswords.includes(pwLower)) {
    isCommon = true;
  } else {
    isCommon = false;
  }

  setCheckpoint(cpCase, hasLower && hasUpper);
  setCheckpoint(cpSymbol, hasSymbol);
  setCheckpoint(cpLength, longEnough);
  setCheckpoint(cpRepeated, !isCommon && !hasRepeatingPattern);

  // Strength score
  let score = 0;
  if (hasLower && hasUpper) score++;
  if (hasSymbol) score++;
  if (longEnough) score++;
  if (!isCommon && !hasRepeatingPattern) score++;

  strength.classList.remove("weak", "okay", "strong");

  let strengthText = "";


  // Add to history (NO password stored)
  addToHistory(score, pw.length, strengthText);
}

pass.addEventListener("input", evaluatePassword);

// Start with empty history
renderHistory();
