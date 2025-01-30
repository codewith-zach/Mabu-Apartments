const { PrismaClient } = require("@prisma/client")
const { prompt } = require("enquirer")

const prisma = new PrismaClient()

async function clearDatabase() {
  console.log("WARNING: This script will delete all data from the database.")
  console.log("This action cannot be undone.")

  const { confirm } = await prompt({
    type: "confirm",
    name: "confirm",
    message: "Are you sure you want to proceed?",
  })

  if (!confirm) {
    console.log("Operation cancelled.")
    return
  }

  try {
    // Ensure the Prisma client is connected
    await prisma.$connect()

    // Delete all data from each table
    await prisma.review.deleteMany()
    console.log("Reviews deleted.")
    await prisma.availability.deleteMany()
    console.log("Availabilities deleted.")
    await prisma.booking.deleteMany()
    console.log("Bookings deleted.")
    await prisma.room.deleteMany()
    console.log("Rooms deleted.")
    await prisma.roomType.deleteMany()
    console.log("Room types deleted.")
    await prisma.user.deleteMany()
    console.log("Users deleted.")

    console.log("All data has been cleared from the database.")
  } catch (error) {
    console.error("An error occurred while clearing the database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

clearDatabase().catch((error) => {
  console.error("Unhandled error:", error)
  process.exit(1)
})

