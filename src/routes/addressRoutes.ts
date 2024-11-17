import { Router } from "express";
import { AddressController } from "../controllers/AddressController";

const router = Router();
const addressController = new AddressController();

router.post("/create", (req, res) => {
    addressController.addNewAddress(req, res);
})

export default router;