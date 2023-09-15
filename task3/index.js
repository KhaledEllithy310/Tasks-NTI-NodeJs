require("dotenv").config();
const app = require("./app/server");
console.log(process.env);

app.listen(process.env.PORT, () => {
  console.log(`https//localhost:${process.env.PORT}`);
});
