import express from 'express';
import cors from 'cors';

import RegistrarUsuarioCliente from './api/RegistrarUsuarioCliente';
import RegistrarAdmin from './api/RegistrarAdmin';
import RegistrarGerente from './api/RegistrarGerente';
import Login from './api/Login';
import Direccion from './api/Direccion';
import DireccionEspeficia from './api/DireccionEspecifica';
import ObtenerAdmins from './api/ObtenerAdmins';
import EliminarUsuario from './api/EliminarUsuario';
import ActualizarUsuario from './api/ActualizarUsuario';
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS para permitir múltiples orígenes
const allowedOrigins = ['*'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: 'GET,POST,OPTIONS',
  allowedHeaders: 'Content-Type',
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
app.use('/Usuarios', ObtenerAdmins);
app.use('/Usuarios', EliminarUsuario);
app.use('/Usuarios', ActualizarUsuario);


// Exportar la aplicación como un handler para Vercel
export default app;
