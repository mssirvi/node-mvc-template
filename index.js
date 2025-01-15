import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initializeMiddleware();
        this.initializeRoutes();
        this.connectToDatabase();
        this.startServer();
    }
    initializeMiddleware() {
        this.app.use(bodyParser.json());
    }

    initializeRoutes() {
        this.app.use('/', routes);
    }

    connectToDatabase() {
        mongoose.connect(this.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }

}
new Server();