function categories() {
    let catFlag = document.querySelector("[name = 'selectionBtn']:checked").value;
    console.log(catFlag);
    if (catFlag === "attractions") {
      return "10001, 10002, 10004, 10027, 10055, 19005, 19031, 16007, 16020, 16025, 16046";
    } else if (catFlag === "food") {
      return "13000";
    } else if (catFlag === "shops") {
      return 17000;
    } else if (catFlag === "hotel") {
      return 19014;
    } else if (catFlag === "outdoors") {
      return "16002,16003,16005,16014, 16015,16017,16018,16019,16021,16023,16028,16034,16035,16038";
    }
  }
  