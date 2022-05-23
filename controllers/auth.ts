import { Request, Response, NextFunction } from 'express';
//import mongoose from 'mongoose';
//import bcrypt from 'bcryptjs';
//import { User } from '../models/User';
import { generateJWT } from '../helpers/jwt';

export const getUsers = async (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    uid: 'hghghhffd',
    name: 'joalrope',
    token: 'token valido',
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    /*let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        ok: false,
        msg: `Ya existe un usuario con el correo ${email}`,
      });
    } else {
      user = new User(req.body);

      //Encriptar contraseña
      const salt = bcrypt.genSaltSync();

      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      // Generar JWT (Json Web Token)
      const token = await generateJWT(user.id, user.name);

      res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.name,
        token,
      });
    }*/

    res.status(201).json({
      ok: true,
      uid: 'user.id',
      name: 'user.name',
      token: 'token',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    /*const user = await User.findOne({ email });

    // Verificar si existe el usuario
    if (!user) {
      return res.status(200).json({
        ok: false,
        msg: `El usuario y/o contraseña no son correctos`,
      });
    }

    // Confirmar match del password enviado
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(200).json({
        ok: false,
        msg: 'El usuario y/o contraseña no son correctos',
      });
    }

    //Generar JWT (Json Web Token)
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      msg: 'Inicio de sesión exitoso',
      uid: user.id,
      name: user.name,
      token,
    });*/

    res.status(201).json({
      ok: true,
      msg: 'Inicio de sesión exitoso',
      uid: 'user.id',
      name: 'user.name',
      token: 'token',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export const revalidateToken = async (req: Request, res: Response) => {
  const { uid, name, role } = req.params;

  const token = await generateJWT(uid, name);

  res.status(500).json({
    ok: true,
    msg: 'Nuevo token',
    uid,
    name,
    token,
  });
};
