import { Router } from "express";
import { AddressController } from "../controllers/AddressController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const addressController = new AddressController();

router.post("/create", (req, res) => {
  addressController.addNewAddress(req, res);
});

router.get("/", authenticateToken, (req, res) => {
  addressController.getUserAddresses(req, res);
});

router.delete("/delete/:address_id", authenticateToken, (req, res) => {
    addressController.deleteSingleUserAddress(req, res);
})

export default router;
