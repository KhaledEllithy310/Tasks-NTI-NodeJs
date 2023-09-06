const addUserForm = document.querySelector("#addUserForm");
console.log("addUserForm", addUserForm);
let allUsers = [];
const headerForm = ["id", "name", "email", "age", "status"];
const bodyData = document.querySelector("#bodyData");
const singleUser = document.querySelector("#singleUser");

console.log(bodyData);
console.log("bodyData", bodyData);

// function get users from local storage
const readFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
// function set users to local storage
const WriteToLocalStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

// if local storage is empty set into it all users
// if local storage is not empty get users from local storage and update all users
if (localStorage.getItem("allUsers") != null)
  allUsers = readFromLocalStorage("allUsers");
else WriteToLocalStorage("allUsers", allUsers);

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
  WriteToLocalStorage("allUsers", allUsers);
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
  } else {
    users.forEach((user, index) => {
      const tr = createElement(bodyData, "tr", null, null);
      headerForm.forEach((head) => createElement(tr, "td", user[head], null));
      const td = createElement(tr, "td", null, null);
      const delBtn = createElement(
        td,
        "button",
        "Delete",
        "btn btn-outline-danger mx-1"
      );
      const editBtn = createElement(
        td,
        "button",
        "Edit",
        "btn btn-outline-success mx-1"
      );
      const editStatusBtn = createElement(
        td,
        "button",
        "Edit Status",
        "btn btn-outline-success mx-1"
      );
      const showBtn = createElement(
        td,
        "button",
        "Show",
        "btn btn-outline-info mx-1"
      );
      //delete user
      delBtn.addEventListener("click", () => {
        console.log(index);
        users.splice(index, 1);
        WriteToLocalStorage("allUsers", users);
        tr.remove();
      });

      //show user
      showBtn.addEventListener("click", () => {
        let targetUser = users[index];
        WriteToLocalStorage("targetUser", targetUser);
        console.log(singleUser);

        window.location = "show.html";
      });
    });
  }
};
console.log(allUsers);

if (bodyData) {
  displayAllUser(allUsers);
}

if (singleUser) {
  let targetUser = readFromLocalStorage("targetUser");
  headerForm.forEach((head) =>
    createElement(singleUser, "p", ` ${head}: ${targetUser[head]} `, null)
  );
}
