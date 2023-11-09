import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "../db/coche.ts";

const deleteModeloCoche = async (req: Request, res: Response) => {
  try {
    const { matricula } = req.params;             // Parámetro de la URL
    const coche = await CocheModel.findOneAndDelete({ matricula }).exec();    // Se busca el coche por matrícula y se elimina
    if (!coche) {                                // Si no se encuentra el coche
      const error={                              // Devolver error
        "error":"car_not_found",
        "mensage": "The car was not found. "
      }
      return res.status(404).json(error);
    }

    res.status(200).send("Coche deleted");     // Devolver mensaje de éxito
  } 
  catch (error) {
    res.status(404).send(error.message);       // Devolver mensaje de error
    return;
  }
};

export default deleteModeloCoche; // Exportar la función