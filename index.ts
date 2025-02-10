import express from 'express';
import cors from 'cors';

import RegistrarUsuarioCliente from './api/RegistrarUsuarioCliente';
import RegistrarAdmin from './api/RegistrarAdmin';
import RegistrarGerente from './api/RegistrarGerente';
import Login from './api/Login';
import Direccion from './api/Direccion';
import DireccionEspeficia from './api/DireccionEspecifica';
import ObtenerUsuarios from './api/ObtenerUsuarios';
import EliminarUsuario from './api/EliminarUsuario';
import ActualizarUsuario from './api/ActualizarUsuario';
import Inventario from './api/Inventario';
import consultar from './api/consultar';
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS para permitir múltiples orígenes
const allowedOrigins = ['https://proyecto-final-patrones.vercel.app/','*'];

const corsOptions = {
  origin: '*',  // Permite cualquier origen
  methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',  // Permite cualquier método HTTP
  allowedHeaders: '*',  // Permite cualquier encabezado
};

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Backend Running</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f3f4f6;
        }
        h1 {
          color: #4caf50;
        }
        p {
          color: #333;
        }
      </style>
    </head>
    <body>
      <div>
        <h1>¡Tu backend está funcionando! 🚀</h1>
        <p>Puedes probar los  endpoints:</p>
      </div>
    </body>
    </html>
  `);
});

// Usar el middleware CORS con las opciones
app.use(cors(corsOptions));

// Monta cada conjunto de rutas con su prefijo
//Registrar
app.use('/Registrar', RegistrarUsuarioCliente);
app.use('/Registrar', RegistrarAdmin);
app.use('/Registrar', RegistrarGerente);
//Obtener informacion
app.use('/Login', Login);
app.use('/Direccion', Direccion);
app.use('', DireccionEspeficia);
//control de usuarios 
app.use('/Usuarios', ObtenerUsuarios);
app.use('/Usuarios', EliminarUsuario);
app.use('/Usuarios', ActualizarUsuario);
app.use('/Inventario', Inventario);
app.use('/consultar', consultar);


// Exportar la aplicación como un handler para Vercel
export default app;
