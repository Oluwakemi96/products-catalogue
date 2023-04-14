export default {
    addProducts: `
        INSERT INTO products(
            category,
            sizes,
            product_image,
            status,
            quantity,
            is_deleted,
            description
        )
        VALUES($1, $2, $3, $4, $5, false, $6)
        RETURNING *
    `,

    updateProductQuantity:`
        UPDATE products
        SET updated_at = NOW(),
            quantity = $2
        WHERE product_id = $1
    `,
}