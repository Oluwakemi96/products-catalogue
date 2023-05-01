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
                is_email_verified,
                is_deleted,
                password
            FROM users
            WHERE email = $1
    `,
    fetchUserById:`
        SELECT
            user_id,
            email,
            first_name,
            last_name,
            is_admin,
            is_email_verified,
            is_deleted
        FROM users
        WHERE user_id = $1
    `,
    verifyUserEmail:`
        UPDATE users
        SET updated_at = NOW(),
            is_email_verified = true,
            status = 'active',
            token = null,
            token_expiry = null
        WHERE user_id = $1 
    `,
    fetchUserByToken:`
         SELECT
            user_id,
            email,
            first_name,
            last_name,
            token,
            token_expiry
         FROM users
         WHERE token = $1
    `,
    updateUserToken:`
        UPDATE users
        SET updated_at = NOW(),
            token = $2,
            token_expiry = $3
        WHERE user_id = $1
    `,
    resetPassword:`
       UPDATE users
       SET updated_at = NOW(),
           password = $2,
           token = null,
           token_expiry = null
       WHERE user_id = $1
    `,
}