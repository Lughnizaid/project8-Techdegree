// Lets fetch it
let employees = [];
fetch(`https://randomuser.me/api/?results=12&nat=us`)
  .then(response => response.json()
  .then(data => {
    employees = data.results;
    displayCards(employees);
  })
  .then(eventtoPopup)
);

// Lets Display the data in homepage
function displayCards(employees) {
  const displaylistHTML = employees.map( employees =>
     `<li class="list">
        <img id="image" class="image-e" src="${employees.picture.medium}">
        <div class="employee-info">
          <p id="name" class="name-e">${employees.name.first} ${employees.name.last}</p>
          <p id="email" class="email-e">${employees.email}</p>
          <p id="city" class="city-e">${employees.location.city}. <span style="color: black;, font-weight: 900;">USA</span></p>
        </div>
      </li>`).join('');
  document.querySelector('.mainContainer').innerHTML = displaylistHTML;
};

// Lets set the pop up
const popup = document.querySelector(".myPopup");
function popupInfo(closest) {
  document.querySelector('.popup-photo').src = `${employees[closest].picture.medium}`;
  document.querySelector('.popup-titlename').textContent = `${employees[closest].name.first} ${employees[closest].name.last}`;
  document.querySelector('.popup-email').textContent = `${employees[closest].email}`;
  document.querySelector('.popup-phone').textContent = `${employees[closest].cell}`;
  document.querySelector('.popup-street').textContent = `${employees[closest].location.street.name} ${employees[closest].location.street.number} ${employees[closest].location.city}`;
  document.querySelector('.popup-city').textContent = `${employees[closest].location.state}. Postal: ${employees[closest].location.postcode}`;
  const born = employees[closest].dob.date;
  document.querySelector('.popup-birthday').textContent = `Birth of date: ${born.substring(8,10)}/${born.substring(5,7)}/${born.substring(0,4)}`;
};

function displayPopup(event) {
  const employeeClicked = event.target.closest('li');
  const allEmployees = Array.from(employeeClicked.closest('ul').children);
  const employeesDisplayed = allEmployees.indexOf(employeeClicked);
  popup.style.display = "block";
  return popupInfo(employeesDisplayed);
};

function eventtoPopup() {
  const list = document.querySelectorAll(".list");
  for (let i = 0; i < list.length; i += 1) {
    list[i].addEventListener('click', displayPopup);
  }
};


// Provide the way to close the pop up
const closePopup = document.querySelectorAll(".to-close")[0];
closePopup.onclick = function() {
  popup.style.display = "none";
}
