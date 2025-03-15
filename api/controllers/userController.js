import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
	try {
		const { image, name, bio, age, gender, genderPreference } = req.body;

		// Prepare the data to update
		const updatedData = { name, bio, age, gender, genderPreference };

		// Only process image if it's a new base64 image
		if (image && image.startsWith("data:image")) {
			try {
				// Add more debug information
				console.log("Starting Cloudinary upload...");

				// Explicitly set the upload parameters
				const uploadResponse = await cloudinary.uploader.upload(image, {
					timeout: 120000, // 2 minute timeout
					resource_type: "auto", // Let Cloudinary detect the type
					folder: "user-profiles",
					transformation: [
						{ width: 800, height: 800, crop: "limit", quality: "auto" }
					]
				});

				console.log("Cloudinary upload successful:", uploadResponse.secure_url);
				updatedData.image = uploadResponse.secure_url;
			} catch (error) {
				console.error("Cloudinary upload error details:", error);

				// More helpful error message
				return res.status(400).json({
					success: false,
					message: "Image upload failed. Please try a different image or format.",
					error: error.message
				});
			}
		}

		// Update user in database
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			updatedData,
			{ new: true }
		).select("-password");

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found"
			});
		}

		res.status(200).json({
			success: true,
			user: updatedUser
		});
	} catch (error) {
		console.log("Error in updateProfile: ", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message
		});
	}
};
