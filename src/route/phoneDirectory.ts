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

    return res.status(201).json(resObj);
  } catch (err) {
    const errorObj: apiResponse = {
      status: false,
      message: "Server Error",
      data: "",
    };

    res.status(500).send(errorObj);
  }
});

// Get a single contact by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const contact: IContact | null = await Contact.findById(req.params.id);
    if (!contact) {
      const errorObj = {
        status: false,
        message: "Contact not found",
        data: "",
      };

      return res.status(404).send(errorObj);
    }

    const resObj: apiResponse = {
      status: true,
      message: "Contact Found",
      data: contact,
    };

    res.json(resObj);
  } catch (err) {
    const errorObj = {
      status: false,
      message: "Server Error",
      data: "",
    };

    res.status(500).send(errorObj);
  }
});

// Add a new contact
router.post("/", async (req: Request, res: Response) => {
  try {
    const newContact: IContact = new Contact({
      name: req.body.name,
      phone: req.body.phone,
    });
    const contact: IContact = await newContact.save();

    const resObj: apiResponse = {
      status: true,
      message: "Created new contact",
      data: contact,
    };

    res.status(201).json(resObj);
  } catch (err) {
    const errorObj: apiResponse = {
      status: false,
      message: "Server Error",
      data: "",
    };

    res.status(500).send(errorObj);
  }
});

export default router;
