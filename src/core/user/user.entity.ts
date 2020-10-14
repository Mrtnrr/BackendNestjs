import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'
export const User = new mongoose.Schema({
    name: { type: String, required: [true, 'El nombre de usuario es requerido'] },
    email: { type: String,index:true, unique: [true, 'El correo ya existe'], required: [true, 'El correo es requerido'] },
    active: { type: Boolean, default: true },
    password: {
        type: String,
        required: true,
        set: function (value: string) {
            if (!value) return ''
            return bcrypt.hashSync(value, 10)
        }
    },
    deletedAt: { type: Date, default: null },
},{ timestamps: true });

User.methods.comparePassword= function (compare: string) {
    return bcrypt.compareSync(compare, this.password);
}

User.post('update', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('El usuario o correo ya esta registrado'));
    } else {
        next();
    }
})
User.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('El usuario o correo ya esta registrado'));
    } else {
        next();
    }
})
User.pre('aggregate', () => {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: null } } })
})


export interface IUser extends mongoose.Document {
    name: string
    email: string
    active: string
    password: string
    comparePassword(compare:string): any
}

