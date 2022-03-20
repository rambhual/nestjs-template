/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AbilityFactoryService } from './ability-factory.service';

@Module({
    imports: [],
    controllers: [],
    providers: [AbilityFactoryService],
    exports: [AbilityFactoryService],
})
export class AbilityModule { }
