import mongoose from "mongoose";

interface IWord {
  name: String;
  length: Number;
}
const WordSchema = new mongoose.Schema<IWord>({
  length: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const Word =
  mongoose.models.Word || mongoose.model<IWord>("Word", WordSchema);
