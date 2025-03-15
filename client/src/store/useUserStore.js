import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set) => ({
	loading: false,

	updateProfile: async (data) => {
		try {
			set({ loading: true });

			// Don't modify the original data
			const profileData = { ...data };

			// Check if image unchanged (URL rather than base64)
			const currentUser = useAuthStore.getState().authUser;
			if (profileData.image === currentUser.image && !profileData.image.startsWith('data:image')) {
				// If image is unchanged and already a URL, don't send it again
				delete profileData.image;
			}

			console.log("Sending profile update request...");
			const res = await axiosInstance.put("/users/update", profileData);

			if (res.data && res.data.success) {
				useAuthStore.getState().setAuthUser(res.data.user);
				toast.success("Profile updated successfully");
			} else {
				throw new Error("Invalid server response");
			}
		} catch (error) {
			console.error("Profile update error:", error);

			// Better error handling with more specific messages
			if (error.response?.status === 413) {
				toast.error("Image is too large. Please use a smaller image.");
			} else if (error.response?.status === 400 && error.response.data?.message?.includes("image")) {
				toast.error(error.response.data.message || "Image upload failed. Please try a different image.");
			} else {
				toast.error(error.response?.data?.message || "Failed to update profile");
			}
		} finally {
			set({ loading: false });
		}
	},
}));

// Helper function to compress images
const compressImage = (base64Image) => {
	return new Promise((resolve, reject) => {
		const img = new Image();

		img.onload = () => {
			try {
				// Create canvas for resizing
				const canvas = document.createElement('canvas');
				const MAX_WIDTH = 800;
				const MAX_HEIGHT = 800;
				let width = img.width;
				let height = img.height;

				// Calculate new dimensions while maintaining aspect ratio
				if (width > height) {
					if (width > MAX_WIDTH) {
						height = Math.round(height * MAX_WIDTH / width);
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width = Math.round(width * MAX_HEIGHT / height);
						height = MAX_HEIGHT;
					}
				}

				canvas.width = width;
				canvas.height = height;

				// Draw and export as JPEG with reduced quality
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);
				const dataUrl = canvas.toDataURL('image/jpeg', 0.6); // 60% quality
				resolve(dataUrl);
			} catch (error) {
				reject(error);
			}
		};

		img.onerror = (error) => {
			reject(error);
		};

		img.src = base64Image;
	});
};