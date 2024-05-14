import express from 'express';

const historyRouter = express.Router();



historyRouter.route('/').get();

export default historyRouter;