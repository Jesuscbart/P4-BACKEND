import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import CocheModel from "../db/coche.ts";

const deleteCocheCliente = async (req: Request, res: Response) => {
  const { matriculacoche, dni } = req.params;         // Parámetros de la URL

  try {
    // Encontrar el cliente por DNI
    const cliente = await ClienteModel.findOne({ dni });  // Buscar por DNI

    if (!cliente) {                                        // Si no se encuentra el cliente
      const error={                                        // Devolver error
        "error":"cliente_not_found",
        "mensage": "The client was not found. "
      }
      return res.status(404).json(error);
    }

    // Encontrar el coche por matrícula
    const coche = await CocheModel.findOne({ matricula: matriculacoche });

    if (!coche) {                                             // Si no se encuentra el coche
      const error={                                           // Devolver error
        "error":"car_not_found",
        "mensage": "The car was not found. "
      }
      return res.status(404).json(error);
    }

    // Verificar si el coche pertenece al cliente
    const index = cliente.coches.findIndex(id => id.equals(coche._id));   // Buscar el índice del coche en la lista de coches del cliente
    if (index === -1) {                                                   // Si el índice es -1, significa que no se encontró el coche
      const error={                                                       // Devolver error
        "error":"car_does_not_belong_to_client",
        "mensage": "The car does not belong to the client. "
      }
      return res.status(404).json(error);
    }

    // Eliminar el coche de la lista de coches del cliente
    cliente.coches.splice(index, 1);

    // Guardar el documento actualizado del cliente
    await cliente.save();

    res.status(200).send("Coche eliminado del cliente.");
  } 
  catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default deleteCocheCliente;  // Exportar la función
