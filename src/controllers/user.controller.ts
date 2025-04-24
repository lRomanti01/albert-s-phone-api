import { Request, Response } from "express";
import User, { user } from "../model/user";
import Roles, { role } from "../model/role";
import { encrypt } from "../helper/password-bcrypts";
import { generateCode } from "../helper/generate-code";
import { cleanText, generateRegex } from "../middlewares/cleanText";
import { getRoleByCode } from "../middlewares/code";

const createUser = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;

    const verifyEmailUser = await User.findOne({ email: data.email });

    if (verifyEmailUser) {
      return res
        .status(409)
        .send({ ok: false, mensaje: "Email ya esta en uso" });
    }

    const encrypts = await encrypt(data.password);
    data.password = encrypts;

    const code = await generateCode(4);
    data.code = code;

    const create: user = await new User({
      ...data,
    });
    await create.save();

    res.status(201).send({
      ok: true,
      mensaje: "Usuario creado con éxito",
      message: "User created successfully",
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

const getUsers = async (req: Request, res: Response) => {
  try {
    const roles = await getRoleByCode("ADMIN");
    const users = await User.find({ role: { $ne: roles }, isDeleted: false })
      .populate("role")

    res.status(200).send({
      ok: true,
      users,
      mensaje: "Usuarios encontrados con éxito",
      message: "Users found successfully",
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

const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const { limit, initial, code } = req.params;

    const roles = await Roles.findOne({ code });
    const count = await User.count({ role: roles._id, isDeleted: false });
    const users = await User.find({
      role: roles._id,
      isDeleted: false,
    })
      .populate("role")
      .skip(Number(initial))
      .limit(Number(limit));

    res.status(200).send({
      ok: true,
      users,
      count,
      mensaje: "Usuarios encontrados con éxito",
      message: "Users found successfully",
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { ...data } = req.body;
    let user = {};

    delete data.img

    if (data.password) {
      const encrypts = await encrypt(data.password);
      user = await User.findByIdAndUpdate(
        { _id },
        { ...data, password: encrypts },
        { new: true }
      ).populate({ path: "role" });
    } else {
      user = await User.findByIdAndUpdate({ _id }, data, { new: true }).populate({ path: "role" })
    }

    res.status(200).send({
      ok: true,
      user,
      mensaje: "Usuario actualizado con éxito",
      message: "User created successfully",
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

const searchUsers = async (req: Request, res: Response) => {
  try {
    const { limit, initial } = req.params;
    const { ...data } = req.body;

    const cleanedText = await cleanText(data.text);
    const regex = generateRegex(cleanedText);

    const roles = await getRoleByCode("ADMIN");

    const count = await User.count({
      role: { $ne: roles },
      isDeleted: false,
      name: { $regex: regex },
    });

    const users = await User.find({
      role: { $ne: roles },
      isDeleted: false,
      name: { $regex: regex },
    })
      .populate("role")
      .skip(Number(initial))
      .limit(Number(limit));

    res.status(200).send({
      ok: true,
      users,
      count,
      mensaje: "Usuarios encontrados con éxito",
      message: "Users found successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
      mensaje: "¡Ups! Algo salió mal",
      message: "Oops! Something went wrong",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isDeleted: true });

    res.status(201).send({
      ok: true,
      mensaje: "Usuario eliminado con éxito",
      message: "User deleted successfully",
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
  createUser,
  getUsers,
  searchUsers,
  updateUser,
  deleteUser,
  getUsersByRole
};
