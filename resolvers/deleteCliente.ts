import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";

const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const cliente = await ClienteModel.findOneAndDelete({ dni }).exec();
    if (!cliente) {
      res.status(404).send("Cliente not found");
      return;
    }
    res.status(200).send("Ciente deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteCliente;