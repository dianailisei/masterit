import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as path from "path";

import { MentorController } from "./controllers/MentorController";
import { StudentController } from "./controllers/StudentController";
import { CourseController } from "./controllers/CourseController";
import { SprintController } from "./controllers/SprintController";
import { QuestionController } from "./controllers/QuestionController";
import { FeedbackController } from "./controllers/FeedbackController";
import { GoodPracticeController } from "./controllers/GoodPracticeController";
import { MeetingController } from "./controllers/MeetingController";
import { config, IocContainerConfig } from "./config";
import { Inject } from "typescript-ioc";
import { NotificationController } from "./controllers/NotificationController";
export class App {

    constructor(dbUrl?: string) {
        this.app = express();
        this.config();
        this.mongoConfig(dbUrl);
        this.webPushConfig();
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

    @Inject
    private goodPracticeController: GoodPracticeController;

    @Inject
    private meetingController: MeetingController;

    @Inject
    private notificationController: NotificationController;

    private config(): void {
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        var cors = require('cors');
        this.app.use(cors({ origin: '*' }));
        this.app.use(morgan('dev'));
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

    public webPushConfig() {
        const webpush = require('web-push');

        const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
        const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

        // Replace with your email
        webpush.setVapidDetails('mailto:dianailisei@gmail.com', publicVapidKey, privateVapidKey);
    }

    private routes(): void {
        this.app.use('/api/v1/mentor', this.mentorController.getRoutes());
        this.app.use('/api/v1/student', this.studentController.getRoutes());
        this.app.use('/api/v1/course', this.courseController.getRoutes());
        this.app.use('/api/v1/sprint', this.sprintController.getRoutes());
        this.app.use('/api/v1/question', this.questionController.getRoutes());
        this.app.use('/api/v1/feedback', this.feedbackController.getRoutes());
        this.app.use('/api/v1/goodPractice', this.goodPracticeController.getRoutes());
        this.app.use('/api/v1/meeting', this.meetingController.getRoutes());
        this.app.use('/subscribe', this.notificationController.getRoutes());
    }

    public getExpressApp(): express.Application {
        this.app.use('/uploads', express.static('uploads'));
        this.app.use(express.static(path.join(__dirname, "frontend")))
        return this.app;
    }
}
