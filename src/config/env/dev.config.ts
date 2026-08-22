import { access } from "fs";

export default ()=>({
    DB_URL: {
        url:process.env.DB_URL,
    },
    access:{
        secure:process.env.SECURE,
    },
    port: process.env.PORT
})