function validateUser() {
    let user = document.forms["form1"]["name"].value;
    let age = document.forms["form1"]["age"].value;
    let sex = document.querySelector('input[name="sex"]:checked');
    let statusOfUser = "";
    let statusOfAge = "";
    let statusOfSex = "";
  
    if (user === "") {
      statusOfUser = "Name shouldn't be empty";
      document.getElementById("namediv").innerText = statusOfUser;
      return false;
    }
    if (age === "") {
      statusOfAge = "Age shouldn't be empty";
      document.getElementById("agediv").innerText = statusOfAge;
      return false;
    }
    if (sex === null) {
      statusOfSex = "Please select an option";
      document.getElementById("radio").innerText = statusOfSex;
      return false;
    }
    
    window.location.href = "Quiz.html";
    return false; 
  }
  