import { sql } from '@vercel/postgres';

export async function getPermissions() {
  try {
    const result = await sql`
      SELECT email, added_at, added_by 
      FROM permissions 
      ORDER BY added_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return [];
  }
}

export async function addPermission(email: string) {
  try {
    const result = await sql`
      INSERT INTO permissions (email, added_by)
      VALUES (${email.toLowerCase().trim()}, 'admin')
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error adding permission:', error);
    return false;
  }
}

export async function removePermission(email: string) {
  try {
    const result = await sql`
      DELETE FROM permissions 
      WHERE email = ${email.toLowerCase().trim()}
    `;
    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error('Error removing permission:', error);
    return false;
  }
}

export async function checkPermission(email: string) {
  try {
    const result = await sql`
      SELECT id FROM permissions 
      WHERE email = ${email.toLowerCase().trim()}
    `;
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
} 