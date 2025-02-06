import { Router } from 'express';
import { db } from '@vercel/postgres';

const router = Router();

/**
 * 🔹 Endpoint para actualizar la cantidad de un producto en el inventario
 */
router.put('/actualizar/:idPuntoFisico/:idProducto', async (req, res) => {
  const { idPuntoFisico, idProducto } = req.params;
  const { cantidad } = req.body;

  if (!cantidad || isNaN(parseInt(cantidad))) {
    return res.status(400).json({ error: 'La cantidad es obligatoria y debe ser un número válido' });
  }

  try {
    const client = await db.connect();

    // Actualizar la cantidad del producto en el inventario
    const result = await client.sql`
      UPDATE Inventario 
      SET cantidad = ${cantidad}
      WHERE idProducto = ${idProducto} AND idPuntoFisico = ${idPuntoFisico}
      RETURNING *;
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró el producto en este punto físico' });
    }

    return res.status(200).json({
      mensaje: 'Inventario actualizado exitosamente',
      idProducto,
      idPuntoFisico,
      nuevaCantidad: cantidad
    });

  } catch (error) {
    console.error('Error al actualizar el inventario:', error);
    return res.status(500).json({ error: 'Error al actualizar el inventario' });
  }
});

export default router;
