const router = require("express").Router();
const productController = require("../controller/product.controller");

//show active product
router.get("/ActiveProducts", productController.showActiveProducts);
//show inactive product
router.get("/InactiveProducts", productController.showInactiveProducts);
//show single product
router.get("/show", productController.showSingleProduct);
//add product
router.get("/add", productController.addProduct);
router.post("/add", productController.addProductLogic);
//edit product
router.get("/edit/:id", productController.editProduct);
router.post("/edit/:id", productController.editProduct);
//edit status product
router.get("/edit/:id", productController.editStatusProduct);
//delete product
router.get("/delete/:id", productController.deleteProduct);

module.exports = router;
