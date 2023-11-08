import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";

const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;                                             // Parámetro de la URL
    const cliente = await ClienteModel.findOneAndDelete({ dni }).exec();    // Buscar por DNI y eliminar el cliente
    if (!cliente) {                                                         // Si no se encuentra el cliente
      const error={                                                         // Devolver error
        "error":"cliente_not_found",
        "mensage": "The client was not found. "
      }
      return res.status(404).json(error);
    }
    res.status(200).send("Ciente eliminado");                               // Devolver mensaje de éxito
  } catch (error) {
    res.status(404).send(error.message);                                    // Devolver error de servidor
    return; 
  }
};

export default deleteCliente;                                               // Exportar la función