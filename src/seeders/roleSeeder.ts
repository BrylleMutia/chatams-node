import { RoleModel } from "../models/role.js";

export const initializeRoles = async () => {
   const roles = ["admin", "dev", "user"];

   for (const [index, role] of roles.entries()) {
      const existingRole = await RoleModel.findOne({ name: role }).exec();
      if (existingRole) break;

      const newRole = RoleModel.build({
         customId: index + 1,
         name: role,
      });
      await newRole.save();
      console.log(`Created initial role: ${newRole.name}`);
   }
};
