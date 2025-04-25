import Role, { role } from "../model/role";
import User, { user } from "../model/user";
import { Types } from "mongoose";

const getUserByCode = async (value: string) => {
  try {
    const code = await User.findOne({
      code: value,
    });
    if (code._id) {
      return new Types.ObjectId(code._id);
    }

    return "";
  } catch (error) {
    console.log(error);
  }
};

const getRoleByCode = async (value: string) => {
  try {
    const code = await Role.findOne({
      code: value,
    });
    if (code?._id) {
      return new Types.ObjectId(code._id);
    }

    return "";
  } catch (error) {
    console.log(error);
  }
};

export { getUserByCode, getRoleByCode };

// {status :"660dccc5047207fdd3494294"}
