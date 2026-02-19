import pool from "../lib/db";

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  logo: string;
  cover_image: string;
  contact_phone: string;
  contact_email: string;
  website: string;
  owner_id: string; // Changed from ownerId to match database
  is_verified: boolean;
  is_featured: boolean;
  status: string;
  rating: number;
  review_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface BusinessFilters {
  category?: string;
  location?: string;
  isFeatured?: string;
  limit?: number;
  ownerId?: string;
  status?: string;
}

// MODEL FUNCTIONS - NO req/res, ONLY database operations

export const createBusinessDB = async (businessData: Omit<Business, 'id' | 'created_at' | 'updated_at'>) => {
  const query = `
    INSERT INTO businesses
    (name, description, category, location, logo, cover_image, contact_phone, contact_email, website, owner_id, is_verified, is_featured, status, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
    RETURNING *;
  `;

  const values = [
    businessData.name,
    businessData.description,
    businessData.category,
    businessData.location,
    businessData.logo,
    businessData.cover_image,
    businessData.contact_phone,
    businessData.contact_email,
    businessData.website,
    businessData.owner_id,
    businessData.is_verified || false,
    businessData.is_featured || false,
    businessData.status || 'PENDING'
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getAllBusinessDB = async (filters: BusinessFilters) => {
  const { category, location, isFeatured, limit = 100, ownerId, status = 'ACTIVE' } = filters;

  const whereConditions: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (status) {
    whereConditions.push(`status = $${paramIndex}`);
    values.push(status);
    paramIndex++;
  }

  if (category) {
    whereConditions.push(`category = $${paramIndex}`);
    values.push(category);
    paramIndex++;
  }

  if (location) {
    whereConditions.push(`LOWER(location) LIKE LOWER($${paramIndex})`);
    values.push(`%${location}%`);
    paramIndex++;
  }

  if (isFeatured === 'true' || isFeatured === 'false') {
    whereConditions.push(`is_featured = $${paramIndex}`);
    values.push(isFeatured === 'true');
    paramIndex++;
  }

  if (ownerId) {
    whereConditions.push(`owner_id = $${paramIndex}`);
    values.push(ownerId);
    paramIndex++;
  }

  const whereClause = whereConditions.length > 0 
    ? `WHERE ${whereConditions.join(' AND ')}` 
    : '';

  // FIXED: Corrected SQL syntax
  const query = `
    SELECT 
      b.*,
      u.name as owner_name,
      u.email as owner_email
    FROM businesses b
    LEFT JOIN users u ON b.owner_id = u.id
    ${whereClause}
    ORDER BY b.created_at DESC
    LIMIT $${paramIndex}
  `;

  values.push(Math.min(limit, 200));
  const { rows } = await pool.query(query, values);

  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    location: row.location,
    logo: row.logo,
    coverImage: row.cover_image,
    contactPhone: row.contact_phone,
    contactEmail: row.contact_email,
    website: row.website,
    rating: row.rating,
    reviewCount: row.review_count,
    isVerified: row.is_verified,
    isFeatured: row.is_featured,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ownerId: row.owner_id,
    owner: row.owner_id ? {
      name: row.owner_name,
      email: row.owner_email
    } : null
  }));
};

export const getBusinessByIdDB = async (id: string) => {
  // FIXED: Corrected table name and column
  const query = `
    SELECT
      b.*,
      u.name as owner_name,
      u.email as owner_email
    FROM businesses b
    LEFT JOIN users u ON b.owner_id = u.id
    WHERE b.id = $1
  `;

  const { rows } = await pool.query(query, [id]);
  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    location: row.location,
    logo: row.logo,
    coverImage: row.cover_image,
    contactPhone: row.contact_phone,
    contactEmail: row.contact_email,
    website: row.website,
    rating: row.rating,
    reviewCount: row.review_count,
    isVerified: row.is_verified,
    isFeatured: row.is_featured,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ownerId: row.owner_id,
    owner: row.owner_id ? {
      name: row.owner_name,
      email: row.owner_email
    } : null
  };
};

