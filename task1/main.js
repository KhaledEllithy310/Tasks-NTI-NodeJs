const addUserForm = document.querySelector("#addUserForm");
console.log("addUserForm", addUserForm);
let allUsers = [];
const headerForm = ["id", "name", "email", "age", "status"];
const bodyData = document.querySelector("#bodyData");
console.log("bodyData", bodyData);

// function get users from local storage
const readFromLocalStorage = () => JSON.parse(localStorage.getItem("allUsers"));
// function set users to local storage
const WriteToLocalStorage = () =>
  localStorage.setItem("allUsers", JSON.stringify(allUsers));

// if local storage is empty set into it all users
// if local storage is not empty get users from local storage and update all users
if (localStorage.getItem("allUsers") != null) allUsers = readFromLocalStorage();
else WriteToLocalStorage();

//function add users
const addUser = () => {
  const user = {};
  //get all values from the form
  headerForm.forEach((input) => {
    //store data in object
    if (input == "id") user[input] = Date.now();
    else user[input] = addUserForm.elements[input].value;
  });
  // store object user in array
  allUsers.push(user);
  WriteToLocalStorage();
  addUserForm.reset();
  console.log(allUsers);
};
console.log(allUsers);

//event handlers for add users
if (addUserForm) {
  addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addUser();
  });
}

const createElement = (parent, elem, text, classes) => {
  let myElement = document.createElement(elem);
  if (text) myElement.textContent = text;
  if (classes) myElement.classList = classes;
  parent.appendChild(myElement);
  return myElement;
};

const displayAllUser = (users) => {
  if (!users.length) {
    const tr = createElement(bodyData, "tr", "no user yet", "text-center");
    console.log(tr);
  }
};

displayAllUser(allUsers);
