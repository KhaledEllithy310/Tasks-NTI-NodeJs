const bodyData = document.querySelector("#bodyData");

const createElement = function (parent, elem, text, classes = null) {
  let myElement = document.createElement(elem);
  myElement.textContent = text;
  if (classes) {
    myElement.classList = classes;
  }
  parent.appendChild(myElement);
  return myElement;
};

const displayUserData = function (userData) {
  userData.forEach((user, index) => {
    // Start Level 1
    const headersArrayLevelOne = Object.keys(user);
    let tr = createElement(bodyData, "tr", null);
    headersArrayLevelOne.forEach((headerText) => {
      if (typeof user[headerText] === "object") {
        // Start Level 2
        let headersObjectLevelTwo = user[headerText];
        let headersArrayLevelTwo = Object.keys(headersObjectLevelTwo);
        headersArrayLevelTwo.forEach((headerText) => {
          if (typeof headersObjectLevelTwo[headerText] === "object") {
            // Start Level 3
            let headerObjectLevelThree = headersObjectLevelTwo[headerText];
            let headersArrayLevelThree = Object.keys(headerObjectLevelThree);
            headersArrayLevelThree.forEach((headerText) => {
              // End Level 3
              createElement(tr, "td", headerObjectLevelThree[headerText]);
            }); //End Level 2
          } else createElement(tr, "td", headersObjectLevelTwo[headerText]);
        }); // End Level 1
      } else createElement(tr, "td", user[headerText]);
    });
  });
};

const fetchData = async function () {
  try {
    const url =
      "https://jsonplaceholder.typicode.com/users?fbclid=IwAR3JPzDDfQbSdlioGjvbqhdYX6ajlAVzt181BaFQH-iACOMq3Hr9HTY8LW0";
    const res = await (await fetch(url)).json();
    console.log(res);
    displayUserData(res);
  } catch (error) {
    console.log(error.message);
  }
};

fetchData();
