// src/models/Cart.ts

import {
    Model,
    DataTypes,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
  } from "sequelize";
  import sequelize from "../config/database";
  import { User } from "./User";
  import { Product } from "./Product";
  
  export interface CartAttributes {
    id: number;
    user_id: number;
    product_id: number;
    count: number;
    status: number;
    created_at?: Date | null;
    updated_at?: Date | null;
  }
  
  export interface CartCreationAttributes
    extends Optional<CartAttributes, "id" | "created_at" | "updated_at"> {}
  
  export class Cart
    extends Model<CartAttributes, CartCreationAttributes>
    implements CartAttributes
  {
    public id!: number;
    public user_id!: number;
    public product_id!: number;
    public count!: number;
    public status!: number;
    public created_at?: Date | null;
    public updated_at?: Date | null;

    public static STATUS_ACTIVE = 1;
    public static STATUS_PURCHASED = 2;
  
    // Association mixins for eager loading
    public getUser!: BelongsToGetAssociationMixin<User>;
    public getProduct!: BelongsToGetAssociationMixin<Product>;
  
    // Static associations
    public static associations: {
      user: Association<Cart, User>;
      product: Association<Cart, Product>;
    };
  }
  
  // Initialize Cart model
  Cart.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: User, 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      product_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: Product, 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Cart.STATUS_ACTIVE, 
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "carts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  
  Cart.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });
  
  Cart.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });
  
  User.hasMany(Cart, {
    foreignKey: "user_id",
    as: "carts",
  });
  
  Product.hasMany(Cart, {
    foreignKey: "product_id",
    as: "carts",
  });
  