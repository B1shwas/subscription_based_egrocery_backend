import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
export const multerOptions = (folder: string) => ({
  storage: diskStorage({
    destination: (req, file, cb) => {
      const path = `./uploads/${folder}`;
      if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
      }
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = `${uniqueSuffix}-${file.originalname}`;
      cb(null, filename);
    },
    limit: {
      fileSize: 1024 * 1024 * 5,
    },
  }),
});
