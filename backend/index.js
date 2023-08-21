const express = require("express");
const { connection } = require("./db");
const { userRoutes } = require("./routes/userRoutes");
const { notesRoutes } = require("./routes/notesRoutes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express")


const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());


//configuration of swaggerDoc
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Notes-app Swagger",
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ['./routes/*.js'],
}

const openapiSpecification = swaggerJSDoc(options);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));


app.use("/users", userRoutes);
app.use("/notes", notesRoutes);

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(8080, async () => {
    try {
        await connection
        console.log("Connected to server")
    } catch (err) {
        console.log(err)
    }
})