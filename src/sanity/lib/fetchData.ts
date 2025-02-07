/* eslint-disable @typescript-eslint/no-explicit-any */
// import { client } from './client';

// export const fetchProductData = async () => {
//   const query = `*[_type == "shopProduct"]{
//     _id,
//     title,
//     "slug": slug.current,
//     price,
//     description,
//     "image": image.asset->url,
//     discountPercentage,
//     isFeaturedProduct,
//     stockLevel,
//     category
//   }`;
//   try {
//     const result = await client.fetch(query);
//     return result;
//   } catch (error) {
//     console.error("Error fetching products from Sanity:", error);
//     throw error;
//   }
// };

// export const fetchSingleProduct = async (slug: string) => {
//   const query = `*[_type == "shopProduct" && slug.current == $slug][0]{
//     _id,
//     title,
//     "slug": slug.current,
//     price,
//     description,
//     "image": image.asset->url,
//     discountPercentage,
//     isFeaturedProduct,
//     stockLevel,
//     category
//   }`;
//   try {
//     const result = await client.fetch(query, { slug });
//     return result;
//   } catch (error) {
//     console.error("Error fetching single product from Sanity:", error);
//     throw error;
//   }
// };



// export const fetchSingleProductWithReviews = async (slug: string) => {
//   const query = `*[_type == "shopProduct" && slug.current == $slug][0]{
//     _id,
//     title,
//     "slug": slug.current,
//     price,
//     description,
//     "image": image.asset->url,
//     discountPercentage,
//     isFeaturedProduct,
//     stockLevel,
//     category,
//     "reviews": *[_type == "review" && productId == ^._id] | order(createdAt desc) {
//       _id,
//       text,
//       userName,
//       createdAt
//     }
//   }`;
//   try {
//     const result = await client.fetch(query, { slug });
//     return result;
//   } catch (error) {
//     console.error("Error fetching single product with reviews from Sanity:", error);
//     throw error;
//   }
// };

import { client } from "./client"
import { groq } from "next-sanity"

export const fetchProductData = async () => {
  const query = groq`*[_type == "shopProduct"]{
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "image": image.asset->url,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category
  }`
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error("Error fetching products from Sanity:", error)
    throw error
  }
}

export const fetchSingleProduct = async (slug: string) => {
  const query = groq`*[_type == "shopProduct" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "image": image.asset->url,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category
  }`
  try {
    const result = await client.fetch(query, { slug })
    return result
  } catch (error) {
    console.error("Error fetching single product from Sanity:", error)
    throw error
  }
}

export const fetchSingleProductWithReviews = async (slug: string) => {
  const query = groq`*[_type == "shopProduct" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "image": image.asset->url,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category,
    "reviews": *[_type == "review" && productId == ^._id] | order(createdAt desc) {
      _id,
      text,
      userName,
      createdAt
    }
  }`
  try {
    const result = await client.fetch(query, { slug })
    return result
  } catch (error) {
    console.error("Error fetching single product with reviews from Sanity:", error)
    throw error
  }
}

export const fetchOrders = async () => {
  const query = groq`*[_type == "order"] | order(createdAt desc) {
    _id,
    orderNumber,
    customer,
    shippingAddress,
    items,
    total,
    paymentMethod,
    createdAt
  }`
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error("Error fetching orders from Sanity:", error)
    throw error
  }
}

export const listenToOrders = (callback: (order: any) => void) => {
  const query = groq`*[_type == "order"]`
  return client.listen(query).subscribe(callback)
}

export const fetchOrdersWithProducts = async () => {
  const query = groq`*[_type == "order"] | order(createdAt desc) {
    _id,
    orderNumber,
    customer,
    items[] {
      productId,
      name,
      quantity,
      price,
      "image": *[_type == "shopProduct" && _id == ^.productId][0].image.asset->url
    },
    total,
    status,
    createdAt
  }`
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error("Error fetching orders with products from Sanity:", error)
    throw error
  }
}

export const listenToOrdersWithProducts = (callback: (update: any) => void) => {
  const query = groq`*[_type == "order"]`
  return client.listen(query).subscribe(callback)
}

export const fetchCustomers = async () => {
  // This query gets unique customers from orders and aggregates their data
  const query = groq`*[_type == "order"] {
    "customer": customer {
      firstName,
      lastName,
      email,
      phone
    },
    total,
    _id
  } | order(createdAt desc)`

  try {
    const orders = await client.fetch(query)

    // Group orders by customer email to get unique customers with their total orders and spent
    const customerMap = orders.reduce((acc: any, order: any) => {
      const email = order.customer.email
      if (!acc[email]) {
        acc[email] = {
          ...order.customer,
          _id: email, // Using email as ID since we don't have customer IDs
          totalOrders: 0,
          totalSpent: 0,
        }
      }
      acc[email].totalOrders += 1
      acc[email].totalSpent += order.total || 0
      return acc
    }, {})

    // Convert the map to an array
    return Object.values(customerMap)
  } catch (error) {
    console.error("Error fetching customers from Sanity:", error)
    throw error
  }
}

export const listenToCustomers = (callback: (update: any) => void) => {
  // Listen to orders instead since customers are part of orders
  const query = groq`*[_type == "order"]`
  return client.listen(query).subscribe(() => {
    // Fetch all customers again when orders change
    fetchCustomers().then((customers) => {
      callback({
        type: "update",
        result: customers,
      })
    })
  })
}

export const fetchProducts = async () => {
  const query = groq`*[_type == "shopProduct"] | order(createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    price,
    category,
    stockLevel,
    "image": image.asset->url
  }`
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error("Error fetching products from Sanity:", error)
    throw error
  }
}

export const listenToProducts = (callback: (update: any) => void) => {
  const query = groq`*[_type == "shopProduct"]`
  return client.listen(query).subscribe((update) => {
    if (update.type === "mutation") {
      fetchProducts().then((products) => {
        callback({
          type: update.type,
          result: products,
        })
      })
    }
  })
}




export const fetchSalesData = async () => {
  const query = groq`*[_type == "order"] | order(createdAt desc) {
    total,
    createdAt
  }`
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error("Error fetching sales data from Sanity:", error)
    throw error
  }
}

export const fetchInventoryData = async () => {
  const query = groq`*[_type == "shopProduct"] {
    title,
    stockLevel
  }`
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error("Error fetching inventory data from Sanity:", error)
    throw error
  }
}

export const listenToSalesData = (callback: (update: any) => void) => {
  const query = groq`*[_type == "order"]`
  return client.listen(query).subscribe(() => {
    fetchSalesData().then((salesData) => {
      callback({
        type: "update",
        result: salesData,
      })
    })
  })
}

export const listenToInventoryData = (callback: (update: any) => void) => {
  const query = groq`*[_type == "shopProduct"]`
  return client.listen(query).subscribe(() => {
    fetchInventoryData().then((inventoryData) => {
      callback({
        type: "update",
        result: inventoryData,
      })
    })
  })
}

