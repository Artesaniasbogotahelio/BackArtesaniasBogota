import { Router } from 'express';
import { db } from '@vercel/postgres';

const router = Router();

router.get('/cliente/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;

  if (!idUsuario) {
    return res.status(400).json({ error: 'Por favor, proporciona el ID del usuario' });
  }

  try {
    const client = await db.connect();

    const result = await client.sql`
      SELECT IDUSUARIO, IDROL, USUARIO, CORREO, ESTILO, IDLUGAR, ESTADO, CODIGO_ACTIVACION 
      FROM USUARIO 
      WHERE IDUSUARIO = ${idUsuario};
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({ usuario: result.rows[0] });
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    return res.status(500).json({ error: 'Error al interactuar con la base de datos' });
  }
});

export default router;
