import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";

const deleteConcesionario = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;    // Parámetro de la URL
    const concesionario = await ConcesionarioModel.findOneAndDelete({ nombre }).exec();  // Se busca el concesionario por nombre y se elimina
    if (!concesionario) {                               // Si no se encuentra el concesionario
      const error={                                     // Devolver error
        "error":"dealer_not_found",
        "mensage": "The dealer was not found. "
      }
      return res.status(404).json(error);
    }

    res.status(200).send("Concesionario eliminado");    // Devolver mensaje de éxito
  } 
  catch (error) {
    res.status(404).send(error.message);                // Devolver mensaje de error
    return;
  }
};

export default deleteConcesionario;