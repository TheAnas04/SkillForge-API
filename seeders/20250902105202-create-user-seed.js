"use strict";
import { v4 as uuidv4 } from "uuid";
export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert("User", [{
      id: uuidv4(),
      name: "developer",
      email: "developer@example.com",
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("User", null, {});
  }
};
