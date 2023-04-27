const Form = document.getElementById("form");

// Event

Form.addEventListener("submit", onSubmitHandler);

//Setting Errors

const setError = (childrenElements) => {
  childrenElements[0].classList.add("error");
  childrenElements[1].classList.add("error");
  childrenElements[2].style.display = "block";
};
const removeError = (childrenElements) => {
  childrenElements[0].classList.remove("error");
  childrenElements[1].classList.remove("error");
  childrenElements[2].style.display = "none";
};

// Function to validate the errors
const validateInput = () => {
  let error = false;
  const Day = document.getElementById("day").value;
  const Month = document.getElementById("month").value;
  const Year = document.getElementById("year").value;

  document.querySelectorAll("input").forEach((input) => {
    const name = input.name;

    if (name === "day" && (Day === "" || Day <= 0 || Day >= 32)) {
      error = true;
      setError(document.getElementById(name + "Group").children);
      console.log("Invalid Day");
    } else if (name === "day" && !(Day === "" || Day <= 0 || Day >= 32)) {
      removeError(document.getElementById(name + "Group").children);
    }
    if (name === "month" && (Month === "" || Month <= 0 || Month >= 12)) {
      error = true;
      setError(document.getElementById(name + "Group").children);
    } else if (
      name === "month" &&
      !(Month === "" || Month <= 0 || Month >= 12)
    ) {
      removeError(document.getElementById(name + "Group").children);
    }

    if (name === "year" && Year.toString().length !== 4) {
      error = true;
      setError(document.getElementById(name + "Group").children);
    } else if (name === "year" && Year.toString().length == 4) {
      removeError(document.getElementById(name + "Group").children);
    }
  });
  return { error, Day, Month, Year };
};

//Calculate Age

const getAge = (birthday) => {
  const today = new Date();
  const birthDate = new Date(birthday);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months <= 0 || (months >= 13 && days <= 0)) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    const numOfdayInMonth = new Date(
      birthDate.getFullYear(),
      birthDate.getMonth,
      0
    ).getDate();
    const remDays = numOfdayInMonth - birthDate.getDate();
    const DaysElapsed = today.getDate();
    days = remDays + DaysElapsed;
  }
  return {
    months,
    years,
    days,
  };
};

function onSubmitHandler(e) {
  e.preventDefault();
  validateInput();
  const { error, Day, Year, Month } = validateInput();

  if (!error) {
    const { years, months, days } = getAge(`${Year}- ${Month}- ${Day}`);
    document.getElementById("yearsResult").innerText = years;
    document.getElementById("monthResult").innerText = months;
    document.getElementById("daysResult").innerText = days;
  }
}
