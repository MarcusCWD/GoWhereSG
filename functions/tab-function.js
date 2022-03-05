function tabFunction() {
    let tabBtnFlag = true;
    let tabBtnPress = document.querySelector("#tab-btn");
    let myTabContent = document.querySelector("#myTabContent")
    tabBtnPress.addEventListener("click", function () {
      // from open to close state
      if (tabBtnFlag === true) {
        // myTabContent.style.display = "none";
        myTabContent.classList.add("trans-close");
        myTabContent.classList.remove("trans-open");
        myTabContent.style.height="0vh"
        tabBtnFlag = false;
      }
      // from close to open state
      else {
        // myTabContent.style.display = "block";
        myTabContent.classList.add("transOpen");
        myTabContent.classList.remove("transClose");
        myTabContent.style.height="60vh"
        tabBtnFlag = true;
      }
    });
  }
  