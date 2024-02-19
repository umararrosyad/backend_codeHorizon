"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await relationProduct(queryInterface);
    await relationProductType(queryInterface);
    await relationProductSize(queryInterface);
    await relationAddress(queryInterface);
    await relationCarts(queryInterface);
    await relationExpeditionProduct(queryInterface);
    await relationFeedback(queryInterface);
    await relationProductGalleries(queryInterface);
    await relationProductVariant(queryInterface);
    await relationTransactionDetail(queryInterface)
    await relationTransaction(queryInterface)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

async function relationProduct(queryInterface) {
  await queryInterface.addConstraint("products", {
    fields: ["werehouse_id"],
    type: "foreign key",
    name: "fk_products_werehouse",
    references: {
      table: "Werehouses",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  await queryInterface.addConstraint("products", {
    fields: ["category_id"],
    type: "foreign key",
    name: "fk_products_categories",
    references: {
      table: "categories",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}

async function relationProductSize(queryInterface) {
  await queryInterface.addConstraint("product_sizes", {
    fields: ["product_id"],
    type: "foreign key",
    name: "fk_product_sizes_products",
    references: {
      table: "products",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}

async function relationProductType(queryInterface) {
  await queryInterface.addConstraint("product_types", {
    fields: ["product_id"],
    type: "foreign key",
    name: "fk_product_types_products",
    references: {
      table: "products",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}

async function relationAddress(queryInterface) {
  await queryInterface.addConstraint("addresses", {
    fields: ["user_id"],
    type: "foreign key",
    name: "fk_addresses_users",
    references: {
      table: "users",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}

async function relationCarts(queryInterface) {
  await queryInterface.addConstraint("carts", {
    fields: ["user_id"],
    type: "foreign key",
    name: "fk_carts_users",
    references: {
      table: "users",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  await queryInterface.addConstraint("carts", {
    fields: ["product_variant_id"],
    type: "foreign key",
    name: "fk_carts_users_product_variant",
    references: {
      table: "product_variants",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}
async function relationExpeditionProduct(queryInterface) {
  await queryInterface.addConstraint("expedition_products", {
    fields: ["product_id"],
    type: "foreign key",
    name: "fk_expedition_products_products",
    references: {
      table: "products",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  await queryInterface.addConstraint("expedition_products", {
    fields: ["expedition_id"],
    type: "foreign key",
    name: "fk_expedition_products_expedition",
    references: {
      table: "expeditions",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}

async function relationFeedback(queryInterface) {
  await queryInterface.addConstraint("feedbacks", {
    fields: ["product_variant_id"],
    type: "foreign key",
    name: "fk_feedbacks_product_variants",
    references: {
      table: "product_variants",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  await queryInterface.addConstraint("feedbacks", {
    fields: ["user_id"],
    type: "foreign key",
    name: "fk_feedbacks_users",
    references: {
      table: "users",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  await queryInterface.addConstraint("feedback_galleries", {
    fields: ["feedback_id"],
    type: "foreign key",
    name: "fk_feedback_galleries_feedbacks",
    references: {
      table: "feedbacks",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}

async function relationProductGalleries(queryInterface) {
  await queryInterface.addConstraint("product_galleries", {
    fields: ["product_id"],
    type: "foreign key",
    name: "fk_product_galleries_products",
    references: {
      table: "products",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}

async function relationProductVariant(queryInterface) {
  await queryInterface.addConstraint("product_variants", {
    fields: ["product_id"],
    type: "foreign key",
    name: "fk_product_variant_products",
    references: {
      table: "products",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  await queryInterface.addConstraint("product_variants", {
    fields: ["product_size_id"],
    type: "foreign key",
    name: "fk_product_variant_product_size",
    references: {
      table: "product_sizes",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  await queryInterface.addConstraint("product_variants", {
    fields: ["product_type_id"],
    type: "foreign key",
    name: "fk_product_variant_product_type",
    references: {
      table: "product_types",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}

async function relationTransactionDetail(queryInterface) {
  await queryInterface.addConstraint("transaction_details", {
    fields: ["product_variant_id"],
    type: "foreign key",
    name: "fk_transaction_details_product_variant",
    references: {
      table: "product_variants",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  await queryInterface.addConstraint("transaction_details", {
    fields: ["transaction_id"],
    type: "foreign key",
    name: "fk_transaction_details_transactions",
    references: {
      table: "transactions",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}

async function relationTransaction(queryInterface) {
  await queryInterface.addConstraint("transactions", {
    fields: ["user_id"],
    type: "foreign key",
    name: "fk_transactions_users",
    references: {
      table: "users",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

  await queryInterface.addConstraint("transactions", {
    fields: ["addresses_id"],
    type: "foreign key",
    name: "fk_transactions_addresses",
    references: {
      table: "addresses",
      field: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
}
