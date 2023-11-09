import mongoose from "npm:mongoose@7.6.3";  //Importo mongoose

export type Coche = { //Defino el tipo Coche
    id: string;
    matricula: string;
    nombre: string;   //Nombre del modelo de coche
    precio: number;
    cliente: Cliente;
    concesionario: Concesionario;
  };
  
  export type Cliente = {  //Defino el tipo Cliente
    id: string;
    dni: string;
    nombre: string;
    dinero: number;
    coches: mongoose.Types.ObjectId[];  //Array de tipo ObjectId para almacenar los coches. Se usa mongoose.Types.ObjectId porque es el tipo que usa mongoose para los id 
  };

  export type Concesionario = {  //Defino el tipo Concesionario
    id: string;
    nombre: string;
    coches: mongoose.Types.ObjectId[];  //Array de tipo ObjectId para almacenar los coches. Se usa mongoose.Types.ObjectId porque es el tipo que usa mongoose para los id
    ventasBloqueadas: boolean;
};