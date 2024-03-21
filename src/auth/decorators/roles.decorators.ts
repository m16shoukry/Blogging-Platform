import { SetMetadata } from '@nestjs/common';

import { User_Role } from '../../user/interfaces/user.interface';

export const Roles = (...roles: User_Role[]) => SetMetadata('roles', roles);
