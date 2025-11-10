const titleInput       = document.getElementById("title");
const contentInput     = document.getElementById("content");
const addNoteBtn       = document.getElementById("addNote");
const notesContainer   = document.getElementById("notesContainer");
const searchInput      = document.getElementById("search");

const editModal        = document.getElementById("editModal");
const editTitle        = document.getElementById("editTitle");
const editContent      = document.getElementById("editContent");
const saveEditBtn      = document.getElementById("saveEdit");
const cancelEditBtn    = document.getElementById("cancelEdit");

let notes              = JSON.parse(localStorage.getItem("notes")) || [];
let currentEditIndex   = null;

function displayNotes(filteredNotes = notes) {
  notesContainer.innerHTML = "";

  filteredNotes.forEach((note, index) => {
    const div = document.createElement("div");
    div.classList.add("note");
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="actions">
        <button class="edit-btn" onclick="editNote(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
    notesContainer.appendChild(div);
  });
}

function addNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("Please enter both title and content!");
    return;
  }

  notes.push({ title, content });
  localStorage.setItem("notes", JSON.stringify(notes));
  titleInput.value = "";
  contentInput.value = "";
  displayNotes();
}

function editNote(index) {
  currentEditIndex = index;
  editTitle.value = notes[index].title;
  editContent.value = notes[index].content;
  editModal.style.display = "flex";
}

function deleteNote(index) {
  if (confirm("Are you sure you want to delete this note?")) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  }
}

saveEditBtn.addEventListener("click", () => {
  if (currentEditIndex !== null) {
    const newTitle = editTitle.value.trim();
    const newContent = editContent.value.trim();

    if (!newTitle || !newContent) {
      alert("Please fill out both fields!");
      return;
    }

    notes[currentEditIndex] = { title: newTitle, content: newContent };
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
    editModal.style.display = "none";
    currentEditIndex = null;
  }
});

cancelEditBtn.addEventListener("click", () => {
  editModal.style.display = "none";
  currentEditIndex = null;
});

window.addEventListener("click", (e) => {
  if (e.target === editModal) {
    editModal.style.display = "none";
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
  );
  displayNotes(filtered);
});

addNoteBtn.addEventListener("click", addNote);
displayNotes();