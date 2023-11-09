import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "../db/coche.ts";
import ConcesionarioModel from "../db/concesionario.ts";

const sendCoche = async (req: Request, res: Response) => {
  const { matriculacoche, nombreconcesionario } = req.params; // Parámetros de la URL

  if (!matriculacoche || !nombreconcesionario) {             // Si no se encuentran los parámetros
    const error={                                            // Devolver error
      "error":"missing_datta",
      "mensage": "Da "
    }
    return res.status(400).json(error);
  }

  try {
    // Buscar el coche por su matrícula
    const coche = await CocheModel.findOne({ matricula: matriculacoche }).exec(); // Buscar por matrícula
    if (!coche) {                                                                 // Si no se encuentra el coche
      const error={                                                               // Devolver error
        "error":"car_not_found",  
        "mensage": "The car was not found. "
      }
      return res.status(404).json(error);
    }

    // Buscar el concesionario por su nombre
    const concesionario = await ConcesionarioModel.findOne({ nombre: nombreconcesionario }).exec(); // Buscar por nombre
    if (!concesionario) {                                                                           // Si no se encuentra el concesionario
      const error={                                                                                 // Devolver error
        "error":"dealer_not_found",  
        "mensage": "The dealer was not found. "
      }
      return res.status(404).json(error);
    }

    // Verificar si el coche ya está en el concesionario
    if (concesionario.coches.includes(coche._id)) {             // Si el coche ya está en la lista de coches del concesionario
      const error={                                             // Devolver error
        "error":"car_already_in_dealer",
        "mensage": "The car is already in the dealer. "
      }
      return res.status(400).json(error);
    }
    
    // Verificar si el coche ya está asociado a algún concesionario
    const isCarAlreadyInAnyDealer = await ConcesionarioModel.findOne({ coches: coche._id }).exec(); // Buscar por id del coche
    if (isCarAlreadyInAnyDealer) {                                                                  // Si el coche ya está en algún concesionario
      return res.status(400).json({                                                                 // Devolver error
        "error": "car_already_in_another_dealer",
        "message": "The car is already in another dealer."
      });
    }

    // Verificar si el concesionario tiene menos de 10 coches
    if (concesionario.coches.length >= 10) {                   // Si el concesionario tiene 10 o más coches
      const error={                                            // Devolver error
        "error":"max_cars",  
        "mensage": "The number of cars in the dealer has reached the maximum. "
      }
      return res.status(404).json(error);
    }

    // Agregar el coche al concesionario
    concesionario.coches.push(coche._id);

    await concesionario.save(); // Guardar el documento actualizado del concesionario

    res.status(200).send("Coche enviado al concesionario exitosamente");  // Devolver mensaje de éxito
  } 
  catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor"); // Devolver mensaje de error
  }
};

export default sendCoche; // Exportar la función