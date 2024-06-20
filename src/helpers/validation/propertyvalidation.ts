import Joi from "joi";

export const propertyValidationSchema = Joi.object({
  agentId: Joi.string().required(),
  type: Joi.string().required(),
  title: Joi.string().required(),
  propertyImages: Joi.array().items(Joi.string()),
  price: Joi.string().required(),
  address: Joi.string().required(),
  bedrooms: Joi.number().required(),
  bathrooms: Joi.number().required(),
  size: Joi.string().required(),
  aboutTheProperty: Joi.string().required(),
  featured_gallery: Joi.array().items(Joi.string().uri()),
  facilities_property: Joi.array().items(Joi.string()),
  mapLocation: Joi.string().uri().required(),
  isDeleted: Joi.boolean(),
  createdAt: Joi.date(),
});
