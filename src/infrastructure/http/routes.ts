import { Router } from "express";
import { buildCreateProjectController, buildListProjectsController, buildSendCredentialsController } from "../../container";
import {
  buildUpdateProjectController,
  buildDeleteProjectController
} from "../../container";

export const routes = Router();

routes.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
});

routes.post('/api/send-credentials', async (req, res) => {
    const controller = await buildSendCredentialsController();
    return controller.handle(req, res);
})

routes.post('/api/projects', async (req, res) => {
    const controller = await buildCreateProjectController();
    return controller.handle(req, res);
});

routes.get('/api/projects', async (req, res) => {
    const controller = await buildListProjectsController();
    return controller.handle(req, res);
})

routes.put('/api/projects/:id', async (req, res) => {
    const controller = await buildUpdateProjectController();
    return controller.handle(req, res);
});

routes.delete('/api/projects/:id', async (req, res) => {
    const controller = await buildDeleteProjectController();
    return controller.handle(req, res);
});