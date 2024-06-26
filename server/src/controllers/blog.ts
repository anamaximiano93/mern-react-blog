import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import Blog from "../models/blog";
import mongoose from "mongoose";
const create = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Tentando registrar blog.....");

  let { author, title, content, headline, picture } = req.body;

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    author,
    title,
    content,
    headline,
    picture,
  });

  return blog
    .save()
    .then((newBlog) => {
      logging.info(`Novo blog criado...`);
      return res.status(201).json({ blog: newBlog });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.blogID;
  logging.info(`Procurando id  ${_id}`);

  Blog.findById(_id)
    .populate("author")
    .then((blog) => {
      if (blog) {
        return res.status(200).json({ blog });
      } else {
        return res.status(404).json({ message: "Não encontrado" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`Procurando Todos`);

  Blog.find()
    .populate("author")
    .exec()
    .then((blogs) => {
      return res.status(200).json({
        count: blogs.length,
        blogs: blogs,
      });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};
const query = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`Procurando Todos`);

  Blog.find(req.body)
    .populate("author")
    .exec()
    .then((blogs) => {
      return res.status(200).json({
        count: blogs.length,
        blogs: blogs,
      });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.blogID;
  logging.info(`  ${_id}`);

  Blog.findById(_id)
    .exec()
    .then((blog) => {
      if (blog) {
        blog.set(req.body);

        blog
          .save()
          .then((newblog) => {
            logging.info("blog atulizando ...");
            return res.status(201).json({ blog: newblog });
          })
          .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
          });
      } else {
        return res.status(404).json({ message: "Não encontrado" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};
const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.BlogID;
  logging.warn(`Delete  ${_id}`);

  Blog.findByIdAndDelete(_id)
    .then(() => {
      return res.status(200).json({ message: "Blog deletado" });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};
export default {
  create,
  update,
  query,
  deleteBlog,
  read,
  readAll,
};
