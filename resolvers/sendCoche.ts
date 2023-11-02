import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "../db/coche.ts";
import ConcesionarioModel from "../db/concesionario.ts";

const sendCoche = async (req: Request, res: Response) => {
  const { matriculacoche, nombreconcesionario } = req.params;

  if (!matriculacoche || !nombreconcesionario) {
    res.status(400).send("Faltan parámetros en la URL");
    return;
  }

  try {
    // Buscar el coche por su matrícula
    const coche = await CocheModel.findOne({ matricula: matriculacoche }).exec();
    if (!coche) {
      res.status(404).send("Coche no encontrado");
      return;
    }

    // Buscar el concesionario por su nombre
    const concesionario = await ConcesionarioModel.findOne({ nombre: nombreconcesionario }).exec();
    if (!concesionario) {
      res.status(404).send("Concesionario no encontrado");
      return;
    }

    // Verificar si el coche ya está en el concesionario
    if (concesionario.coches.includes(coche._id)) {
      res.status(400).send("El coche ya está en el concesionario");
      return;
    }

    // Verificar si el concesionario tiene menos de 10 coches
    if (concesionario.coches.length >= 10) {
      res.status(400).send("El concesionario ya tiene el número máximo de coches permitidos");
      return;
    }

    // Agregar el coche al concesionario
    concesionario.coches.push(coche._id);
    await concesionario.save();

    res.status(200).send("Coche enviado al concesionario exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default sendCoche;