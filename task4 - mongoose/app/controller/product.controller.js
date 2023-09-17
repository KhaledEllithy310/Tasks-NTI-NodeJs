const DealWithJson = require("../helper/dealWithJson.helper");

class Product {
  //show All products
  static showAll = (req, res) => {
    let allProducts = DealWithJson.readFromJSON();
    if (req.query.termSearch) {
      allProducts = Product.searchProducts(req, res, allProducts);
    }
    res.render("allProducts", {
      pageTitle: "All Products",
      allProducts,
      hasProducts: allProducts.length,
      classDiscount: "class = 'discount'",
    });
  };

  //show active product
  static showActiveProducts = (req, res) => {
    const allProducts = DealWithJson.readFromJSON();
    let activeProducts = allProducts.filter((item) => item.status == "active");
    if (req.query.termSearch) {
      activeProducts = Product.searchProducts(req, res, activeProducts);
    }
    res.render("activeProducts", {
      pageTitle: "Active Products",
      allProducts: activeProducts,
      hasProducts: activeProducts.length,
    });
  };

  //show inactive product
  static showInactiveProducts = (req, res) => {
    const allProducts = DealWithJson.readFromJSON();
    console.log(allProducts);
    let inactiveProducts = allProducts.filter(
      (item) => item.status == "inactive"
    );
    if (req.query.termSearch) {
      inactiveProducts = Product.searchProducts(req, res, inactiveProducts);
    }
    res.render("inactiveProducts", {
      pageTitle: "Inactive Products",
      allProducts: inactiveProducts,
      hasProducts: inactiveProducts.length,
    });
  };

  //show single product
  static showSingleProduct = (req, res) => {
    const { id } = req.params;
    const allProducts = DealWithJson.readFromJSON();
    const index = allProducts.findIndex((item) => item.id == id);
    res.render("showSingle", {
      pageTitle: "show Product",
      product: allProducts[index],
      hasDiscount: allProducts[index].newPrice,
      classDiscount: allProducts[index].newPrice ? "discount" : "",
    });
  };

  //add product
  static addProduct = (req, res) => {
    res.render("add", {
      pageTitle: "Product App - addProduct",
    });
  };

  static addProductLogic = (req, res) => {
    const allProducts = DealWithJson.readFromJSON();
    const product = { id: Date.now(), ...req.body };
    if (product.discount != 0)
      product.newPrice = ((1 - product.discount / 100) * product.price).toFixed(
        2
      );
    allProducts.push(product);
    DealWithJson.writeToJSON(allProducts);
    res.redirect("/");
  };

  //edit product
  static editProduct = (req, res) => {
    const { id } = req.params;
    const allProducts = DealWithJson.readFromJSON();
    const index = allProducts.findIndex((item) => item.id == id);
    if (index == -1) res.send("Product not found");
    res.render("edit", {
      pageTitle: "edit Product",
      product: allProducts[index],
      isActive: allProducts[index].status == "active",
    });
  };

  static editProductLogic = (req, res) => {
    const { id } = req.params;
    const allProducts = DealWithJson.readFromJSON();
    const index = allProducts.findIndex((item) => item.id == id);
    if (index == -1) res.send("Product not found");
    allProducts[index] = { ...allProducts[index], ...req.body };
    DealWithJson.writeToJSON(allProducts);
    res.redirect("/");
  };

  //edit status product
  static editStatusProduct = (req, res) => {
    const { id } = req.params;
    const allProducts = DealWithJson.readFromJSON();
    const index = allProducts.findIndex((item) => item.id == id);
    if (allProducts[index].status == "active") {
      allProducts[index].status = "inactive";
      DealWithJson.writeToJSON(allProducts);
      Product.showActiveProducts(req, res);
    } else {
      allProducts[index].status = "active";
      DealWithJson.writeToJSON(allProducts);
      Product.showInactiveProducts(req, res);
    }
    // res.redirect("/");
  };

  //delete product
  static deleteProduct = (req, res) => {
    const { id } = req.params;
    const allProducts = DealWithJson.readFromJSON();
    const index = allProducts.findIndex((item) => item.id == id);
    allProducts.splice(index, 1);
    DealWithJson.writeToJSON(allProducts);
    res.redirect("/");
  };

  //search for products
  static searchProducts = (req, res, data) => {
    const searchTerm = req.query.termSearch;
    const allProducts = data;
    console.log("searchTerm", typeof allProducts[0].id);
    console.log(searchTerm);
    if (allProducts && searchTerm) {
      const filteredProducts = allProducts.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toString().includes(searchTerm)
        );
      });
      return filteredProducts;
    }
  };
}

module.exports = Product;
