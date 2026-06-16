document.getElementById("myform").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();

  const files = document.getElementById("doc").files;

  for (const file of files) {
    formData.append("doc", file);
  }

  console.log([...formData.entries()]);

  const response = await fetch("/files", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  console.log(result);
  const msgObj = document.getElementById("message");
  msgObj.parentElement.classList.replace("d-none", "d-block");
  msgObj.textContent = result.message;
  fetchAllFiles();
});
fetchAllFiles();

async function fetchAllFiles() {
  try {
    const response = await fetch("/files");
    const result = await response.json();
    if (result.success) {
      const files = result.data;
      let html = "";

      files.forEach((file) => {
        html += `
                        <tr>
                            <td data-bs-toggle="modal" data-bs-target="#viewModal" onclick="viewFile('${file.url}')">${file.name}</td>
                            <td>${file.url}</td>
                            <td>${file.createdAt}</td>
                            <td>${(file.size / 1024).toFixed(2)}</td>
                            <td>
                                <button class="btn btn-danger" onclick="deleteFile('${file.id}')">Delete</button>
                            </td>
                        </tr>
                    `;
      });

      document.querySelector("#filesTable tbody").innerHTML = html;
      new DataTable("#filesTable");
    }
  } catch (error) {
    console.error("Error fetching files:", error);
  }
}

function viewFile(url) {
  const fileExtension = url.split(".").pop().toLowerCase();
  const iframe = document.querySelector("iframe");
  if (fileExtension === "pdf") {
    console.log(url);
    iframe.src = `/pdfjs/web/viewer.html?file=${url}`;
  } else {
    iframe.src = `${url}`;
    // window.open(url, "_blank");
  }
}
