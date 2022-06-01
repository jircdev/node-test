import { Schema, model, Document } from 'mongoose';

interface IQuiz extends Document {
  code: string;
  title: string;
  category: string;
  questions: IQuestions;
}

interface IQuestions extends Document {
  title: string;
  mode: string;
  options: IOptions;
}

interface IOptions extends Document {
  descrip: string;
  value: boolean;
}

const qaType = Object.freeze({
  ss: 'Selección Simple',
  sm: 'Selección Múltiple',
  vf: 'Verdadero o falso',
  nm: 'Númerico',
  rk: 'ranking',
});

const enumType = Object.values(qaType);

const optionsSchema = new Schema<IOptions>({
  descrip: {
    type: String,
    required: true,
  },
  value: {
    type: Boolean,
    required: true,
  },
});

const questionsSchema = new Schema<IQuestions>({
  title: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: enumType,
    default: qaType.ss,
    required: true,
  },
  options: [optionsSchema],
});

const quizSchema = new Schema<IQuiz>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    questions: [questionsSchema],
  },
  {
    timestamps: true,
  }
);

quizSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  const id = _id;
  const key = _id;
  return { id, key, ...object };
});

export const Quiz = model<IQuiz>('Quiz', quizSchema);
