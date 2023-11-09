import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";
import CocheModel from "../db/coche.ts";

const deleteCocheConcesionario = async (req: Request, res: Response) => {
  const { matriculacoche, nombreconcesionario } = req.params;      // Parámetros de la URL 

  try {
    // Encontrar el concesionario por nombre
    const concesionario = await ConcesionarioModel.findOne({ nombre: nombreconcesionario });

    if (!concesionario) {                               // Si no se encuentra el concesionario
      const error={                                     // Devolver error
        "error":"dealer_not_found",
        "mensage": "The dealer was not found. "
      }
      return res.status(404).json(error);
    }

    // Encontrar el coche por matrícula
    const coche = await CocheModel.findOne({ matricula: matriculacoche });

    if (!coche) {                                          // Si no se encuentra el coche
      const error={                                        // Devolver error
        "error":"car_not_found",
        "mensage": "The car was not found. "
      }
      return res.status(404).json(error);
    }

    // Verificar si el coche pertenece al concesionario
    const index = concesionario.coches.findIndex(id => id.equals(coche._id));   // Buscar el índice del coche en la lista de coches del concesionario
    if (index === -1) {                                                         // Si el índice es -1, significa que no se encontró el coche
      const error={                                                             // Devolver error
        "error":"car_does_not_belong_to_dealer",
        "mensage": "The car does not belong to the dealer. "
      }
      return res.status(404).json(error);
    }

    // Eliminar el coche de la lista de coches del concesionario
    concesionario.coches.splice(index, 1);  // Utilizar el método splice para eliminar el coche de la lista de coches del concesionario.
    // El método splice recibe dos parámetros: el índice del elemento a eliminar y la cantidad de elementos a eliminar a partir de ese índice.

    // Guardar el documento actualizado del concesionario
    await concesionario.save();

    res.status(200).send("Coche eliminado del concesionario."); // Devolver mensaje de éxito
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");   // Devolver mensaje de error
  }
};

export default deleteCocheConcesionario;  // Exportar la función
