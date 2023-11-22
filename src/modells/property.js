import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Property = db.define('tbb_properties', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNule: false,
        primaryKey: true
    },
    tittle:{
        type: DataTypes.STRING(150),
        allowNule: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNule: false,
    },
    rooms:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNule: false
    },
    wc:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNule: false
    },
    parkingLots:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNule: false
    },
    street:{
        type: DataTypes.STRING(100),
        allowNule: false
    },
    lat:{
        type: DataTypes.STRING,
        allowNule: false
    },
    long:{
        type: DataTypes.STRING,
        allowNule: false
    },
    image:{
        type: DataTypes.STRING,
        allowNule: false
    },
    published:{
        type: DataTypes.BOOLEAN,
        allowNule: false,
        defaultValue: false
    }
})

export default Property