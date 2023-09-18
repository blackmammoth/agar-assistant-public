export { default } from "next-auth/middleware"


// Add other pages here
export const config = { matcher: ["/tasks", "/scheduler", "/stats"] }