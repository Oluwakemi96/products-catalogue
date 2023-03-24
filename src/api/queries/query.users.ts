export default {
    registerUser:`
        INSERT INTO users(
            email, 
            first_name,
            last_name,
            password,
            token,
            token_expiry
         )
         VALUES($1, $2, $3, $4, $5, $6)
         RETURNING *
    `,
    fetchUserByEmail:`
            SELECT
                user_id,
                email,
                first_name,
                last_name,
                is_admin,
                is_email_verified
            FROM users
            WHERE email = $1
    `
}