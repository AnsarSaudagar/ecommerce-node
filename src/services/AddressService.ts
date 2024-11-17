import { Address } from "../models/Address";

export class AddressService {
  async addNewAddress(address_details: Address) {
    const allUserAddress: Address[] | null = await Address.findAll({
      where: {
        user_id: address_details.user_id,
      },
    });

    // If user has no previous address
    if (allUserAddress.length === 0) {
      address_details["is_default"] = Address.IS_DEFAULT;
      console.log(address_details);
      
      const address = await Address.create(address_details);
      return address;
    }

    // If there are already address then we will check if the user want to default
    if (address_details.is_default === Address.IS_DEFAULT) {
      const defaultAddress: Address | null = await Address.findOne({
        where: {
          user_id: address_details.user_id,
          is_default: Address.IS_DEFAULT,
        },
      });
      if (defaultAddress) {
        defaultAddress.is_default = Address.IS_NOT_DEFAULT;
        defaultAddress.save();

        const address = await Address.create(address_details);
        return address;
      }
    }
    const address = await Address.create(address_details);
    return address;

  }
}
