import { Router } from 'express';
import { db } from '@vercel/postgres';
import crypto from 'crypto'; // Para generar un código de activación único

const router = Router();

router.post('/cliente', async (req, res) => {
  const { usuario, contrasena, correo, estilo,direccion } = req.body;

  if (!usuario || !contrasena || !correo) {
    return res.status(400).json({ error: 'Por favor, proporciona usuario, contraseña y correo' });
  }

  try {
    const client = await db.connect();

    // Generar un código de activación único
    const codigoActivacion = crypto.randomBytes(8).toString('hex');

    // Insertar el nuevo usuario en la tabla USUARIO
    const result = await client.sql`
      INSERT INTO USUARIO (IDROL, USUARIO, CONTRASENA, CORREO, ESTILO, IDLUGAR, ESTADO, CODIGO_ACTIVACION)
      VALUES (1, ${usuario}, ${contrasena}, ${correo}, ${estilo || null},${direccion ||null}, TRUE, ${codigoActivacion})
      RETURNING *;
    `;

    const nuevoUsuario = result.rows[0];

    return res.status(200).json({ usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    return res.status(500).json({ error: 'Error al interactuar con la base de datos' });
  }
});

export default router;
