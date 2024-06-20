import { Request, Response } from "express";

const bannerData = {
  banner_header: "The best place to find your dream house",
  banner_details_text:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit feugiat purus suscipit turpis sed vitae.",
};
export const getBanner = (req: Request, res: Response) => {
  res.json(bannerData);
};
