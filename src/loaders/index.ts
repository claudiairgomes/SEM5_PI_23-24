import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const buildingSchema = {
    // compare with the approach followed in repos and services
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const elevatorSchema = {
    // compare with the approach followed in repos and services
    name: 'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema',
  };

  const floorSchema={
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  }

  const robotSchema={
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  };

  const robotTypeSchema = {
    name: 'robotTypeSchema',
    schema: '../persistence/schemas/robotTypeSchema',
  };

  const taskTypeSchema = {
    name: 'taskTypeSchema',
    schema: '../persistence/schemas/taskTypeSchema',
  };

  const systemUserMapperzSchema = {
    name: 'systemUserSchema',
    schema: '../persistence/schemas/systemUserSchema',
  };


  const passageSchema={
    name: 'passageSchema',
    schema: '../persistence/schemas/passageSchema',
  }

  const roomSchema={
    name: 'roomSchema',
    schema: '../persistence/schemas/roomSchema',
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  }

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }

  const passageController = {
    name: config.controllers.passage.name,
    path: config.controllers.passage.path
  }

  const roomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path
  }

  const robotTypeController = {
    name: config.controllers.robotType.name,
    path: config.controllers.robotType.path,
  };

  const taskTypeController = {
    name: config.controllers.taskType.name,
    path: config.controllers.taskType.path,
  };

  const systemUserController = {
    name: config.controllers.systemUser.name,
    path: config.controllers.systemUser.path,
  };


  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  }



  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  }

  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  }

  const passageRepo = {
    name: config.repos.passage.name,
    path: config.repos.passage.path
  }

  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path
  }

  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path,
  };

  const taskTypeRepo = {
    name: config.repos.taskType.name,
    path: config.repos.taskType.path,
  };

  const systemUserRepo = {
    name: config.repos.systemUser.name,
    path: config.repos.systemUser.path,
  };


  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }



  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  }

  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  }

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }

  const passageService = {
    name: config.services.passage.name,
    path: config.services.passage.path
  }

  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path
  }

  const robotTypeService = {
    name: config.services.robotType.name,
    path: config.services.robotType.path,
  };

  const taskTypeService = {
    name: config.services.taskType.name,
    path: config.services.taskType.path,
  };

  const systemUserService = {
    name: config.services.systemUser.name,
    path: config.services.systemUser.path,
  };


  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      buildingSchema,
      elevatorSchema,
      floorSchema,
      robotSchema,
      passageSchema,
      roomSchema,
      robotTypeSchema,
      taskTypeSchema,
      systemUserMapperzSchema,
    ],
    controllers: [
      roleController,
      buildingController,
      elevatorController,
      floorController,
      robotController,
      passageController,
      roomController,
      robotTypeController,
      taskTypeController,
      systemUserController,
    ],
    repos: [
      roleRepo,
      userRepo,
      buildingRepo,
      elevatorRepo,
      floorRepo,
      robotRepo,
      passageRepo,
      roomRepo,
      robotTypeRepo,
      taskTypeRepo,
      systemUserRepo,
    ],
    services: [
      roleService,
      buildingService,
      elevatorService,
      floorService,
      robotService,
      passageService,
      roomService,
      taskTypeService,
      robotTypeService,
      systemUserService,
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
