import { SetMetadata } from "@nestjs/common";
import { userRole } from '../../users/enums/user.enum';

export const ROLE_KEY='roles';

export const Roles=(...roles:userRole[])=>
    SetMetadata(ROLE_KEY,roles)