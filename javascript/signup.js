document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;

  const fullName = form.fullName.value.trim();
  const username = form.username.value.trim();
  const age = parseInt(form.age.value, 10);
  const birthdate = new Date(form.birthdate.value);
  const password1 = form.password1.value;
  const password2 = form.password2.value;
  const legalChecked = form.legal.checked;
  const termsChecked = form.terms.checked;

  // Log labels and values
  console.log("Full Name: " + fullName);
  console.log("Username: " + username);

  // Checkboxes
  if (legalChecked) {
    console.log("The user has checked the legal checkbox");
  } else {
    console.log("The user has not checked the legal checkbox");
  }

  if (termsChecked) {
    console.log("The user has checked the terms checkbox");
  } else {
    console.log("The user has not checked the terms checkbox");
  }

  // Eligibility checks
  const fieldsNotBlank = fullName && username && age && birthdate && password1 && password2;

  if (
    password1 === password2 &&
    age >= 13 &&
    legalChecked &&
    termsChecked &&
    fieldsNotBlank
  ) {
    console.log("The user is eligible");
  } else {
    console.log("The user is ineligible");
  }

  // Stretch Goal: Math Check
  const today = new Date();
  let actualAge = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    actualAge--;
  }

  if (actualAge !== age) {
    console.log("The user is not likely to be good at math");
  } else {
    console.log("The user can figure out the user's age");
  }
});
