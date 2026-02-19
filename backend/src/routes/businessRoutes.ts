import express from 'express';
import { createBusiness, deleteBusiness, getAllBusinesses, getBusinessById, getFeaturedBusinesses, searchBusinesses, updateBusiness } from '../controllers/business.controller';


const router = express.Router();

router.post('/', createBusiness);
router.get('/', getAllBusinesses);
router.get('/search', searchBusinesses);
router.get('/featured', getFeaturedBusinesses);
router.get('/:id', getBusinessById);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

export default router;