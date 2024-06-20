import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  agentId: mongoose.Types.ObjectId;
  type: string;
  title: string;
  propertyImages: string[];
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  aboutTheProperty: string;
  featured_gallery: string[];
  facilities_property: string[];
  mapLocation: string;
  isDeleted: boolean;
  createdAt: Date;
}

const PropertySchema: Schema = new Schema({
  agentId: { type: mongoose.Types.ObjectId, ref: "Agent", required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  propertyImages: { type: [String], default: [] },
  price: { type: String, required: true },
  address: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  size: { type: String, required: true },
  aboutTheProperty: { type: String, required: true },
  featured_gallery: { type: [String], required: true },
  facilities_property: { type: [String], required: true },
  mapLocation: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Property = mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
