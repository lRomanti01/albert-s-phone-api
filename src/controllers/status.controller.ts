import { Request, Response } from "express";
import Status, { status } from "../model/status";

const createStatus = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;

    const createStatus: status = await new Status({ ...data });
    await createStatus.save();

    res.status(201).send({
      ok: true,
      status: createStatus,
      mensaje: "Status creado con éxito",
      message: "Status created successfully",
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

const getStatus = async (req: Request, res: Response) => {
  try {
    const status = await Status.find({});

    if(status.length == 0) {
      return res.status(400).send({
      ok: false,
      mensaje: "No hay estados registrados",
      message: "There are not status saved",
    });
    }

    res.status(200).send({
      ok: true,
      status,
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


export { createStatus, getStatus };
