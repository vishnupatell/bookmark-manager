const zod = require("zod");

const signUpZod = zod.object({
    userName: zod.string().email(),
    password: zod.string(),
})

const loginZod = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})

module.exports = {
    signUpZod,
    loginZod
}
