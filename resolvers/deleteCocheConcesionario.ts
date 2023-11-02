import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";
import CocheModel from "../db/coche.ts";

const deleteCocheConcesionario = async (req: Request, res: Response) => {
  const { matriculacoche, nombreconcesionario } = req.params;

  try {
    // Encontrar el concesionario por nombre
    const concesionario = await ConcesionarioModel.findOne({ nombre: nombreconcesionario });

    if (!concesionario) {
      return res.status(404).send("Concesionario no encontrado.");
    }

    // Encontrar el coche por matrícula
    const coche = await CocheModel.findOne({ matricula: matriculacoche });

    if (!coche) {
      return res.status(404).send("Coche no encontrado.");
    }

    // Verificar si el coche pertenece al concesionario
    const index = concesionario.coches.findIndex(id => id.equals(coche._id));
    if (index === -1) {
      return res.status(404).send("El coche no pertenece al concesionario.");
    }

    // Eliminar el coche de la lista de coches del concesionario
    concesionario.coches.splice(index, 1);

    // Guardar el documento actualizado del concesionario
    await concesionario.save();

    res.status(200).send("Coche eliminado del concesionario.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default deleteCocheConcesionario;
