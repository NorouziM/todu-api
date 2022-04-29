import mongoose from 'mongoose';
import Collection from './Collection.js';

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'TITLE_IS_REQUIRED'],
  },
  content: {
    type: String,
    required: [true, 'CONTENT_IS_REQUIRED'],
  },
  dateAdded: { type: Date, default: Date.now },
  dateCompleted: { type: Date, default: null },
  isDone: { type: Boolean, default: false },
  dueDate: {
    data: {
      type: Date,
      default: Date.now,
    },
    string: String,
  },
  label: String,
  userId: {
    type: String,
    required: [true, 'INVALID_USERID'],
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
    default: null,
  },
  collectionName: {
    type: String,
    default: null,
  },
});

todoSchema.statics.getDoneTodosPercentage = async function (
  userId,
  collectionId
) {
  const obj = await this.aggregate([
    {
      $match: {
        userId,
        collectionId,
      },
    },
    {
      $group: {
        _id: '$userId',
        doneTodos: {
          $sum: {
            $cond: [
              {
                $eq: ['$isDone', false],
              },
              0,
              1,
            ],
          },
        },
        totalTodos: {
          $sum: 1,
        },
      },
    },
  ]);

  const percentage = Math.round((obj[0].doneTodos / obj[0].totalTodos) * 100);

  try {
    const collection = await Collection.findOne({ _id: collectionId });
    collection.doneTodosPercentage = percentage;
    collection.totalTodos = obj[0].totalTodos;
    collection.doneTodos = obj[0].doneTodos;

    console.log(collection, 'collection');

    await collection.save();
  } catch (err) {
    console.log(err);
  }
};

todoSchema.pre('save', async function () {
  if (this.collectionId) {
    const collection = await Collection.findById(this.collectionId);
    this.collectionName = collection.title;
  }
});

todoSchema.post('save', async function () {
  await this.constructor.getDoneTodosPercentage(this.userId, this.collectionId);
});

todoSchema.pre('remove', async function () {
  await this.constructor.getDoneTodosPercentage(this.userId, this.collectionId);
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
