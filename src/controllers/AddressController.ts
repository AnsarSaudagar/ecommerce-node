import { Request, Response } from "express";
import { AddressService } from "../services/AddressService";

export class AddressController {
  private addressService: AddressService;

  constructor() {
    this.addressService = new AddressService();
  }

  async addNewAddress(req: Request, res: Response) {
    try {
        const address = await this.addressService.addNewAddress(req.body);
        res.status(201).json(address);
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }
}
