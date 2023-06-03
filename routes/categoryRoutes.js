import express from 'express';
import { isAdmin } from "../middlewares/authMiddleware.js";
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

// create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

// update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// getall Category
router.get("/get-category",categoryController)

// singlecategory
router.get('/single-category/:slug',singleCategoryController)

// delete
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)
export default router
