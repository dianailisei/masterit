import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { MentorController } from "./controllers/MentorController";
import { StudentController } from "./controllers/StudentController";
import { config, IocContainerConfig } from "./config";
import { Inject } from "typescript-ioc";

export class App {

    constructor(dbUrl?: string) {
        this.app = express();

        this.config();
        this.mongoConfig(dbUrl);

        this.routes();
    }

    private app: express.Application;

    @Inject
    private mentorController: MentorController;
    @Inject
    private studentController: StudentController;

    private config(): void {
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));

        IocContainerConfig.configure();
    }

    private mongoConfig(url?: string): void {
        const { db: { host, port, name } } = config;
        const mongoUrl = url || `mongodb://${host}:${port}/${name}`;

        mongoose.set('useFindAndModify', false);
        mongoose.connect(mongoUrl, { useNewUrlParser: true })
            .then(() => {

            }, (error) => {
                console.log('Connection to MongoDB failed. Reason: ')
                console.log(error);
            });
    }

    private routes(): void {
        this.app.use('/api/v1/mentors', this.mentorController.getRoutes());
        this.app.use('/api/v1/students', this.studentController.getRoutes());
    }

    public getExpressApp(): express.Application {
        return this.app;
    }
}