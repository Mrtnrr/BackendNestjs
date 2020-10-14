import * as mongoose from 'mongoose';

const Logger = new mongoose.Schema({
    url: { type: String, required: [true, 'El url es requerido'] },
    type: { type: String,enum:['REQUEST', 'RESPONSE', 'ERROR', 'SERVICE'] },
    method: { type: String },
    now: Number,
    result: String,
    where: String,
},{ timestamps: true, selectPopulatedPaths:true });

Logger.method({
    _toString:(): string => {
        return `${this.method} ${this.url} ${Date.now() - this.now}ms [${
            this.type
        }::${this.result}]`;
    }
})

export default Logger


export interface ILogger extends mongoose.Document {
    url:string
    type:string
    method:string
    now:number
    result:string
    where:string
    createdAt:Date
    _toString():string
}