import { Request, Response } from 'express';
import {
  createBusinessDB,
  getAllBusinessDB,
  getBusinessByIdDB,
  getBusinessCountDB,
  updateBusinessByIdDB,
  deleteBusinessByIdDB,
  searchBusinessesDB,
  getFeaturedBusinessesDB,
  Business
} from '../models/businessModel';

// Helper functions for type-safe parameter extraction
const getStringParam = (param: any): string | undefined => {
  if (param === undefined || param === null) return undefined;
  if (Array.isArray(param)) return param[0] as string;
  return param as string;
};

const getNumberParam = (param: any, defaultValue: number): number => {
  const strValue = getStringParam(param);
  if (!strValue) return defaultValue;
  const num = parseInt(strValue, 10);
  return isNaN(num) ? defaultValue : num;
};

// CONTROLLER FUNCTIONS - ONLY handle req/res, call models

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const businessData = req.body;
    
    // Validate required fields
    if (!businessData.name || !businessData.ownerId) {
      return res.status(400).json({
        success: false,
        error: 'Name and owner ID are required'
      });
    }
    
    // Convert frontend camelCase to database snake_case WITH ALL REQUIRED FIELDS
    const dbBusinessData = {
      name: businessData.name,
      description: businessData.description || '',
      category: businessData.category || 'General',
      location: businessData.location || '',
      logo: businessData.logo || '',
      cover_image: businessData.coverImage || '',
      contact_phone: businessData.contactPhone || '',
      contact_email: businessData.contactEmail || '',
      website: businessData.website || '',
      owner_id: businessData.ownerId,
      is_verified: businessData.isVerified || false,
      is_featured: businessData.isFeatured || false,
      status: businessData.status || 'PENDING',
      rating: 0,           // Default value for rating
      review_count: 0      // Default value for review_count
    };

    const business = await createBusinessDB(dbBusinessData);
    
    res.status(201).json({
      success: true,
      data: business,
      message: 'Business created successfully'
    });
  } catch (error: any) {
    console.error('Error creating business:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create business',
      message: error.message
    });
  }
};

export const getAllBusinesses = async (req: Request, res: Response) => {
  try {
    // Safely extract query parameters
    const filters = {
      category: getStringParam(req.query.category),
      location: getStringParam(req.query.location),
      isFeatured: getStringParam(req.query.isFeatured),
      limit: getNumberParam(req.query.limit, 100),
      ownerId: getStringParam(req.query.ownerId),
      status: getStringParam(req.query.status) || 'ACTIVE'
    };

    const businesses = await getAllBusinessDB(filters);
    const total = await getBusinessCountDB(filters);

    res.status(200).json({
      success: true,
      data: businesses,
      count: businesses.length,
      total,
      message: 'Businesses fetched successfully'
    });
  } catch (error: any) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch businesses',
      message: error.message
    });
  }
};

export const getBusinessById = async (req: Request, res: Response) => {
  try {
    // Safely extract ID from params
    const id = getStringParam(req.params.id);
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Business ID is required'
      });
    }

    const business = await getBusinessByIdDB(id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }

    res.status(200).json({
      success: true,
      data: business
    });
  } catch (error: any) {
    console.error('Error fetching business:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch business',
      message: error.message
    });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    // Safely extract ID from params
    const id = getStringParam(req.params.id);
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Business ID is required'
      });
    }

    // Convert camelCase to snake_case for database
    const updates: any = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.category !== undefined) updates.category = req.body.category;
    if (req.body.location !== undefined) updates.location = req.body.location;
    if (req.body.logo !== undefined) updates.logo = req.body.logo;
    if (req.body.coverImage !== undefined) updates.cover_image = req.body.coverImage;
    if (req.body.contactPhone !== undefined) updates.contact_phone = req.body.contactPhone;
    if (req.body.contactEmail !== undefined) updates.contact_email = req.body.contactEmail;
    if (req.body.website !== undefined) updates.website = req.body.website;
    if (req.body.isVerified !== undefined) updates.is_verified = req.body.isVerified;
    if (req.body.isFeatured !== undefined) updates.is_featured = req.body.isFeatured;
    if (req.body.status !== undefined) updates.status = req.body.status;

    const business = await updateBusinessByIdDB(id, updates);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }

    res.status(200).json({
      success: true,
      data: business,
      message: 'Business updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating business:', error);
    
    if (error.message === 'No fields to update') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update business',
      message: error.message
    });
  }
};

export const deleteBusiness = async (req: Request, res: Response) => {
  try {
    // Safely extract ID from params
    const id = getStringParam(req.params.id);
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Business ID is required'
      });
    }

    const business = await deleteBusinessByIdDB(id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }

    res.status(200).json({
      success: true,
      data: business,
      message: 'Business deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting business:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete business',
      message: error.message
    });
  }
};

export const searchBusinesses = async (req: Request, res: Response) => {
  try {
    const query = getStringParam(req.query.query);
    const limit = getNumberParam(req.query.limit, 20);
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const businesses = await searchBusinessesDB(query, limit);
    
    res.status(200).json({
      success: true,
      data: businesses,
      count: businesses.length,
      message: 'Search results fetched successfully'
    });
  } catch (error: any) {
    console.error('Error searching businesses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search businesses',
      message: error.message
    });
  }
};

export const getFeaturedBusinesses = async (req: Request, res: Response) => {
  try {
    const limit = getNumberParam(req.query.limit, 10);
    const businesses = await getFeaturedBusinessesDB(limit);
    
    res.status(200).json({
      success: true,
      data: businesses,
      count: businesses.length,
      message: 'Featured businesses fetched successfully'
    });
  } catch (error: any) {
    console.error('Error fetching featured businesses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured businesses',
      message: error.message
    });
  }
};