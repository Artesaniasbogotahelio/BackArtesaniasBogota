import { Router } from 'express';
import { db } from '@vercel/postgres';

const router = Router();

router.get('/Admins', async (req, res) => {
    try {
      const client = await db.connect();
  
      const result = await client.sql`
        SELECT *
        FROM USUARIO
        WHERE IDROL IN (2, 3);
      `;
  
      return res.status(200).json({ usuarios: result.rows });
    } catch (error) {
      console.error('Error al interactuar con la base de datos:', error);
      return res.status(500).json({ error: 'Error al interactuar con la base de datos' });
    }
  });
  
router.get('/usuarios', async (req, res) => {
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