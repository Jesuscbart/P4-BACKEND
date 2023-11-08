import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";

const addDinero = async (req: Request, res: Response) => {
  const { dni, cantidad } = req.params;                                       // Parámetros que se reciben de la URL

  // Convertimos cantidad a número y validamos que sea un número válido
  const cantidadNumerica = parseFloat(cantidad);                              // parseFloat convierte un string a número
  if (isNaN(cantidadNumerica)) {                                              // isNaN devuelve true si el parámetro no es un número
    const error={                                                             // Si no es un número se devuelve un error
      "error":"invalid_data",
      "mensage": "Invalid quantity. "
    }
    return res.status(400).json(error);
  }

  // Buscar el cliente por DNI
  const cliente = await ClienteModel.findOne({ dni });                // Se busca el cliente por DNI
  if (!cliente) {                                                     // Si no existe                        
    const error={                                                     // Se devuelve un error
      "error":"client_not_found",
      "mensage": "The client was not found. "
    }
    return res.status(404).json(error);
  }

  // Sumar la cantidad al dinero actual del cliente
  cliente.dinero += cantidadNumerica;

  // Guardar el cliente actualizado
  await cliente.save();

  res.status(200).send({           // Se devuelve el cliente con los datos: dni, nombre y dinero
    dni: cliente.dni,
    nombre: cliente.nombre,
    dinero: cliente.dinero,
  });
};

export default addDinero;          // Se exporta la función
