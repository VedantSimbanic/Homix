import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import { propertyValidationSchema } from "../../helpers/validation/propertyvalidation";
import path from "path";
import fs from "fs";
import Agent from "../../models/agent";

const propertiesDirPath = path.join(__dirname, "../../data");
const propertiesFilePath = path.join(propertiesDirPath, "properties.json");

const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const propertyImages: string[] = files?.map((file) => file.filename) || [];
    
    const agentId = req.body.agentId as string;

    const agent = await Agent.findById(agentId);
    if (!agent) {
      res.status(400).json({ status: false, message: "Agent not found" });
      return;
    }

    const propertyData: Partial<IProperty> = {
      ...req.body,
      propertyImages,
      featured_gallery: Array(req.body.featured_gallery),
      facilities_property: Array(req.body.facilities_property),
      createdAt: new Date(),
    };

    const { error } = propertyValidationSchema.validate(propertyData, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({
        status: false,
        message: error.details
          .map((detail: { message: string }) => detail.message)
          .join(", "),
      });
      return;
    }

    const newProperty = new Property(propertyData);
    const savedProperty = await newProperty.save();

    if (!fs.existsSync(propertiesDirPath)) {
      fs.mkdirSync(propertiesDirPath, { recursive: true });
    }

    let properties = [];
    if (fs.existsSync(propertiesFilePath)) {
      const data = fs.readFileSync(propertiesFilePath, "utf8");
      properties = JSON.parse(data);
    }

    properties.push(savedProperty.toObject());

    fs.writeFileSync(
      propertiesFilePath,
      JSON.stringify(properties, null, 2),
      "utf8"
    );

    res.status(201).json({
      status: true,
      message: "Property created successfully",
      property: savedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default createProperty;
