import { Request, Response } from "express";
import Phones, { phones } from "../model/phones";
import SoldPhones, { soldPhones } from "../model/soldPhones";

const createPhone = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const createPhones: phones = new Phones({ ...data });
    await createPhones.save();

    res.status(201).send({
      ok: true,
      phone: createPhones,
      mensaje: "Celular registrado con éxito",
      message: "Phone registered successfully",
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

const getPhones = async (req: Request, res: Response) => {
  try {
    const phones = await Phones.find({ code: { $ne: "ADMIN" } });

    res.status(200).send({
      ok: true,
      phones,
      mensaje: "Todos los telefonos",
      message: "All phones",
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

const updatePhone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const phone = await Phones.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );

    res.status(200).send({
      ok: true,
      phone,
      mensaje: "Celular actualizado con éxito",
      message: "Phone created successfully",
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

const deletePhone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const phone = await Phones.findByIdAndDelete(id);

    res.status(200).send({
      ok: true,
      phone,
      mensaje: "Celular eliminado con éxito",
      message: "Phone delete successfully",
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

const createSoldPhones = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // Verificamos si existe el celular
    const phone = await Phones.findById(data.phone);
    if (!phone) {
      return res.status(404).json({
        ok: false,
        mensaje: "Celular no encontrado",
        message: "Phone not found",
      });
    }

    // Verificamos que haya suficiente cantidad disponible
    const availableAmount = Number(phone.amount);
    const amountToSell = Number(data.amount);

    if (amountToSell > availableAmount) {
      return res.status(400).json({
        ok: false,
        mensaje: "Cantidad a vender excede el stock disponible",
        message: "Quantity to sell exceeds available stock",
      });
    }

    // Actualizamos el stock
    await Phones.findByIdAndUpdate(data.phone, {
      amount: availableAmount - amountToSell,
    });

    // Creamos el registro de venta
    const soldPhone = new SoldPhones({ ...data });
    await soldPhone.save();

    res.status(201).json({
      ok: true,
      soldPhones: soldPhone,
      mensaje: "Celular vendido registrado con éxito",
      message: "Phone sold registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
      mensaje: "¡Ups! Algo salió mal",
      message: "Oops! Something went wrong",
    });
  }
};

const getSoldPhones = async (req: Request, res: Response) => {
  try {
    const soldPhones = await SoldPhones.find().populate("phone").populate("user");

    res.status(200).send({
      ok: true,
      soldPhones,
      mensaje: "Todos los telefonos vendidos",
      message: "All sold phones",
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

export {
  createPhone,
  getPhones,
  updatePhone,
  deletePhone,
  createSoldPhones,
  getSoldPhones,
};
