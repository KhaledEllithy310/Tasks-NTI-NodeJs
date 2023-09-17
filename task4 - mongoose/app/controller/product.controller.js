const productModel = require("../db/models/product.model");
class Product {
  //show All products
  static showAll = async (req, res) => {
    let allProducts;

    if (req.query.termSearch) {
      const searchKey = req.query.termSearch;
      const searchQuery = { name: { $regex: searchKey, $options: "i" } };
      allProducts = await productModel.find(searchQuery);
    } else allProducts = await productModel.find();
    // console.log(allProducts);
    res.render("allProducts", {
      pageTitle: "All Products",
      allProducts,
      hasProducts: allProducts.length,
    });
  };

  //show active product
  static showActiveProducts = async (req, res) => {
    let activeProducts;

    if (req.query.termSearch) {
      const searchKey = req.query.termSearch;
      const searchQuery = {
        status: "active",
        name: { $regex: searchKey, $options: "i" },
      };
      activeProducts = await productModel.find(searchQuery);
    } else activeProducts = await productModel.find({ status: "active" });
    res.render("activeProducts", {
      pageTitle: "Active Products",
      allProducts: activeProducts,
      hasProducts: activeProducts.length,
    });
  };

  //show inactive product
  static showInactiveProducts = async (req, res) => {
    let inactiveProducts;

    if (req.query.termSearch) {
      const searchKey = req.query.termSearch;
      const searchQuery = {
        status: "inactive",
        name: { $regex: searchKey, $options: "i" },
      };
      inactiveProducts = await productModel.find(searchQuery);
    } else {
      inactiveProducts = await productModel.find({ status: "inactive" });
    }

    res.render("inactiveProducts", {
      pageTitle: "Inactive Products",
      allProducts: inactiveProducts,
      hasProducts: inactiveProducts.length,
    });
  };

  //show single product
  static showSingleProduct = async (req, res) => {
    const { id } = req.params;
    const productData = await productModel.findById(id);
    res.render("showSingle", {
      pageTitle: "show Product",
      product: productData,
      hasDiscount: productData.newPrice,
      classDiscount: productData.newPrice ? "discount" : "",
    });
  };

  //add product
  static addProduct = (req, res) => {
    res.render("add", {
      pageTitle: "Product App - addProduct",
    });
  };

  static addProductLogic = async (req, res) => {
    const product = req.body;
    if (product.discount != 0)
      product.newPrice = ((1 - product.discount / 100) * product.price).toFixed(
        2
      );
    console.log(product);
    const newProduct = new productModel(product);
    await newProduct.save();
    res.redirect("/");
  };

  //edit product
  static editProduct = async (req, res) => {
    const { id } = req.params;
    const productData = await productModel.findById(id);
    res.render("edit", {
      pageTitle: "edit Product",
      product: productData,
      isActive: productData.status == "active",
    });
  };

  static editProductLogic = async (req, res) => {
    const { id } = req.params;
    await productModel.findByIdAndUpdate(id, req.body);
    res.redirect("/");
  };

  //edit status product
  static editStatusProduct = async (req, res) => {
    const { id } = req.params;
    const productData = await productModel.findById(id);
    if (productData.status == "active") {
      await productModel.findByIdAndUpdate(id, { status: "inactive" });
    } else {
      await productModel.findByIdAndUpdate(id, { status: "active" });
    }
    const previousPage = req.headers.referer || "/";
    res.redirect(previousPage);
  };

  //delete product
  static deleteProduct = async (req, res) => {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.redirect("/");
  };
}

module.exports = Product;
