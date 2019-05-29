import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { MentorController } from "./controllers/MentorController";
import { StudentController } from "./controllers/StudentController";
import { CourseController } from "./controllers/CourseController";
import { SprintController } from "./controllers/SprintController";
import { QuestionController } from "./controllers/QuestionController";
import { FeedbackController } from "./controllers/FeedbackController";
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

    @Inject
    private courseController: CourseController;

    @Inject
    private sprintController: SprintController;

    @Inject
    private questionController: QuestionController;

    @Inject
    private feedbackController: FeedbackController;

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
        this.app.use('/api/v1/mentor', this.mentorController.getRoutes());
        this.app.use('/api/v1/student', this.studentController.getRoutes());
        this.app.use('/api/v1/course', this.courseController.getRoutes());
        this.app.use('/api/v1/sprint', this.sprintController.getRoutes());
        this.app.use('/api/v1/question', this.questionController.getRoutes());
        this.app.use('/api/v1/feedback', this.feedbackController.getRoutes());
    }

    public getExpressApp(): express.Application {
        var cors = require('cors');
        this.app.use(cors({ origin: 'http://localhost:8080' }));
        return this.app;

    }
}
