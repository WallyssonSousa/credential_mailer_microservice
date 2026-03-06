import { Router } from "express";
import { buildSendCredentialsController } from "../../container";

export const routes = Router();

routes.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
});

routes.post('/api/send-credentials', async (req, res) => {
    const controller = await buildSendCredentialsController();
    return controller.handle(req, res);
})