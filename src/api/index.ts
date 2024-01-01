import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import elevator from './routes/elevatorRoute';
import floor from './routes/floorRoute';
import robot from './routes/robotRoute';
import passage from './routes/passageRoute';
import room from './routes/roomRoute';
import robotTypeRoute from "./routes/robotTypeRoute";
import taskTypeRoute from "./routes/taskTypeRoute";
import systemUserRoute from "./routes/systemUserRoute";




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
  room(app);
  robotTypeRoute(app);
  taskTypeRoute(app);
  systemUserRoute(app);

	return app
}
