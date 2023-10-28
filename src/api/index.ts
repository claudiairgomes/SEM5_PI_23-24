import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import elevator from './routes/elevatorRoute';
import floor from './routes/floorRoute';
import robot from './routes/robotRoute';
import passage from './routes/passageRoute';




export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	building(app);
  floor(app);
  robot(app);
  elevator(app);
  passage(app);

	return app
}
