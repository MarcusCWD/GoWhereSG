function tabFunction() {
    let tabBtnFlag = true;
    let tabBtnPress = document.querySelector("#tab-btn");
    tabBtnPress.addEventListener("click", function () {
      // from open to close state
      if (tabBtnFlag === true) {
        document.querySelector("#myTabContent").style.display = "none";
        tabBtnFlag = false;
      }
      // from close to open state
      else {
        document.querySelector("#myTabContent").style.display = "block";
        tabBtnFlag = true;
      }
    });
  }
  