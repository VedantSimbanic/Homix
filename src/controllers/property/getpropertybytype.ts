import { Request, Response } from 'express';

import Property, { IProperty } from '../../models/property';

const getPropertyByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const { type } = req.params;
  
      if (!type) {
        res.status(400).json({
          status: false,
          message: "Property type is required in the request body",
        });
        return;
      }
  
      // Query properties by type and ensure 
      const properties: IProperty[] = await Property.find({ type }).exec();
  
      if (properties.length === 0) {
        res.status(404).json({
          status: false,
          message: `No properties found for type: ${type}`,
        });
        return;
      }
  
      res.status(200).json({
        status: true,
        data: properties,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };
  
  export default getPropertyByType;
  