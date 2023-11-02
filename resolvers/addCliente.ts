import {Request, Response} from "npm:express@4.18.2";
import clienteModel from "../db/cliente.ts";

const addCliente = async (req: Request, res: Response) => {
    const {dni, nombre, dinero} = req.body;
    if(!dni || !nombre || !dinero){
        res.status(400).send("Missing data");
        return;
    }

    const alreadyExists = await clienteModel.findOne({ dni }).exec();
    if(alreadyExists){
        res.status(400).send("El cliente ya existe");
        return;
    }

    const cliente = new clienteModel({
        dni, nombre, dinero, coches: []
    });

    await cliente.save();

    res.status(200).send({
        dni: cliente.dni,
        nombre: cliente.nombre,
        dinero: cliente.dinero,
        coches: cliente.coches,
        id: cliente.id
    })    
}

export default addCliente;