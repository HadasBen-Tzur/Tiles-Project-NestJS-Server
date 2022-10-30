import { Inject } from '@nestjs/common';

// export const InjectDB = (collection: string) => Inject('DATABASE_CONNECTION');
export const InjectDB = () => Inject('DATABASE_CONNECTION');
