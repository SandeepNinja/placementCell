var editBtn = document.getElementById("editStudentStatus");
var saveBtn = document.getElementById("saveStudentStatus");
// ======================================
var newSelection = document.getElementById("changeStatusOfStudent");
var selectedDisplayed = document.getElementById("currentDisplay");
// newSelection.style.display = "none";

editBtn.addEventListener("click", function () {
  if (editBtn.innerHTML == "Edit") {
    saveBtn.style.display = "block";
    editBtn.style.display = "none";
    if (selectedDisplayed.innerHTML == "not Placed") {
      newSelection.getElementsByTagName("option")[1].selected = "selected";
    }

    newSelection.style.display = "block";
    selectedDisplayed.style.display = "none";
    editBtn.innerHTML = "Save";
  } else {
    newSelection.style.display = "none";
    selectedDisplayed.style.display = "block";
    editBtn.innerHTML = "Edit";
  }
});
