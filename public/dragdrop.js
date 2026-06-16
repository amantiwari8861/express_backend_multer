const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("doc");
const fileList = document.getElementById("fileList");

// Open file explorer on click
dropZone.addEventListener("click", () => {
    fileInput.click();
});

// Show selected files
fileInput.addEventListener("change", () => {
    displayFiles(fileInput.files);
});

// Drag Enter
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
});

// Drag Leave
dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
});

// Drop Files
dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");

    fileInput.files = e.dataTransfer.files;
    displayFiles(e.dataTransfer.files);
});

function displayFiles(files) {
    let html = "";

    for (let file of files) {
        html += `
            <div>
                📄 ${file.name}
                <small class="text-muted">
                    (${(file.size / 1024).toFixed(2)} KB)
                </small>
            </div>
        `;
    }

    fileList.innerHTML = html;
}