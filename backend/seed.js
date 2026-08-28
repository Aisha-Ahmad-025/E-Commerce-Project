import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { User } from "./models/user.model.js";
import { Product } from "./models/product.model.js";
import { Order } from "./models/order.model.js";

const seedDatabase = async () => {
	try {
		await connectDB();

		await Promise.all([
			User.deleteMany({}),
			Product.deleteMany({}),
			Order.deleteMany({})
		]);

		const password = await bcrypt.hash("Password123!", 10);
		const [, customer] = await User.create([
			{
				name: "Velora Admin",
				email: "admin@velora.test",
				password,
				role: "admin",
				verified: true
			},
			{
				name: "Aisha Customer",
				email: "customer@velora.test",
				password,
				role: "user",
				verified: true
			},
			{
				name: "Hamza Shopper",
				email: "hamza@velora.test",
				password,
				role: "user",
				verified: true
			},
			{
				name: "Sara Customer",
				email: "sara@velora.test",
				password,
				role: "user",
				verified: true
			}
		]);

		const products = await Product.create([
			{
				name: "Minimal Leather Backpack",
				description: "A durable everyday backpack with a padded laptop sleeve.",
				price: 79.99,
				category: "Bags",
				stock: 24,
				imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
				ratings: 4.7,
				numReviews: 18
			},
			{
				name: "Everyday Cotton Hoodie",
				description: "A soft heavyweight cotton hoodie for comfortable daily wear.",
				price: 54.5,
				category: "Clothing",
				stock: 40,
				imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
				ratings: 4.5,
				numReviews: 11
			},
			{
				name: "Ceramic Desk Mug",
				description: "A hand-finished ceramic mug that holds your morning coffee in style.",
				price: 18,
				category: "Home",
				stock: 35,
				imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
				ratings: 4.8,
				numReviews: 26
			},
			{
				name: "Wireless Noise-Canceling Headphones",
				description: "Comfortable over-ear headphones with clear sound and long battery life.",
				price: 129.99,
				category: "Electronics",
				stock: 15,
				imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
				ratings: 4.6,
				numReviews: 32
			},
			{
				name: "Classic Running Shoes",
				description: "Lightweight running shoes with breathable mesh and cushioned soles.",
				price: 89.99,
				category: "Footwear",
				stock: 20,
				imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
				ratings: 4.4,
				numReviews: 15
			},
			{
				name: "Stainless Steel Water Bottle",
				description: "Insulated reusable bottle that keeps drinks cold throughout the day.",
				price: 24.99,
				category: "Accessories",
				stock: 50,
				imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
				ratings: 4.7,
				numReviews: 21
			},
			{
				name: "Modern Table Lamp",
				description: "A warm LED table lamp with a clean silhouette for desks and bedrooms.",
				price: 42.75,
				category: "Home",
				stock: 18,
				imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
				ratings: 4.3,
				numReviews: 9
			},
			{
				name: "Slim Mechanical Keyboard",
				description: "Compact mechanical keyboard with tactile switches and a durable frame.",
				price: 74.99,
				category: "Electronics",
				stock: 12,
				imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
				ratings: 4.6,
				numReviews: 14
			},
			{
				name: "Linen Throw Pillow",
				description: "Textured linen pillow cover that adds a soft, relaxed touch to any room.",
				price: 22.5,
				category: "Home",
				stock: 30,
				imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
				ratings: 4.5,
				numReviews: 7
			},
			{
				name: "Everyday Canvas Sneakers",
				description: "Versatile canvas sneakers with flexible soles for casual everyday outfits.",
				price: 49.95,
				category: "Footwear",
				stock: 27,
				imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
				ratings: 4.2,
				numReviews: 12
			}
		]);

		await Order.create({
			userId: customer._id,
			items: [
				{ productId: products[0]._id, qty: 1, price: products[0].price },
				{ productId: products[2]._id, qty: 2, price: products[2].price }
			],
			totalAmount: products[0].price + products[2].price * 2,
			address: {
				fullName: customer.name,
				street: "42 Market Street",
				city: "Lahore",
				postalCode: "54000",
				country: "Pakistan"
			},
			paymentId: "seed-payment-001",
			status: "Delivered"
		});

		console.log("Database seeded successfully.");
		console.log("Admin login: admin@velora.test / Password123!");
		console.log("Customer login: customer@velora.test / Password123!");
	} catch (error) {
		console.error("Database seeding failed:", error.message);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
	}
};

seedDatabase();
