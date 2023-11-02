import {Request, Response} from "npm:express@4.18.2";
import concesionarioModel from "../db/concesionario.ts";

const addConcesionario = async (req: Request, res: Response) => {
    const {nombre} = req.body;
    if(!nombre){
        res.status(400).send("Missing name");
        return;
    }

    const alreadyExists = await concesionarioModel.findOne({ nombre }).exec();
    if(alreadyExists){
        res.status(400).send("El concesionario ya existe");
        return;
    }

    const concesionario = new concesionarioModel({
        nombre, coches: []
    });

    await concesionario.save();

    res.status(200).send({
        nombre: concesionario.nombre,
        coches: concesionario.coches,
        id: concesionario.id
    })    
}

export default addConcesionario;