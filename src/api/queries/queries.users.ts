export default{
    fetchAllProducts: `
        SELECT 
            id,
            product_id,
            category,
            sizes,
            product_image,
            status,
            quantity,
            description
        FROM products
        // WHERE (category = $1 OR $1 IS NULL) AND
        // (status = $2 OR $2 IS NULL)
        // ORDER BY created_at DESC
        // OFFSET $3
        // LIMIT $4
    `,
    productsCount:`
        SELECT COUNT(product_id) AS total_count
        FROM products
        WHERE (category = $1 OR $1 IS NULL) AND
        (status = $2 OR $2 IS NULL)
    `,

    fetchAProductById:`
        SELECT 
            id,
            product_id,
            category,
            sizes,
            product_image,
            status,
            quantity,
            description
        FROM products 
        WHERE product_id = $1
    `
}