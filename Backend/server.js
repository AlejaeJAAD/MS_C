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
import playlistRoutes from './routes/playlistRoutes.js'
import playlistTrackRoutes from './routes/playlistTrackRoutes.js'
import invoicesRoutes from './routes/invoicesRoutes.js'
import invoiceItemsRoutes from './routes/invoiceItemsRoutes.js'
import mediaTypesRoutes from './routes/mediaTypesRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

import Login from './models/Login.js'

import Album from './models/Album.js'
import Artist from './models/Artist.js'
import Employee from './models/Employee.js'
import Customer from './models/Customer.js'
import Invoice from './models/Invoice.js'
import InvoiceLine from './models/InvoiceLine.js'
import Track from './models/Track.js'
import Genre from './models/Genre.js'
import MediaTypes from './models/MediaTypes.js'
import Playlist from './models/Playlist.js'
import PlaylistTrack from './models/PlaylistTrack.js'

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
app.use("/artists", artistsRoutes)
app.use("/genres", genreRoutes)
app.use("/media-types", mediaTypesRoutes)
app.use("/albums", albumsRoutes)
app.use("/employees", employeesRoutes)
app.use("/customers", customersRoutes)
app.use("/tracks", tracksRoutes)
app.use("/playlists", playlistRoutes)
app.use("/playlisttracks", playlistTrackRoutes)
app.use("/invoices", invoicesRoutes)
app.use("/invoice-items", invoiceItemsRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/auth", authRoutes)

//Associations
Login.belongsTo(Customer, { foreignKey: 'customerId' });
Customer.hasMany(Login, { foreignKey: 'customerId' });

Login.belongsTo(Employee, { foreignKey: 'employeeId' });
Employee.hasMany(Login, { foreignKey: 'employeeId' });

Artist.hasMany(Album, { foreignKey: 'artistid' });
Album.belongsTo(Artist, { foreignKey: 'artistid' });
Album.hasMany(Track, { foreignKey: 'albumid' });
Track.belongsTo(Album, { foreignKey: 'albumid' });
Track.belongsTo(MediaTypes, { foreignKey: 'mediatypeid' });
MediaTypes.hasMany(Track, { foreignKey: 'mediatypeid' });
Track.belongsTo(Genre, { foreignKey: 'genreid' });
Genre.hasMany(Track, { foreignKey: 'genreid' });
Invoice.belongsTo(Customer, { foreignKey: 'customerid' });
Customer.hasMany(Invoice, { foreignKey: 'customerid' });
Invoice.hasMany(InvoiceLine, { foreignKey: 'invoiceid' });
InvoiceLine.belongsTo(Invoice, { foreignKey: 'invoiceid' });
Track.hasMany(InvoiceLine, { foreignKey: 'trackid' });
InvoiceLine.belongsTo(Track, { foreignKey: 'trackid' });
Employee.hasMany(Customer, { foreignKey: 'supportRepId' });
Customer.belongsTo(Employee, { foreignKey: 'supportRepId' });
Employee.belongsTo(Employee, { as: 'Manager', foreignKey: 'reportsTo' });
Employee.hasMany(Employee, { foreignKey: 'reportsTo' });
Playlist.belongsToMany(Track, { through: PlaylistTrack, foreignKey: 'playlistid', otherKey: 'trackid' });
Track.belongsToMany(Playlist, { through: PlaylistTrack, foreignKey: 'trackid', otherKey: 'playlistid' });
PlaylistTrack.belongsTo(Playlist, { foreignKey: 'playlistid' });
PlaylistTrack.belongsTo(Track, { foreignKey: 'trackid' });

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started on: ${PORT}`)
})

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message)
})
