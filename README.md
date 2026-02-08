# Password Strength Checker

A web-based password strength checker designed to help users understand how secure a password is before using it. The tool evaluates common password weaknesses and provides a rough estimated time it would take an attacker to crack the password using brute-force techniques.

This project was created for educational purposes as part of a security and ethics course.

---

## Features

- Real-time password evaluation
- Checks for:
  - Upper & lower case letters
  - Special characters
  - Minimum length (12+ characters)
  - Common passwords and repeating patterns
- Visual checklist with pass/fail indicators
- Estimated password cracking time
- Strength rating (**weak / okay / strong**)
- Recent check history (local, temporary, non-persistent)
- Password visibility toggle
- **No passwords are stored, logged, or transmitted**

---

## How It Works

The checker analyzes the structure of the password using pattern matching and logic implemented in `script.js`.  
Crack time is estimated by calculating the size of the password’s character set and assuming a high-speed brute-force attacker.

**Important:**  
The crack-time estimate is an approximation meant to provide intuition, not an exact real-world guarantee.

---

## Installation & Usage

### Requirements

- Python 3.x  
- Flask  

### Setup

```bash
git clone https://github.com/your-username/password-strength-checker.git
cd password-strength-checker
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
