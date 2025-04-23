import { Request, Response, NextFunction } from "express";
import Jimp from "jimp";
import path from "path";
import { Endpoint, S3 } from "aws-sdk";
import multer from "multer";

// Configuración de multer para manejar la carga de archivos
const storage = multer.memoryStorage(); // Guarda los archivos en la memoria para procesamiento
const upload = multer({ storage: storage });

const spacesEndPoint = new Endpoint(process.env.ENDPOINTSPACE);

const awsS3 = new S3({
  endpoint: spacesEndPoint,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

interface CustomRequest extends Request {
  imageURL?: string;
  imageURLs?: string[];
}

// Middleware para procesar la imagen con Jimp antes de subirla
const processImage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    if (!req.file) {
      return next(new Error("Error: No file uploaded"));
    }

    try {
      // Verificar el tipo de archivo
      const isFileTypeValid = checkFileType(req.file);
      if (!isFileTypeValid) {
        throw new Error("Error: Invalid file type");
      }

      // Cargar la imagen con Jimp
      const image = await Jimp.read(req.file.buffer);

      // Redimensionar la imagen
      image.resize(400, Jimp.AUTO);

      // Convertir la imagen nuevamente a buffer
      const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
      // Subir la imagen procesada a AWS S3
      const uploadedImage = await uploadToAWSS3(buffer, 'perfil');

      // Agregar la URL de la imagen al objeto de la solicitud para que esté disponible en el controlador
      req.imageURL = uploadedImage.url;

      // Continúa con el siguiente middleware
      next();
    } catch (error) {
      console.log(error)
      // Manejo de errores
      next(error);
    }
  });
};

const processImageCover = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return next(err);
    }
   
    if (!req.file) {
      return next(new Error("Error: No file uploaded"));
    }

    try {
      // Verificar el tipo de archivo
      const isFileTypeValid = checkFileType(req.file);
      if (!isFileTypeValid) {
        throw new Error("Error: Invalid file type");
      }

      // Cargar la imagen con Jimp
      const image = await Jimp.read(req.file.buffer);

      // Redimensionar la imagen
      image.resize(800, Jimp.AUTO);

      // Convertir la imagen nuevamente a buffer
      const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
      // Subir la imagen procesada a AWS S3
      const uploadedImage = await uploadToAWSS3(buffer, 'portada');

      // Agregar la URL de la imagen al objeto de la solicitud para que esté disponible en el controlador
      req.imageURL = uploadedImage.url;

      // Continúa con el siguiente middleware
      next();
    } catch (error) {
      console.log(error)
      // Manejo de errores
      next(error);
    }
  });
};

const processMultipleImageCover = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  upload.array("images", 10)(req, res, async (err) => {
    // 'images' es el nombre del campo que contiene las imágenes y '10' es el número máximo de archivos permitidos.
    if (err) {
      return next(err);
    }

    if (!req.files || req.files.length === 0) {
      return next(new Error("Error: No files uploaded"));
    }

    try {
      // Almacenar las URLs de las imágenes procesadas
      const imageUrls: string[] = [];

      for (const file of req.files as Express.Multer.File[]) {
        // Verificar el tipo de archivo
        const isFileTypeValid = checkFileType(file);
        if (!isFileTypeValid) {
          throw new Error("Error: Invalid file type");
        }

        // Cargar la imagen con Jimp
        const image = await Jimp.read(file.buffer);

        // Redimensionar la imagen
        image.resize(800, Jimp.AUTO);

        // Convertir la imagen nuevamente a buffer
        const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

        // Subir la imagen procesada a AWS S3
        const uploadedImage = await uploadToAWSS3(buffer, "portada");

        // Agregar la URL de la imagen a la lista
        imageUrls.push(uploadedImage.url);
      }

      // Agregar las URLs de las imágenes al objeto de la solicitud
      req.imageURLs = imageUrls;

      // Continúa con el siguiente middleware
      next();
    } catch (error) {
      console.log(error);
      // Manejo de errores
      next(error);
    }
  });
};


// Verificar el tipo de archivo
const checkFileType = (file) => {
  const filetypes = /jpeg|jpg|png|gif|webp|jfif|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  return extname && mimetype;
};

const uploadToAWSS3 = async (imageBuffer, folder) => {
  try {
    const uploadResult = await awsS3
      .upload({
        Bucket: process.env.BUCKET_NAME,
        Key: `${folder}/${Date.now()}.png`, // Ruta y nombre de archivo en Digital Ocean Spaces
        Body: imageBuffer,
        ACL: "public-read",
        ContentType: "image/png",
      })
      .promise();

    return {
      url: uploadResult.Location, // Devuelve la URL de la imagen en Digital Ocean Spaces
    };
  } catch (error) {
    throw new Error("Error al subir la imagen a Digital Ocean Spaces");
  }
};

const deletFile = async (fieldname: string) => {
  const Fieldname = fieldname.split(".com/");
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: Fieldname[1],
  };

  try {
    await awsS3.deleteObject(params).promise();
    console.log("Archivo eliminado correctamente.");
  } catch (error) {
    // Si se produce un error al eliminar el archivo
    if (error.code === "NoSuchKey") {
      console.log("El archivo no existe en Amazon S3.");
    } else {
      // Si se produce un error diferente
      console.error("Error al intentar eliminar el archivo:", error);
    }
  }
};

export {
  processImage,
  deletFile,
  processImageCover,
  processMultipleImageCover,
};
