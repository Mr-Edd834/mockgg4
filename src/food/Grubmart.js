// Supermarket items and groceries
const grubmartItems = [
  {
    id: 1,
    name: "Cooking Oil 2L",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29va2luZyUyMG9pbHxlbnwwfHwwfHx8MA%3D%3D",
    price: 450,
    category: "GrubMart",
    rating: 4.6,
    prepTime: "Instant",
    description: "Premium quality cooking oil for all your kitchen needs. Perfect for frying and cooking."
  },
  {
    id: 2,
    name: "Dish Soap 500ml",
    image: "https://images.unsplash.com/photo-1631889992765-b36bdc772d9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGlzaCUyMHNvYXB8ZW58MHx8MHx8fDA%3D",
    price: 180,
    category: "GrubMart",
    rating: 4.7,
    prepTime: "Instant",
    description: "Extra strength dish soap that cuts through grease and leaves dishes sparkling clean."
  },
  {
    id: 3,
    name: "Rice 5kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    price: 800,
    category: "GrubMart",
    rating: 4.8,
    prepTime: "Instant",
    description: "Premium quality long grain rice. Perfect for pilau, biryani, and everyday meals."
  },
  {
    id: 4,
    name: "Laundry Detergent 1kg",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV0ZXJnZW50fGVufDB8fDB8fHww",
    price: 350,
    category: "GrubMart",
    rating: 4.5,
    prepTime: "Instant",
    description: "Powerful cleaning formula that removes tough stains and keeps clothes fresh and bright."
  },
  {
    id: 5,
    name: "Sugar 2kg",
    image: "https://images.unsplash.com/photo-1571958195924-8da5c5e9f5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VnYXJ8ZW58MHx8MHx8fDA%3D",
    price: 280,
    category: "GrubMart",
    rating: 4.7,
    prepTime: "Instant",
    description: "Pure white refined sugar. Essential for your tea, baking, and cooking needs."
  },
  {
    id: 6,
    name: "Toilet Paper 12 Rolls",
    image: "https://images.unsplash.com/photo-1584991729449-46b3013993f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9pbGV0JTIwcGFwZXJ8ZW58MHx8MHx8fDA%3D",
    price: 520,
    category: "GrubMart",
    rating: 4.6,
    prepTime: "Instant",
    description: "Soft and strong toilet paper, premium quality for comfort and value. Pack of 12 rolls."
  },
  {
    id: 7,
    name: "Flour 2kg",
    image: "https://images.unsplash.com/photo-1628690795339-c2dd8e4c5f86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zmxvd3IlMjBiYWd8ZW58MHx8MHx8fDA%3D",
    price: 220,
    category: "GrubMart",
    rating: 4.7,
    prepTime: "Instant",
    description: "All-purpose wheat flour perfect for baking chapati, mandazi, cakes, and bread."
  },
  {
    id: 8,
    name: "Body Soap Bar Pack",
    image: "https://images.unsplash.com/photo-1588015732252-f7c39c5c57d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keSUyMHNvYXB8ZW58MHx8MHx8fDA%3D",
    price: 250,
    category: "GrubMart",
    rating: 4.5,
    prepTime: "Instant",
    description: "Gentle moisturizing soap bars that keep your skin clean, soft and refreshed. Pack of 4."
  },
  {
    id: 9,
    name: "Milk 1L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsayUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D",
    price: 150,
    category: "GrubMart",
    rating: 4.8,
    prepTime: "Instant",
    description: "Fresh pasteurized milk, perfect for tea, coffee, cereals, and cooking. Rich in calcium."
  },
  {
    id: 10,
    name: "Salt 500g",
    image: "https://images.unsplash.com/photo-1599948128020-9a44e30d1e33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FsdHxlbnwwfHwwfHx8MA%3D%3D",
    price: 50,
    category: "GrubMart",
    rating: 4.6,
    prepTime: "Instant",
    description: "Pure refined iodized salt. Essential for cooking and food preservation. Healthy and pure."
  }
];

export default grubmartItems;

