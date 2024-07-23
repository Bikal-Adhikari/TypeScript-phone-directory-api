import { Router, Request, Response } from "express";
import Contact, { IContact } from "../models/contact";
import { apiResponse } from "../interface/apiResponse";

const router = Router();

// Get all contacts
router.get("/", async (req: Request, res: Response) => {
  try {
    const contacts: IContact[] = await Contact.find();
    const resObj: apiResponse = {
      status: true,
      message: "Contacts Fetched!",
      data: contacts,
    };

    res.json(resObj);
  } catch (err) {
    const errorObj: apiResponse = {
      status: false,
      message: "Server Error",
      data: "",
    };

    res.status(500).send(errorObj);
  }
});
