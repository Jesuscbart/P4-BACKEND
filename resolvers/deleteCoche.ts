import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "../db/coche.ts";

const deleteCoche = async (req: Request, res: Response) => {
  try {
    const { matricula } = req.params;
    const coche = await CocheModel.findOneAndDelete({ matricula }).exec();
    if (!coche) {
      res.status(404).send("Coche not found");
      return;
    }
    res.status(200).send("Coche deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteCoche;