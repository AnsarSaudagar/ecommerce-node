import { Request, Response } from "express";
import { AddressService } from "../services/AddressService";
import { IGetUserAuthInfoRequest } from "../@types/express";
import { Address } from "../models/Address";

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

  async getUserAddresses(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      if (!req.userId) {
        throw new Error("User is not authenticated");
      }

      const addresses: Address[] = await this.addressService.getUserAddresses(
        +req.userId
      );
      // const sortedAdresses = addresses.sort((a, b) =>{
      //     return b.is_default - a.is_default
      // })

      res.json(addresses);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
  async deleteSingleUserAddress(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      if (!req.userId) {
        throw new Error("User is not authenticated");
      }

      const deleteAddress: boolean =
        await this.addressService.deleteSingleUserAddress(
          +req.params.address_id
        );

      res.json({
        message: "Cart Successfully Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}
