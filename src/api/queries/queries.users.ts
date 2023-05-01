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
       WHERE products.product_id = $1 AND user_id = $2 AND orders.order_id = $3
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
    `,

    fetchAuserOrder:`
        SELECT 
            id,
            order_id,
            product_id,
            quantity,
            status
        FROM orders
        WHERE user_id = $1 
    
    `,

    trackOrder:`
        SELECT order_id, product_id, status
        FROM orders
        WHERE order_id = $2 AND user_id = $1
    `,

    cancelOrder: `
            UPDATE orders
            SET updated_at = NOW(),
                is_cancelled = true
            WHERE user_id = $1 AND order_id = $2
    `,
    deleteOrder: `
            UPDATE orders
            SET updated_at = NOW(),
                is_deleted = true
            WHERE user_id = $1 AND order_id = $2
    `,
    shipOrders: `
        INSERT INTO deliveries(
            user_id,
            order_id,
            product_id,
            status)
        VALUES ($1, $2, $3, 'ongoing')
        `,
    updateOrderStatus:`
        UPDATE orders
        SET updated_at = NOW(),
            status = 'shipped'
        WHERE user_id = $1 AND product_id = $2 AND order_id = $3
    `,
    fetchOrdersById: `
            SELECT 
                id, 
                user_id,
                order_id,
                product_id,
                size,
                quantity,
                status,
                is_cancelled
            FROM orders
            WHERE user_id = $1 AND product_id = $2 AND order_id = $3 
    `
};