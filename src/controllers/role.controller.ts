import { Request, Response } from "express";
import Roles, { role } from "../model/role";

const createRole = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const createRole: role = await new Roles({ ...data });
    await createRole.save();

    res.status(201).send({
      ok: true,
      role: createRole,
      mensaje: "Rol creado con éxito",
      message: "Role created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
      mensaje: "¡Ups! Algo salió mal",
      message: "Ups! Something went wrong",
    });
  }
};

const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Roles.find({ code: { $ne: "ADMIN" } });

    res.status(200).send({
      ok: true,
      roles,
      mensaje: "Todos los roles",
      message: "All services",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
      mensaje: "¡Ups! Algo salió mal",
      message: "Ups! Something went wrong",
    });
  }
};

export { createRole, getRoles };
