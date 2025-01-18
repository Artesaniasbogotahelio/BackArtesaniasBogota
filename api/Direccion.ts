import { Router } from 'express';
import { db } from '@vercel/postgres';

const router = Router();

router.get('', async (req, res) => {
  try {
    const client = await db.connect();

    // Consulta para obtener los lugares que no tienen tipo "Dirección"
    const result = await client.sql`
      SELECT IDLUGAR, PADRE_LUGAR, TIPO, NOMBRELUGAR
      FROM DIRECCION
      WHERE TIPO != 'Dirección';
    `;

    return res.status(200).json({ lugares: result.rows });
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    return res.status(500).json({ error: 'Error al interactuar con la base de datos' });
  }
});

export default router;
