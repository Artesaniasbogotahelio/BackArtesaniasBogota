import { Router } from 'express';
import { db } from '@vercel/postgres';

const router = Router();

router.patch('/actualizar/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
  const campos = req.body;

  if (!idUsuario || isNaN(idUsuario)) {
    return res.status(400).json({ error: 'El parámetro idUsuario es inválido o no está definido' });
  }

  if (Object.keys(campos).length === 0) {
    return res.status(400).json({ error: 'No se enviaron campos para actualizar' });
  }

  try {
    const client = await db.connect();

    // Construir dinámicamente la consulta de actualización
    const updates = Object.keys(campos)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = [...Object.values(campos), idUsuario];

    const query = `
      UPDATE USUARIO
      SET ${updates}
      WHERE IDUSUARIO = $${values.length}
      RETURNING *;
    `;
    /*
    const result = await client.sql(query, values);

    if (result.rows.length > 0) {
      return res.status(200).json({
        mensaje: 'Usuario actualizado exitosamente',
        usuario: result.rows[0],
      });
    } else {
      return res.status(404).json({ error: `No se encontró un usuario con IDUSUARIO ${idUsuario}` });
    }*/
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    return res.status(500).json({ error: 'Error al interactuar con la base de datos' });
  }
});

export default router;
