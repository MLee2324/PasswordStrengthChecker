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

function getCharsetSize(pw) {
  let size = 0;
  if (/[a-z]/.test(pw)) size += 26;
  if (/[A-Z]/.test(pw)) size += 26;
  if (/[0-9]/.test(pw)) size += 10;
  if (/[^A-Za-z0-9]/.test(pw)) size += 33;
  if (size === 0) size = 1;
  return size;
}

function formatSeconds(seconds) {
  if (seconds < 1) return "< 1 second";
  if (seconds < 60) return Math.round(seconds) + " seconds";
  if (seconds < 3600) return Math.round(seconds / 60) + " minutes";
  if (seconds < 86400) return Math.round(seconds / 3600) + " hours";
  if (seconds < 31536000) return Math.round(seconds / 86400) + " days";
  return "years+";
}

function estimateCrackTime(pw, isCommon, hasRepeatingPattern) {
  if (isCommon) return "< 1 second";
  if (hasRepeatingPattern) return "~seconds";

  const charset = getCharsetSize(pw);
  const guesses = Math.pow(charset, pw.length) / 2;
  const guessesPerSecond = 10000000000;

  const seconds = guesses / guessesPerSecond;
  return formatSeconds(seconds);
}

function addToHistory(length, strengthText, crackTime) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

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

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
    resetAll();
  }
});

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
  const isCommon = commonPasswords.includes(pwLower);
  const hasRepeatingPattern =
    /(.)\1{2,}/.test(pw) || /(?:abc|123|qwerty)/i.test(pw);

  setCheckpoint(cpCase, hasLower && hasUpper);
  setCheckpoint(cpSymbol, hasSymbol);
  setCheckpoint(cpLength, longEnough);
  setCheckpoint(cpRepeated, !isCommon && !hasRepeatingPattern);

  let score = 0;
  if (hasLower && hasUpper) score++;
  if (hasSymbol) score++;
  if (longEnough) score++;
  if (!isCommon && !hasRepeatingPattern) score++;

  strength.classList.remove("weak", "okay", "strong");

  let strengthText = "";
  if (score <= 1) {
    strengthText = "weak";
    strength.innerHTML = strengthText;
    strength.classList.add("weak");
  } else if (score <= 3) {
    strengthText = "okay";
    strength.innerHTML = strengthText;
    strength.classList.add("okay");
  } else {
    strengthText = "strong";
    strength.innerHTML = strengthText;
    strength.classList.add("strong");
  }

  const crackTime = estimateCrackTime(pw, isCommon, hasRepeatingPattern);
  addToHistory(pw.length, strengthText, crackTime);
}

pass.addEventListener("input", evaluatePassword);

renderHistory();
