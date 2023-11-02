import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";

const getCochesCliente = async (req: Request, res: Response) => {
  const { dnicliente } = req.params;

  try {
    // Buscar el cliente y popular la información de coches
    const cliente = await ClienteModel.findOne({ dni: dnicliente }).populate('coches').exec();

    if (!cliente) {
      return res.status(404).send("Cliente no encontrado.");
    }

    // Mapear la información relevante de los coches
    const cochesInfo = cliente.coches.map(coche => ({
      id: coche._id,
      matricula: coche.matricula,
      nombre: coche.nombre,
      precio: coche.precio
    }));

    res.status(200).send(cochesInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default getCochesCliente;
