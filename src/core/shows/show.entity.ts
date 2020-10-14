import * as mongoose from 'mongoose';


export const Show = new mongoose.Schema({
    // _user: { type: String, required: [true, 'El ID usario es requerido'] },
    _user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    serie: { type: String, required: [true, 'El ID de la serie es requerido'] },
    title: { type: String, required: [true, 'El titulo  de la serie es requerido'] },
    active: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
},{ timestamps: true });

Show.pre('aggregate', () => {
    //@ts-ignore
    this.pipeline().unshift({ $match: { isDeleted: { $ne: null } } })
})


export interface IShow extends mongoose.Document {
    _user: string
    serie: string
    title: string
    active: string
}

