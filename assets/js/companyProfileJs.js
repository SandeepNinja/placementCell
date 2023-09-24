var editBtnC = document.getElementById("editCompanyProfile");
var saveBtnC = document.getElementsByClassName("formDisplay");
var cancelBtnC = document.getElementById("cancelCompanyProfile");

editBtnC.addEventListener("click", function () {
  editBtnC.style.display = "none";
  for (var i = 0; i < saveBtnC.length; i++) {
    saveBtnC[i].style.display = "block";
  }
  cancelBtnC.style.display = "block";
});
cancelBtnC.addEventListener("click", function () {
  cancelBtnC.style.display = "none";
  for (var i = 0; i < saveBtnC.length; i++) {
    saveBtnC[i].style.display = "none";
  }
  editBtnC.style.display = "block";
});
