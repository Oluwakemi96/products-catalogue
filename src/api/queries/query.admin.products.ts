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
    `

}