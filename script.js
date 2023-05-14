const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault(); // preventing form submission
  downloadBtn.innerText = "Downloading File...";
  fetchFile(fileInput.value);
});

const fetchFile = (url) => {
  // Fetching file and returning response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      // URL.createObjectURL creates a url of passed object
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl; // Passing tempUrl as href value of <a></a> tag
      // Passing the file last name and extension as download value of <a></a> tag
      aTag.download = url.replace(/^.*[\\\/]/, "");
      document.body.appendChild(aTag); // Adding <a></a> tag inside body
      aTag.click(); // Clicking <a></a> tag so the file is downloaded
      aTag.remove(); // Removing <a></a> tag from body once the file is downloaded
      URL.revokeObjectURL(tempUrl); // Removing tempUrl from the document
      downloadBtn.innerText = "Download File";
      fileInput.value = "";
    })
    .catch(() => {
      // catch method will be called if an error occurs during downloading
      downloadBtn.innerText = "Download File";
      alert("Failed to download file!");
    });
};
