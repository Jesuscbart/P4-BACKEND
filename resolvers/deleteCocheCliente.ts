import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import CocheModel from "../db/coche.ts";

const deleteCocheCliente = async (req: Request, res: Response) => {
  const { matriculacoche, dni } = req.params;

  try {
    // Encontrar el cliente por DNI
    const cliente = await ClienteModel.findOne({ dni });

    if (!cliente) {
      return res.status(404).send("Cliente no encontrado.");
    }

    // Encontrar el coche por matrícula
    const coche = await CocheModel.findOne({ matricula: matriculacoche });

    if (!coche) {
      return res.status(404).send("Coche no encontrado.");
    }

    // Verificar si el coche pertenece al cliente
    const index = cliente.coches.findIndex(id => id.equals(coche._id));
    if (index === -1) {
      return res.status(404).send("El coche no pertenece al cliente.");
    }

    // Eliminar el coche de la lista de coches del cliente
    cliente.coches.splice(index, 1);

    // Guardar el documento actualizado del cliente
    await cliente.save();

    res.status(200).send("Coche eliminado del cliente.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default deleteCocheCliente;
