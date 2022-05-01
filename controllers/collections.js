import Collection from '../models/Collection.js';
import asyncHandler from 'express-async-handler';
import { getTranslatedText } from '../utils/i18n.js';

/**
 * @description Create Collection
 * @access Private
 * @route POST /api/v1/collection/
 */

export const createCollection = asyncHandler(async (req, res) => {
  req.body.userId = req.user;
  const collection = await Collection.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

/**
 * @description Get all Collections
 * @access Private
 * @route GET /api/v1/collection/
 */

export const getCollections = asyncHandler(async (req, res) => {
  const { page = 1, page_size = 10 } = req.query;

  const reqQuery = { ...req.query };
  const sortBy = reqQuery.sort || '-dateUpdated';
  const collections = await Collection.find({ userId: req.user })
    .limit(Number(page_size))
    .skip(Number(page_size) * (Number(page) - 1))
    .sort(sortBy);
  const count = await Collection.countDocuments({ userId: req.user });

  res.status(200).json({
    status: 'success',
    count,
    data: {
      collections,
    },
  });
});

/**
 * @description Update collection
 * @access Private
 * @route PUT /api/v1/collection/:id
 */

export const updateCollection = (req, res) => {
  Collection.findOneAndUpdate(
    { id: req.params.id, userId: req.user },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
    .then((collection) => {
      if (!collection)
        return res.status(400).json({
          status: 'fail',
          data: {
            message: getTranslatedText(req, 'NOT_FOUND'),
          },
        });

      res.json({
        status: 'success',
        data: {
          collection,
        },
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        data: {
          message: error.message,
        },
      });
    });
};

/**
 * @description Delete one collection
 * @access Private
 * @route DELETE /api/v1/collection/:id
 * @returns {object}
 */

export const deleteCollection = asyncHandler(async (req, res) => {
  Collection.findById(req.params.id, (err, doc) => {
    if (err)
      return res.status(400).json({
        status: 'fail',
        data: {
          message: getTranslatedText(req, 'NOT_FOUND'),
        },
      });
    else {
      doc.remove();
      return res.json({
        status: 'success',
        data: {
          message: getTranslatedText(req, 'COLLECTION_DELETED'),
        },
      });
    }
  });
});
