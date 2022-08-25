import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./config/data-source";
import routes from "./routes";
import * as passport from "passport";
import PassportStrategy from "./config/passport";

import * as swaggerUI from "swagger-ui-express";
const swaggerJson = require("../public/swagger.json");

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    passport.use(PassportStrategy);
    app.use(passport.initialize());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));
    // register express routes from defined application routes
    app.use(routes);

    app.listen(process.env.PORT || 3000, () =>
      console.log(
        `Express server has started on port ${process.env.PORT || 3000}.`
      )
    );
  })
  .catch((error) => console.log(error));
