import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";

const getCochesConcesionario = async (req: Request, res: Response) => {
  const { concesionario } = req.params;

  if (!concesionario) {
    res.status(400).send("Falta el nombre del concesionario en la URL");
    return;
  }

  try {
    // Buscar el concesionario por su nombre
    const concesionarioEncontrado = await ConcesionarioModel.findOne({ nombre: concesionario }).populate('coches').exec();
    if (!concesionarioEncontrado) {
      res.status(404).send("Concesionario no encontrado");
      return;
    }

    // Obtener los detalles de los coches
    const coches = concesionarioEncontrado.coches.map(coche => ({
      id: coche.id,
      nombre: coche.nombre,
      matricula: coche.matricula,
      precio: coche.precio
    }));

    res.status(200).send(coches);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default getCochesConcesionario;
