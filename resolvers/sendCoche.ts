import {Request, Response} from "npm:express@4.18.2";
import { Coche, Concesionario } from '../types.ts';

const sendCoche = async (req: Request, res: Response) => {

    const { matricula, nombre } = req.params;
    const { id } = req.body;



    const cocheEnConcesionario = concesionario.coches.find((coche: any) => coche.id === id);
    if(cocheEnConcesionario){
        res.status(400).send("El coche ya existe en el concesionario");
        return;
    }

    concesionario.coches.push(coche);
    await concesionario.save();

    res.status(200).send({
        
    })



}

export default sendCoche;
