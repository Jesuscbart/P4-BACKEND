import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";

const deleteConcesionario = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const concesionario = await ConcesionarioModel.findOneAndDelete({ nombre }).exec();
    if (!concesionario) {
      res.status(404).send("Concesionario not found");
      return;
    }
    res.status(200).send("Concesionario deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteConcesionario;