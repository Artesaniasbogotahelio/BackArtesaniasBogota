import { Router } from 'express';
import { db } from '@vercel/postgres';

const router = Router();

router.post('', async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Por favor, proporciona usuario y contraseña' });
  }

  try {
    const client = await db.connect();

    // Consultar si el usuario existe con la contraseña proporcionada
    const result = await client.sql`
      SELECT IDUSUARIO, IDROL, USUARIO, ESTADO ,IDLUGAR
      FROM USUARIO 
      WHERE USUARIO = ${usuario} AND CONTRASENA = ${contrasena};
    `;

    if (result.rows.length > 0) {
      // Usuario encontrado
      const usuarioEncontrado = result.rows[0];
      return res.status(200).json({
        mensaje: 'Inicio de sesión exitoso',
        idusuario: usuarioEncontrado.idusuario,
        idrol: usuarioEncontrado.idrol,
        estado: usuarioEncontrado.estado,
        idlugar: usuarioEncontrado.idlugar,
      });
    } else {
      // Usuario no encontrado
      return res.status(201).json({
        mensaje: 'Usuario o contraseña incorrectos',
      });
    }
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    return res.status(500).json({ error: 'Error al interactuar con la base de datos' });
  }
});

router.get('/usuarios-admin', async (req, res) => {
  try {
    const client = await db.connect();

    // Consulta para obtener los usuarios con IDROL = 1
    const result = await client.sql`
      SELECT IDUSUARIO, ESTADO, IDLUGAR
      FROM USUARIO 
      WHERE IDROL = 1;
    `;

    if (result.rows.length > 0) {
      return res.status(200).json({ usuarios: result.rows });
    } else {
      return res.status(404).json({ mensaje: 'No hay usuarios con IDROL 1' });
    }
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    return res.status(500).json({ error: 'Error al interactuar con la base de datos' });
  }
});

export default router;
