
export default{
    signUpUser:(body, token:string, token_expiry:Date, hashedPassword:string) => [
        body.email,
        body.first_name,
        body.last_name,
        hashedPassword,
        token,
        token_expiry
    ]
}