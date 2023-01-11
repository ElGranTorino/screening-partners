import { Router } from "../../deps.ts";

const router = new Router({
    prefix: '/api/v1/auth',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});



export default router;