import { Request, Response } from "express"
import path from "path";

export const getAvatarHandler = (req: Request, res: Response) => res.sendFile(path.join(__dirname, `../img/avatars/${req.params.id}`));