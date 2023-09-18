const productModel = require("../db/models/product.model");
class Product {
  //show All products
  static showAll = async (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  //show active product
  static showActiveProducts = async (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  //show inactive product
  static showInactiveProducts = async (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  //show single product
  static showSingleProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const productData = await productModel.findById(id);
      res.render("showSingle", {
        pageTitle: "show Product",
        product: productData,
        hasDiscount: productData.newPrice,
        classDiscount: productData.newPrice ? "discount" : "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  //add product
  static addProduct = (req, res) => {
    res.render("add", {
      pageTitle: "Product App - addProduct",
    });
  };

  static addProductLogic = async (req, res) => {
    try {
      const product = req.body;
      if (product.discount != 0)
        product.newPrice = (
          (1 - product.discount / 100) *
          product.price
        ).toFixed(2);
      console.log(product);
      const newProduct = new productModel(product);
      await newProduct.save();
      res.redirect("/");
    } catch (e) {
      console.log(e);
      res.render("add", {
        errors: e.errors,
        pageTitle: "add product Error",
        product: req.body,
      });
    }
  };

  //edit product
  static editProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const productData = await productModel.findById(id);
      res.render("edit", {
        pageTitle: "edit Product",
        product: productData,
        isActive: productData.status == "active",
      });
    } catch (edit) {
      console.log(e);
    }
  };

  static editProductLogic = async (req, res) => {
    try {
      const { id } = req.params;
      const newProduct = {
        ...req.body,
        newPrice: req.body.price * (1 - req.body.discount / 100),
      };
      console.log(newProduct);
      await productModel.findByIdAndUpdate(id, newProduct, {
        runValidators: true,
      });
      res.redirect("/");
    } catch (e) {
      console.log(e);
      res.render("edit", {
        errors: e.errors,
        pageTitle: "edit product Error",
        product: req.body,
      });
    }
  };

  //edit status product
  static editStatusProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const productData = await productModel.findById(id);
      if (productData.status == "active") {
        await productModel.findByIdAndUpdate(id, { status: "inactive" });
      } else {
        await productModel.findByIdAndUpdate(id, { status: "active" });
      }
      const previousPage = req.headers.referer || "/";
      res.redirect(previousPage);
    } catch (e) {
      console.log(e);
    }
  };

  //delete product
  static deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await productModel.findByIdAndDelete(id);
      res.redirect("/");
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = Product;
