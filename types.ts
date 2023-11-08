export type Coche = { //Defino el tipo Coche
    id: number;
    matricula: string;
    nombre: string;   //Nombre del modelo de coche
    precio: number;
    cliente: Cliente;
    concesionario: Concesionario;
  };
  
  export type Cliente = {  //Defino el tipo Cliente
    id: number;
    dni: string;
    nombre: string;
    dinero: number;
    coches: Coche[];
  };

  export type Concesionario = {  //Defino el tipo Concesionario
    id: number;
    nombre: string;
    coches: Coche[];
    ventasBloqueadas: boolean;
};
