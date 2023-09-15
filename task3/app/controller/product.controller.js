const DealWithJson = require("../helper/dealWithJson.helper");

class Product {
  //show active product
  static showActiveProducts = (req, res) => {
    const allProducts = DealWithJson.readFromJSON();
    console.log(allProducts);
    const activeProducts = allProducts.filter(
      (item) => item.status == "active"
    );
    res.send(activeProducts);
  };

  //show inactive product
  static showInactiveProducts = (req, res) => {
    const allProducts = DealWithJson.readFromJSON();
    console.log(allProducts);
    const inactiveProducts = allProducts.filter(
      (item) => item.status == "inactive"
    );
    res.send(inactiveProducts);
  };

  //show single product
  static showSingleProduct = (req, res) => {
    const { id } = req.params;
    const allProducts = DealWithJson.readFromJSON();
    const index = allProducts.findIndex((item) => item.id == id);
    res.send(allProducts[index]);
  };
  
  //add product
  static addProduct = (req, res) => {};
  static addProductLogic = (req, res) => {};
  //edit product
  static editProduct = (req, res) => {};
  //edit status product
  static editStatusProduct = (req, res) => {};
  //delete product
  static deleteProduct = (req, res) => {};
}

module.exports = Product;
