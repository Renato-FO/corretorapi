import { UsersEntity } from '../../app/users/entities/users.entity';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: UsersEntity;
}

export default RequestWithUser;
