import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ businessId: string }> } // params is now a Promise
) {
  try {
    // Await the params object
    const { businessId } = await params;
    
    console.log(`📸 Fetching gallery images for business: ${businessId}`);
    
    // Fetch gallery images for this business
    const galleryImages = await prisma.galleryImage.findMany({
      where: {
        businessId: businessId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log(`✅ Found ${galleryImages.length} gallery images`);
    
    return NextResponse.json({
      success: true,
      data: galleryImages,
      count: galleryImages.length,
      message: 'Gallery images fetched successfully'
    });
    
  } catch (error: any) {
    console.error('❌ Error fetching gallery images:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch gallery images',
      message: error.message,
      data: []
    }, { status: 500 });
  }
}