import { Router } from 'express';
import { db } from '@vercel/postgres';

const router = Router();

router.delete('/eliminar/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
  
    if (!idUsuario || isNaN(idUsuario)) {
      return res.status(400).json({ error: 'El parámetro idUsuario es inválido o no está definido' });
    }
  
    try {
      const client = await db.connect();
  
      const result = await client.sql`
        DELETE FROM USUARIO
        WHERE IDUSUARIO = ${idUsuario}
        RETURNING *;
      `;
  
      if (result.rows.length > 0) {
        return res.status(200).json({
          mensaje: 'Usuario eliminado exitosamente',
          usuario: result.rows[0],
        });
      } else {
        return res.status(404).json({ error: `No se encontró un usuario con IDUSUARIO ${idUsuario}` });
      }
    } catch (error) {
      console.error('Error al interactuar con la base de datos:', error);
      return res.status(500).json({ error: 'Error al interactuar con la base de datos' });
    }
  });

  export default router;