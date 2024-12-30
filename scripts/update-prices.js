// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient()

async function updatePrices() {
  try {
    // Update Studio Apartment
    await prisma.roomType.update({
      where: { slug: 'studio-apartment' },
      data: { price: 85000 },
    })
    console.log('Updated Studio Apartment price to ₦85,000')

    // Update One Bedroom Apartment
    await prisma.roomType.update({
      where: { slug: 'one-bedroom-apartment' },
      data: { price: 120000 },
    })
    console.log('Updated One Bedroom Apartment price to ₦120,000')

    // Update Two Bedroom Apartment
    await prisma.roomType.update({
      where: { slug: 'two-bedroom-apartment' },
      data: { price: 180000 },
    })
    console.log('Updated Two Bedroom Apartment price to ₦180,000')

    console.log('Successfully updated all room prices')
  } catch (error) {
    console.error('Error updating prices:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updatePrices()