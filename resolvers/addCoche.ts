import {Request, Response} from "npm:express@4.18.2";
import { Coche } from "../types.ts";
import cocheModel from "../db/coche.ts";

const addCoche = async (req: Request, res: Response) => {
    const {matricula, nombre, precio} = req.body;
    if(!matricula || !nombre || !precio){
        res.status(400).send("Missing data");
        return;
    }

    const alreadyExists = await cocheModel.findOne({ matricula }).exec();
    if(alreadyExists){
        res.status(400).send("El coche ya existe");
        return;
    }
    if(precio < 0){
        res.status(400).send("El precio no puede ser negativo");
        return;
    }

    const coche = new cocheModel({
        matricula,nombre, precio
    });

    await coche.save();

    res.status(200).send({
        matricula: coche.matricula,
        nombre: coche.nombre,
        precio: coche.precio,
        id: coche.id
    })    
}

export default addCoche;