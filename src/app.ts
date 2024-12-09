import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import response from "./utils/response";

// ? Import Routers di bawah. contoh
// import {UserRouter} from "./routers/userRouter"
// dst

const PORT = process.env.PORT || 8082;

class App {
    readonly app: Application;

    constructor() {
        this.app = express();
        this.configure();
        this.routes();
        this.errorHandler();
    }

    private configure(): void {
        this.app.use(cors());
        this.app.use(express.json());
        // middleware for direct access
        // this.app.use("/", express.static(path.join(__dirname, "../public")));
    }

    private routes(): void {
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).send("<h1>MINPRO API</h1>");
        });

        // ? definisikan router yang nanti digunkaan di app.use. contoh:
        // const userRouter = new UserRouter();

        // ? penggunaan router yg sudah didefinisikan. contoh:
        // this.app.use("/user", userRouter.getRouter());
    }

    private errorHandler(): void {
        this.app.use(
            (error: any, req: Request, res: Response, next: NextFunction) => {
                response.error(res, error.message, error.rc, error.error);
            }
        );
    }

    public start(): void {
        this.app.listen(PORT, () => {
            console.log("MINPRO API RUNNING ", PORT);
        });
    }
}

export default new App();
