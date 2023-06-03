import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name)
        if (!name) {
            return res.status(401).status({ message: "Name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({ success: true, message: "category already exits" })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "new category created",
            category
        })
        console.log(category)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in category"
        })

    }
}

export const updateCategoryController =async(req,res)=>{
    try {
            const {name} = req.body;
            const {id} = req.params;
            const category = await categoryModel.findByIdAndUpdate(id,{name,
                slug:slugify(name)},
                {new:true})
            res.status(200).send({
                success:true,
                message:'category updated successfully',
                category,
            });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
}
export const categoryController =async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'success while getting all categories',
            category
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all categories'
        })
    }
}
export const singleCategoryController =async(req,res)=>{
    try {
        // const {slug} = req.params;
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'success while getting single categories',
            category
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting single categories'
        })
    }
}
export const deleteCategoryController =async(req,res)=>{
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'success while deleting  categories',
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:'Error while deleting  categories'
        })
    }
}