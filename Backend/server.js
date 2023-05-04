import * as dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

// Routes
import authRoutes from './routes/authRoutes.js'
import artistsRoutes from './routes/artistsRoutes.js'
import albumsRoutes from './routes/albumsRoutes.js'
import employeesRoutes from './routes/employeesRoutes.js'
import customersRoutes from './routes/customersRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import tracksRoutes from './routes/tracksRoutes.js'
import invoicesRoutes from './routes/invoicesRoutes.js'
import invoiceItemsRoutes from './routes/invoiceItemsRoutes.js'
import mediaTypesRoutes from './routes/mediaTypesRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

import Album from './models/Album.js'
import Artist from './models/Artist.js'
import Employee from './models/Employee.js'
import Customer from './models/Customer.js'
import Invoice from './models/Invoice.js'
import InvoiceItems from './models/InvoiceItems.js'
import Track from './models/Track.js'
import Genre from './models/Genre.js'
import MediaTypes from './models/MediaTypes.js'

dotenv.config()

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

const app = express()

app.enable('trust proxy');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

//  Apply rate limiting to all routes
app.use(limiter);
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noSniff());

app.use(bodyParser.json());
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin)
            }
            return callback(
                "CORS ERROR origin: " + origin + " No authorization!"
            )
        },
        credentials: true,
    })
)

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

// Routes
app.use("/auth", authRoutes)
app.use("/artists", artistsRoutes)
app.use("/albums", albumsRoutes)
app.use("/employees", employeesRoutes)
app.use("/customers", customersRoutes)
app.use("/genres", genreRoutes)
app.use("/tracks", tracksRoutes)
app.use("/invoices", invoicesRoutes)
app.use("/invoice-items", invoiceItemsRoutes)
app.use("/media-types", mediaTypesRoutes)
app.use("/dashboard", dashboardRoutes)

//Associations
Artist.hasMany(Album,{ foreignKey:'artist_id' })
Album.hasMany(Track,{ foreignKey:'album_id' })
Employee.hasMany(Customer, { foreignKey: 'support_rep_id' })
Employee.hasMany(Employee,{foreignKey:'reports_to' })
Customer.hasMany(Invoice, { foreignKey: 'customer_id' });
Invoice.belongsTo(Customer, { foreignKey: 'customer_id' });
InvoiceItems.belongsTo(Invoice,{ foreignKey: 'invoice_id' })
InvoiceItems.belongsTo(Track, { foreignKey: 'track_id' })
Track.belongsTo(Genre, { foreignKey: 'genre_id' });
Genre.hasMany(Track, { foreignKey: 'genre_id' })
MediaTypes.hasMany(Track,{ foreignKey: 'media_type_id' })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started on: ${PORT}`)
})

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message)
})
