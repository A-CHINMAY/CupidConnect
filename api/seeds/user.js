import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const maleNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas"];
const femaleNames = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Lisa"];
const genderPreferences = ["male", "female", "both"];
const bioDescriptors = [
	"Coffee addict", "Cat lover", "Dog person", "Foodie", "Gym rat", "Bookworm", "Movie buff", "Music lover",
	"Travel junkie", "Beach bum", "City slicker", "Outdoor enthusiast", "Netflix binger", "Yoga enthusiast",
	"Craft beer connoisseur", "Sushi fanatic", "Adventure seeker", "Night owl", "Early bird", "Aspiring chef"
];

// Generate a random bio
const generateBio = () => bioDescriptors.sort(() => 0.5 - Math.random()).slice(0, 3).join(" | ");

// Generate a random user with hashed password
const generateRandomUser = async (gender, index) => {
	const names = gender === "male" ? maleNames : femaleNames;
	const name = names[index];
	const age = Math.floor(Math.random() * (45 - 21 + 1) + 21);
	const hashedPassword = await bcrypt.hash("password123", 10);

	return {
		name,
		email: `${name.toLowerCase()}${age}@example.com`,
		password: hashedPassword,
		age,
		gender,
		genderPreference: genderPreferences[Math.floor(Math.random() * genderPreferences.length)],
		bio: generateBio(),
		image: `/${gender}/${index + 1}.jpg`
	};
};

const seedUsers = async () => {
	try {
		console.log("Connecting to MongoDB...");
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		mongoose.connection.on("connected", () => console.log("✅ Connected to MongoDB"));
		mongoose.connection.on("error", (err) => console.error("❌ MongoDB connection error:", err));

		// Check existing users
		const existingUsers = await User.countDocuments();
		console.log(`👀 Existing users before deletion: ${existingUsers}`);

		// Delete all users
		await User.deleteMany({});
		console.log(`🗑️ All users deleted. Remaining count: ${await User.countDocuments()}`);

		// Generate users with async password hashing
		const maleUsers = await Promise.all(maleNames.map((_, i) => generateRandomUser("male", i)));
		const femaleUsers = await Promise.all(femaleNames.map((_, i) => generateRandomUser("female", i)));
		const allUsers = [...maleUsers, ...femaleUsers];

		// Log the generated user data
		console.log("👤 Users to be inserted:", JSON.stringify(allUsers.slice(0, 3), null, 2));

		// Insert users into DB
		const insertedUsers = await User.insertMany(allUsers);
		console.log(`✅ Successfully inserted ${insertedUsers.length} users.`);

	} catch (error) {
		console.error("❌ Error seeding database:", error);
	} finally {
		console.log("🔌 Closing database connection...");
		await mongoose.disconnect();
		console.log("🔌 Database connection closed.");
	}
};

seedUsers();
