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
        WHERE (category = $1 OR $1 IS NULL) AND (status = $2 OR $2 IS NULL)
        ORDER BY created_at DESC
        OFFSET $3
        LIMIT $4
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
    `,
    orderAProduct:`
        INSERT INTO orders(
            user_id,
            product_id,
            size,
            quantity
            )
        VALUES ( $1, $2, $3, $4)
        RETURNING *
    `,  

    decreamentProducts:`
    UPDATE products
    SET 
      updated_at = NOW(),
      quantity = p.quantity::int - orders.quantity
    FROM products p
    JOIN orders
    ON p.product_id = orders.product_id
    WHERE products.product_id = $1
    `,

    checkProductStatus:`
        SELECT quantity, status 
        FROM products
        WHERE product_id =$1
    `,

    updateProductStatus:`
       UPDATE products
       SET 
        updated_at = NOW(),
        status = 'sold out'
       WHERE product_id = $1
    `
};