import React, {
	useState,
	useEffect,
} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import ShoppingCart from "./components/ShoppingCart";

const products = [
	{
		id: 1,
		name: "BMW Car For Toys",
		description:
			" the world's leading manufacturer of premium automobiles and motorcycles, and provider of premium financial and mobility services.",
		price: 199,
		image: require("./assets/images/product-1.png"),
	},
	{
		id: 2,
		name: "FRUITS",
		description:
			"5 Kg Mixed Fresh Fruits Basket Categories: Fresh Fruits, Fruits Tags: 5 Kg Fresh Fruits Basket in Gurgaon, Fresh Fruits Delivery in Belagavi.",
		price: 229,
		image: require("./assets/images/product-2.png"),
	},
	{
		id: 3,
		name: "Vegetable",
		description:
			"Vegetables Seed Combo pack, 40 Different Types Vegitable Seed In A Pack, Hybrid Seed And 100% Germination.",
		price: 99,
		image: require("./assets/images/product-3.png"),
	},
	{
		id: 4,
		name: "Grocery",
	
		description:
			"All grocery products Availability.",
		price: 119,
		image: require("./assets/images/product-4.png"),
	},
	{
		id: 5,
		name: "Kid Toys",
		
		description:
			"Funspot 130Pcs Building Blocks for Kids with Wheel, Smart Activity Fun and Learning Car Truck Train Blocks, Toys for Kids, Building Bricks for Kids, 130pcs, Multicolor -AH011.",
		price: 85,
		image: require("./assets/images/product-5.jpg"),
	},
	{
		id: 6,
		name: "Smart Watch",
	
		description:
			"Sharp and bright display: The 1.69’’ TFT display with 240*280px and 500 nits brightness ensures visual treat every time you look at the watch.",
		price: 149,
		image: require("./assets/images/product-6.png"),
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<h3 className="logo">Welcome</h3>
				<button
					className="btn shopping-cart-btn"
					onClick={() =>
						setCartVisible(true)
					}>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
	
							<p>
								{
									product.description
								}
							</p>
							<span className="product-price">
								{product.price}$
							</span>
							<div className="buttons">
								<button
									className="btn"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;