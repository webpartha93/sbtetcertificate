/**
 * ============================================================
 *  Certificate Verification Portal — script.js
 *  All student data is stored here on the client side.
 *  To add more students:
 *    1. Add an entry to the STUDENTS array below.
 *    2. Place the certificate image inside the "certificates/" folder.
 *    3. Reference the image path in the "certificateImage" field.
 * ============================================================
 */

// ============================================================
//  STUDENT DATA STORE
//  Fields:
//    name             — must match EXACTLY (case-insensitive comparison done in code)
//    regNo            — must match EXACTLY (spaces/slashes are normalised in comparison)
//    certificatePath  — relative path to the certificate image file
//    certNo           — optional display label
// ============================================================
const STUDENTS = [
  {
    name: "PRABHAS KUMAR PUSTI",
    regNo: "0023/26/11",
    certificatePath: "certificates/0033_26_11.jpeg",
    certNo: "DCN 230164",
    course: "Diploma in Civil Engineering"
  },
  // ── Add more students below this line ──────────────────────
  // {
  //   name: "STUDENT NAME HERE",
  //   regNo: "XXXX/XX/XX",
  //   certificatePath: "certificates/XXXX_XX_XX.jpg",
  //   certNo: "DCN XXXXXX",
  //   course: "Course Name Here"
  // },
];


// ============================================================
//  HELPERS
// ============================================================

/**
 * Normalise a string for comparison:
 *   - Trim whitespace
 *   - Collapse internal whitespace to single spaces
 *   - Convert to UPPER CASE
 */
function normalise(str) {
  return str.trim().replace(/\s+/g, " ").toUpperCase();
}

/**
 * Normalise a registration number:
 *   - Strip spaces
 *   - Convert to upper case
 */
function normaliseReg(str) {
  return str.trim().replace(/\s+/g, "").toUpperCase();
}

/**
 * Look up a student by name + registration number.
 * Returns the student object if found, or null.
 */
function findStudent(name, regNo) {
  const normName = normalise(name);
  const normReg = normaliseReg(regNo);

  return STUDENTS.find(s =>
    normalise(s.name) === normName &&
    normaliseReg(s.regNo) === normReg
  ) || null;
}


// ============================================================
//  DOM REFERENCES
// ============================================================
const verifySection = document.getElementById("verify-section");
const resultSection = document.getElementById("result-section");

const verifyForm = document.getElementById("verify-form");
const nameInput = document.getElementById("student-name");
const regInput = document.getElementById("reg-number");
const nameError = document.getElementById("name-error");
const regError = document.getElementById("reg-error");
const alertBox = document.getElementById("alert-box");
const verifyBtn = document.getElementById("verify-btn");

const resultNameEl = document.getElementById("result-name-display");
const resultRegEl = document.getElementById("result-reg-display");
const certImg = document.getElementById("certificate-img");
const downloadBtn = document.getElementById("download-btn");
const backBtn = document.getElementById("back-btn");


// ============================================================
//  VALIDATION
// ============================================================
function validateFields() {
  let valid = true;

  // Clear previous errors
  nameError.textContent = "";
  regError.textContent = "";
  nameInput.classList.remove("error");
  regInput.classList.remove("error");

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your full name.";
    nameInput.classList.add("error");
    valid = false;
  }

  if (regInput.value.trim() === "") {
    regError.textContent = "Please enter your registration number.";
    regInput.classList.add("error");
    valid = false;
  }

  return valid;
}


// ============================================================
//  ALERT HELPER
// ============================================================
function showAlert(message, type = "error") {
  alertBox.textContent = message;
  alertBox.className = `alert-box ${type} show`;
}

function hideAlert() {
  alertBox.className = "alert-box";
  alertBox.textContent = "";
}


// ============================================================
//  PAGE NAVIGATION
// ============================================================
function showPage(page) {
  verifySection.classList.remove("active");
  resultSection.classList.remove("active");
  page.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ============================================================
//  FORM SUBMIT — VERIFICATION LOGIC
// ============================================================
verifyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  hideAlert();

  // Validate inputs
  if (!validateFields()) return;

  // Show loading state
  verifyBtn.classList.add("loading");
  verifyBtn.disabled = true;

  // Simulate a brief network-like delay for UX polish
  setTimeout(() => {
    const student = findStudent(nameInput.value, regInput.value);

    verifyBtn.classList.remove("loading");
    verifyBtn.disabled = false;

    if (!student) {
      showAlert("❌  No matching certificate found. Please check your name and registration number.");
      return;
    }

    // ── SUCCESS ──────────────────────────────────────────────
    // Populate result page
    resultNameEl.textContent = student.name;
    resultRegEl.textContent = `Registration No: ${student.regNo}  •  ${student.certNo}`;

    certImg.src = student.certificatePath;
    certImg.alt = `Certificate of ${student.name}`;

    // Wire download button
    // downloadBtn.href     = student.certificatePath;
    // downloadBtn.download = `Certificate_${normaliseReg(student.regNo)}.jpg`;

    // Navigate to result page
    showPage(resultSection);

  }, 800); // 800 ms simulated delay
});


// ============================================================
//  CLEAR ERRORS ON INPUT
// ============================================================
nameInput.addEventListener("input", () => {
  nameInput.classList.remove("error");
  nameError.textContent = "";
  hideAlert();
});

regInput.addEventListener("input", () => {
  regInput.classList.remove("error");
  regError.textContent = "";
  hideAlert();
});


// ============================================================
//  BACK BUTTON
// ============================================================
backBtn.addEventListener("click", () => {
  showPage(verifySection);
  // Optionally clear the form
  // verifyForm.reset();
});
