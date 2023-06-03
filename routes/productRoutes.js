import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
    brainTreePaymentController,
    braintreeTokenController,
    createProductController, deleteProductController, getProductController
    , getSingleProductController, productCategoryController, productCategoryCountController, productCountController, productFilterController,
    productListController, productPhotoController, relatedProductController, searchProductController, updateProductController
} from '../controllers/productController.js';
import formidable from 'express-formidable';
import { token } from 'morgan';
import braintree from 'braintree';
const router = express.Router();


router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)


router.get("/get-product", getProductController)


router.get("/get-product/:slug", getSingleProductController)

router.get("/product-photo/:pid", productPhotoController)
router.delete("/delete-product/:pid", deleteProductController)


// filter product
router.post('/product-filters', productFilterController)

// product count
router.get("/product-count", productCountController);

// product per page
router.get('/product-list/:page',productListController)


router.get('/search/:keyword',searchProductController);


router.get('/related-product/:pid/:cid',relatedProductController)

router.get('/product-category/:slug/:page',productCategoryController)

// category count
router.get('/product-catcount/:slug',productCategoryCountController)


// payments gateways
// token

router.get('/braintree/token',braintreeTokenController)

// payments

router.post('/braintree/payments',requireSignIn,brainTreePaymentController)
export default router