import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

const getData = async () => {
  try {
    const res = await pool.query("SELECT * FROM username");
    return Response.json({
      message: "succcess",
      data: res.rows,
    });
  } catch (error) {
    return Response.json({
      message: "failed",
      status: 400,
    });
  }
};

const getDataById = async (req) => {
  try {
    const id = req.params.id;
    const res = await pool.query("SELECT * FROM username where id=$1", [id]);

    if (res.rows.length === 0) {
      return Response.json({
        message: "Data tidak ditemukan",
      });
    }

    return Response.json({
      message: "Data ditemukan",
      data: res.rows,
    });
  } catch (error) {
    return Response.json({
      message: "Terjadi kesalahan",
      error: error,
    });
  }
};

const storeData = async (req) => {
  try {
    let body;
    body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return Response.json({
        message: "name dan email harus diisi",
      });
    }

    await pool.query("INSERT INTO username(name,email) values ($1,$2)", [
      name,
      email,
    ]);

    return Response.json({
      message: "Data berhasil ditambahkan",
    });
  } catch (error) {
    return Response.json({
      message: "JSON input invalid",
      error: error.message,
    });
  }
};

const deleteById = async (req) => {
  try {
    const id = req.params.id;
    const res = await pool.query("DELETE FROM username where id=$1", [id]);

    if (res.rowCount < 0) {
      return Response.json({
        message: "Id tidak ditemukan",
      });
    }
    return Response.json({
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    return Response.json({
      message: error.message,
    });
  }
};

const updateData = async (req) => {
  try {
    let body;
    body = await req.json();
    const { name, email } = body;

    if(!name || !email) {
      return Response.json({
        message: 'name dan email harus diisi'
      })
    }

    const id = req.params.id;
    await pool.query(
      "UPDATE username SET name=$2, email=$3 where id=$1",
      [id, name, email]
    );

    return Response.json({
      message: "Data berhasil di update",
    });
  } catch (error) {
    return Response.json({
      message: error.message,
    });
  }
};

export { getData, storeData, getDataById, deleteById, updateData };
