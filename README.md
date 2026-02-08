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

## Limitations & Warnings

- This tool does not guarantee password security
- Crack-time estimates assume a brute-force attacker and do not account for:
- Rate limiting
- Multi-factor authentication
- Hashing algorithms
- System-specific protections

The checker may give a false sense of security if used without understanding its limitations

Passwords are not stored, but users should still avoid entering real or sensitive passwords

This tool should not be used to secure critical accounts or sensitive systems

## Ethical Considerations & Responsible Use

This project is intended strictly for educational and awareness purposes.

Potential misuse includes:

- Modifying the tool to assist in password cracking

- Using estimates to target weak passwords

- To reduce misuse:

- The application never stores or transmits passwords

- Only metadata (length, strength, estimated time) is shown locally

- The design emphasizes user education over exploitation

- Users are encouraged to use this tool to learn about password hygiene, not to test or attack real accounts.

## License

This project is licensed under the terms described in the LICENSE file included in this repository.

## Acknowledgments

This project was developed as part of a university security and ethics assignment.
AI tools (ChatGPT) were used for debugging assistance and code review, similar to collaborating with a peer.
