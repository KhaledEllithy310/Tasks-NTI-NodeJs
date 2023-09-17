const router = require("express").Router();
const productController = require("../controller/product.controller");

//show All Products
router.get("/", productController.showAll);
//show active product
router.get("/activeProducts", productController.showActiveProducts);
//show inactive product
router.get("/inactiveProducts", productController.showInactiveProducts);
//show single product
router.get("/show/:id", productController.showSingleProduct);
//add product
router.get("/add", productController.addProduct);
router.post("/add", productController.addProductLogic);
//edit product
router.get("/edit/:id", productController.editProduct);
router.post("/edit/:id", productController.editProductLogic);
//edit status product
router.get("/editStatus/:id", productController.editStatusProduct);
//delete product
router.get("/delete/:id", productController.deleteProduct);

module.exports = router;
