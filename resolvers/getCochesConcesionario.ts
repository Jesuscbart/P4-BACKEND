import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario.ts";
import CocheModel from "../db/coche.ts";
// Asegúrate de que estos modelos estén correctamente importados

const getCochesConcesionario = async (req: Request, res: Response) => {
  const { concesionario } = req.params;

  if (!concesionario) {                         // Si falta el parámetro de la URL
    const error={                               // Devolver error
      "error":"missing_dealer_name",
      "mensage": "The dealer name is missing. "
    }
    return res.status(400).json(error);
  }

  try {

    const concesionarioEncontrado = await ConcesionarioModel.findOne({ nombre: concesionario });  // Buscar el concesionario por nombre

    if (!concesionarioEncontrado) {               // Si no se encuentra el concesionario
      const error={                               // Devolver error
        "error":"dealer_not_found",
        "mensage": "The dealer was not found. "
      }
      return res.status(404).json(error);
    }

    // Obtener los coches usando los IDs
    const coches = await CocheModel.find({
      '_id': { $in: concesionarioEncontrado.coches }  // Buscar los coches cuyo ID esté en la lista de coches del concesionario
      // $in es un operador de MongoDB que permite buscar documentos cuyo valor de un campo esté en una lista
    });

    // Mapear la información relevante de los coches
    const cochesInfo = coches.map(coche => ({
      id: coche._id,
      matricula: coche.matricula,
      nombre: coche.nombre,
      precio: coche.precio
    }));

    res.status(200).send(cochesInfo);   // Devolver la información de los coches
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");  // Devolver mensaje de error
  }
};

export default getCochesConcesionario;  // Exportar la función
