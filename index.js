const app = require('express')()
const bodyparser = require('body-parser')
const db = require('./config/db')
const ArticleRouter = require('./routes/ArticleRoutes')
const UserRouter = require('./routes/UserRoutes')

app.use(bodyparser.json())

app.use(ArticleRouter)
app.use(UserRouter)



app.listen(3001, () => {
    console.log("Server is running on port 300")
})

