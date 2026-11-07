// Admin demo panel. This is intentionally a front-end-only classroom prototype.
const STORAGE_KEY = "certiverify_records";
const DEMO_PASSWORD = "admin123";
const starterRecords = [{
  id: "CV-2026-0001",
  student: "Aarav Sharma",
  course: "Web Development Fundamentals",
  issuer: "Bright Future Learning Institute",
  issueDate: "2026-01-15",
  status: "Valid"
}];

const $ = id => document.getElementById(id);
let records = loadRecords();

function loadRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(starterRecords));
      return [...starterRecords];
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [...starterRecords];
  } catch (error) {
    console.error("Could not load records:", error);
    return [...starterRecords];
  }
}

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  renderRecords();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

$("login-form").addEventListener("submit", event => {
  event.preventDefault();
  if ($("admin-password").value === DEMO_PASSWORD) {
    $("login-panel").classList.add("hidden");
    $("dashboard").classList.remove("hidden");
    $("login-error").textContent = "";
    renderRecords();
  } else {
    $("login-error").textContent = "Incorrect password. Please try again.";
  }
});

$("logout-button").addEventListener("click", () => {
  $("dashboard").classList.add("hidden");
  $("login-panel").classList.remove("hidden");
  $("admin-password").value = "";
  resetForm();
});

$("certificate-form").addEventListener("submit", event => {
  event.preventDefault();
  const originalId = $("original-id").value;
  const record = {
    id: $("cert-id").value.trim(),
    student: $("student-name").value.trim(),
    course: $("course-name").value.trim(),
    issuer: $("issuer").value.trim(),
    issueDate: $("issue-date").value,
    status: $("status").value
  };

  if (records.some(item => item.id.toLowerCase() === record.id.toLowerCase() && item.id !== originalId)) {
    $("form-message").textContent = "That Certificate ID already exists. Please use a unique ID.";
    $("form-message").style.color = "#b42318";
    return;
  }

  if (originalId) {
    records = records.map(item => item.id === originalId ? record : item);
    $("form-message").textContent = "Certificate updated successfully.";
  } else {
    records.push(record);
    $("form-message").textContent = "Certificate added successfully.";
  }
  $("form-message").style.color = "#16794b";
  saveRecords();
  resetForm(false);
});

function resetForm(clearMessage = true) {
  $("certificate-form").reset();
  $("original-id").value = "";
  $("form-title").textContent = "Add a certificate";
  $("save-button").textContent = "Save certificate";
  $("cancel-edit").classList.add("hidden");
  if (clearMessage) $("form-message").textContent = "";
}

$("cancel-edit").addEventListener("click", () => resetForm());
$("record-search").addEventListener("input", renderRecords);

function renderRecords() {
  const query = $("record-search").value.trim().toLowerCase();
  const filtered = records.filter(record =>
    [record.id, record.student, record.course, record.issuer, record.status]
      .some(value => String(value).toLowerCase().includes(query))
  );

  $("total-count").textContent = records.length;
  $("valid-count").textContent = records.filter(item => item.status === "Valid").length;
  $("records-body").innerHTML = filtered.map(record => `
    <tr>
      <td><strong>${escapeHTML(record.id)}</strong></td>
      <td>${escapeHTML(record.student)}</td>
      <td>${escapeHTML(record.course)}</td>
      <td><span class="status-pill ${record.status === "Valid" ? "" : "revoked"}">${escapeHTML(record.status)}</span></td>
      <td><div class="actions">
        <button class="button secondary small" data-edit="${escapeHTML(record.id)}" type="button">Edit</button>
        <button class="button danger small" data-delete="${escapeHTML(record.id)}" type="button">Delete</button>
      </div></td>
    </tr>`).join("");

  $("empty-records").classList.toggle("hidden", filtered.length !== 0);
}

$("records-body").addEventListener("click", event => {
  const editId = event.target.dataset.edit;
  const deleteId = event.target.dataset.delete;
  if (editId) startEdit(editId);
  if (deleteId) deleteRecord(deleteId);
});

function startEdit(id) {
  const record = records.find(item => item.id === id);
  if (!record) return;
  $("original-id").value = record.id;
  $("cert-id").value = record.id;
  $("student-name").value = record.student;
  $("course-name").value = record.course;
  $("issuer").value = record.issuer;
  $("issue-date").value = record.issueDate;
  $("status").value = record.status;
  $("form-title").textContent = "Edit certificate";
  $("save-button").textContent = "Update certificate";
  $("cancel-edit").classList.remove("hidden");
  $("form-message").textContent = "";
  $("cert-id").focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteRecord(id) {
  const confirmed = window.confirm(`Delete certificate ${id}? This cannot be undone.`);
  if (!confirmed) return;
  records = records.filter(item => item.id !== id);
  saveRecords();
  $("form-message").textContent = "Certificate deleted.";
  $("form-message").style.color = "#16794b";
  if ($("original-id").value === id) resetForm();
}
