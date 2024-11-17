import { Address } from "../models/Address";

export class AddressService {
  async addNewAddress(address_details: Address): Promise<Address> {
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

  async getUserAddresses(user_id: number): Promise<Address[]> {
    const addresses: Address[] = await Address.findAll({
      where: { user_id: user_id },
    });

    return addresses;
  }

  async deleteSingleUserAddress(address_id: number) {
    const address = await Address.findOne({
      where: {
        id: address_id,
      },
    });

    if (address?.destroy()) {
      // return true
      const latest_address: Address | null = await Address.findOne({
        order: [["created_at", "DESC"]],
      });

      if (latest_address) {
        latest_address.is_default = Address.IS_DEFAULT;
        latest_address.save();
      }

      return true;
    }
    throw new Error("Address was not able to be deleted due to some error");
  }

  async updateAddress(address_details: Address) {
    const oldAddress: Address | null = await Address.findOne({
      where: { id: address_details.id },
    });

    // User is changing the address to default
    if (
      oldAddress &&
      oldAddress.is_default === Address.IS_NOT_DEFAULT &&
      address_details.is_default === Address.IS_DEFAULT
    ) {
      const defaultAddress: Address | null = await Address.findOne({
        where: {
          user_id: address_details.user_id,
          is_default: Address.IS_DEFAULT,
        },
      });
      if (defaultAddress) {
        defaultAddress.is_default = Address.IS_NOT_DEFAULT;
        defaultAddress.save();
      }
    }

    const updated_address = Address.update(
      { ...address_details },
      {
        where: {
          id: address_details.id,
        },
      }
    );

    return updated_address;
  }
}