export const getBusinessCountDB = async (filters: BusinessFilters) => {
  const { category, location, isFeatured, ownerId, status = 'ACTIVE' } = filters;

  const whereConditions: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (status) {
    whereConditions.push(`status = $${paramIndex}`);
    values.push(status);
    paramIndex++;
  }

  if (category) {
    whereConditions.push(`category = $${paramIndex}`);
    values.push(category);
    paramIndex++;
  }

  if (location) {
    whereConditions.push(`LOWER(location) LIKE LOWER($${paramIndex})`);
    values.push(`%${location}%`);
    paramIndex++;
  }

  if (isFeatured === 'true' || isFeatured === 'false') {
    whereConditions.push(`is_featured = $${paramIndex}`);
    values.push(isFeatured === 'true');
    paramIndex++;
  }

  if (ownerId) {
    whereConditions.push(`owner_id = $${paramIndex}`);
    values.push(ownerId);
    paramIndex++;
  }

  const whereClause = whereConditions.length > 0
    ? `WHERE ${whereConditions.join(' AND ')}`
    : '';
    
  const query = `SELECT COUNT(*) FROM businesses ${whereClause}`;
  const { rows } = await pool.query(query, values);
  return parseInt(rows[0].count);
};

export const updateBusinessByIdDB = async (id: string, updates: Partial<Business>) => {
  const updateFields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id') {
      // Keep snake_case for database columns
      updateFields.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  });

  if (updateFields.length === 0) {
    throw new Error('No fields to update');
  }

  updateFields.push('updated_at = NOW()');
  values.push(id);

  const query = `
    UPDATE businesses 
    SET ${updateFields.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deleteBusinessByIdDB = async (id: string) => {
  const query = `
    UPDATE businesses 
    SET status = 'DELETED', updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `;
  
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const searchBusinessesDB = async (searchTerm: string, limit: number = 20) => {
  const query = `
    SELECT 
      b.*,
      u.name as owner_name,
      u.email as owner_email
    FROM businesses b
    LEFT JOIN users u ON b.owner_id = u.id
    WHERE (
      b.name ILIKE $1 OR 
      b.description ILIKE $1 OR 
      b.category ILIKE $1 OR 
      b.location ILIKE $1
    ) AND b.status = 'ACTIVE'
    ORDER BY b.created_at DESC
    LIMIT $2
  `;
  
  const { rows } = await pool.query(query, [`%${searchTerm}%`, Math.min(limit, 100)]);
  
  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    location: row.location,
    logo: row.logo,
    coverImage: row.cover_image,
    contactPhone: row.contact_phone,
    contactEmail: row.contact_email,
    website: row.website,
    rating: row.rating,
    reviewCount: row.review_count,
    isVerified: row.is_verified,
    isFeatured: row.is_featured,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ownerId: row.owner_id,
    owner: row.owner_id ? {
      name: row.owner_name,
      email: row.owner_email
    } : null
  }));
};

export const getFeaturedBusinessesDB = async (limit: number = 10) => {
  const query = `
    SELECT 
      b.*,
      u.name as owner_name,
      u.email as owner_email
    FROM businesses b
    LEFT JOIN users u ON b.owner_id = u.id
    WHERE b.is_featured = true AND b.status = 'ACTIVE'
    ORDER BY b.rating DESC, b.review_count DESC
    LIMIT $1
  `;
  
  const { rows } = await pool.query(query, [Math.min(limit, 50)]);
  
  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    location: row.location,
    logo: row.logo,
    coverImage: row.cover_image,
    contactPhone: row.contact_phone,
    contactEmail: row.contact_email,
    website: row.website,
    rating: row.rating,
    reviewCount: row.review_count,
    isVerified: row.is_verified,
    isFeatured: row.is_featured,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ownerId: row.owner_id,
    owner: row.owner_id ? {
      name: row.owner_name,
      email: row.owner_email
    } : null
  }));
};