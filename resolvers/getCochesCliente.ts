import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";
import CocheModel from "../db/coche.ts";

const getCochesCliente = async (req: Request, res: Response) => {
  const { dnicliente } = req.params;  // Parámetro de la URL

  try {
    // Primero, obtener el cliente para obtener los IDs de sus coches
    const cliente = await ClienteModel.findOne({ dni: dnicliente });

    if (!cliente) {                     // Si no se encuentra el cliente
      return res.status(404).json({     // Devolver error
        error: "client_not_found",
        message: "The client was not found."
      });
    }

    // Obtener los coches usando los IDs
    const coches = await CocheModel.find({ 
      '_id': { $in: cliente.coches }        // Buscar los coches cuyo ID esté en la lista de coches del cliente
      // $in es un operador de MongoDB que permite buscar documentos cuyo valor de un campo esté en una lista
    });

    // Mapear la información relevante de los coches
    const cochesInfo = coches.map(coche => ({
      id: coche._id,
      matricula: coche.matricula,
      nombre: coche.nombre,
      precio: coche.precio
    }));

    res.status(200).send(cochesInfo);  // Devolver la información de los coches
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default getCochesCliente;  // Exportar la función
