import { Router } from 'express';
import { db } from '@vercel/postgres';

const router = Router();

router.get('/direccionEspecifica/:idlugar', async (req, res) => {
  const { idlugar } = req.params;

  if (!idlugar || isNaN(idlugar)) {
    return res.status(400).json({ error: 'El parámetro idlugar es inválido o no está definido' });
  }

  try {
    const client = await db.connect();

    // Consulta para obtener los datos del lugar con el IDLUGAR especificado
    const result = await client.sql`
      SELECT *
      FROM DIRECCION
      WHERE IDLUGAR = ${idlugar};
    `;

    if (result.rows.length > 0) {
      // Se encontró el lugar
      return res.status(200).json({ lugar: result.rows[0] });
    } else {
      // No se encontró ningún lugar con ese IDLUGAR
      return res.status(404).json({ error: `No se encontró un lugar con IDLUGAR ${idlugar}` });
    }
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    return res.status(500).json({ error: 'Error al interactuar con la base de datos' });
  }
});

export default router;
