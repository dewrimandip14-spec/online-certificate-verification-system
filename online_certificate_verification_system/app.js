// Public certificate verification page.
const STORAGE_KEY = "certiverify_records";

const starterRecords = [
  {
    id: "CV-2026-0001",
    student: "Aarav Sharma",
    course: "Web Development Fundamentals",
    issuer: "Bright Future Learning Institute",
    issueDate: "2026-01-15",
    status: "Valid"
  }
];

function getRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(starterRecords));
      return starterRecords;
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : starterRecords;
  } catch (error) {
    console.error("Could not read certificate records:", error);
    return starterRecords;
  }
}

const form = document.getElementById("verify-form");
const idInput = document.getElementById("certificate-id");
const result = document.getElementById("verification-result");

function showResult(record) {
  result.classList.remove("hidden", "valid", "invalid");
  if (!record) {
    result.classList.add("invalid");
    result.innerHTML = "<h3>✕ Certificate not found</h3><p>No matching record exists in this demo registry. Check the ID and try again.</p>";
    return;
  }

  if (record.status !== "Valid") {
    result.classList.add("invalid");
    result.innerHTML = `<h3>! Certificate status: ${escapeHTML(record.status)}</h3>
      <p>A record was found, but it is not currently marked as valid.</p>
      ${detailsHTML(record)}`;
    return;
  }

  result.classList.add("valid");
  result.innerHTML = `<h3>✓ Certificate record found</h3>
    <p>This certificate is marked <strong>VALID</strong> in the demo registry.</p>
    ${detailsHTML(record)}`;
}

function detailsHTML(record) {
  return `<p><strong>Certificate ID:</strong> ${escapeHTML(record.id)}</p>
    <p><strong>Student:</strong> ${escapeHTML(record.student)}</p>
    <p><strong>Course:</strong> ${escapeHTML(record.course)}</p>
    <p><strong>Issued by:</strong> ${escapeHTML(record.issuer)}</p>
    <p><strong>Issue date:</strong> ${escapeHTML(record.issueDate)}</p>`;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const requestedId = idInput.value.trim().toLowerCase();
  if (!requestedId) return;
  const record = getRecords().find(item => String(item.id).trim().toLowerCase() === requestedId);
  showResult(record);
});

document.getElementById("sample-id").addEventListener("click", () => {
  idInput.value = "CV-2026-0001";
  form.requestSubmit();
});
