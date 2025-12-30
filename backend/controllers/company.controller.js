import {Company} from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import {deleteCache, getCache, setCache} from "../utils/cache.js";

export const registerCompany = async (req, res) => {
  try {
    const {companyName} = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is Required..",
        success: false,
      });
    }

    let company = await Company.findOne({name: companyName});
    if (company) {
      return res.status(400).json({
        message: "You cannot register same company..",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    await deleteCache(`companies:${req.id}`);

    return res.status(201).json({
      message: "company Name register successfully...",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// get all companies

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const cacheKey = `companies:${userId}`;

    // Check cache first
    const cache = await getCache(cacheKey);
    if (cache) {
      return res.status(200).json({
        companies: cache,
        success: true,
        fromCache: true,
      });
    }

    const companies = await Company.find({userId});

    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    await setCache(cacheKey, companies, 600);

    return res.status(200).json({
      companies,
      success: true,
      fromCache: false,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// get companies register by user

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const cacheKey = `company:${companyId}`;

    // Check cache first
    const cache = await getCache(cacheKey);
    if (cache) {
      return res.status(200).json({
        company: cache,
        success: true,
        fromCache: true,
      });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    await setCache(cacheKey, company, 600);

    return res.status(200).json({
      company,
      success: true,
      fromCache: false,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// update company

export const updateCompany = async (req, res) => {
  try {
    const {name, description, website, location} = req.body;

    const file = req.file;
    let logo;

    // Only process file upload if file exists
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    // Only include logo in updateData if it exists
    const updateData = {name, description, website, location};
    if (logo) {
      updateData.logo = logo;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    await deleteCache(`companies:${req.id}`);
    await deleteCache(`company:${req.params.id}`);

    return res.status(200).json({
      message: "Company info updated...",

      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
