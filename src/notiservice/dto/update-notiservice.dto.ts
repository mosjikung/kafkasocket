import { PartialType } from '@nestjs/mapped-types';
import { CreateNotiserviceDto } from './create-notiservice.dto';

export class UpdateNotiserviceDto extends PartialType(CreateNotiserviceDto) {}
