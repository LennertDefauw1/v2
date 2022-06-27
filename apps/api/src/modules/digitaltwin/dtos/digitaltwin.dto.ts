import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDigitalTwinDto {
    @IsString()
    @IsNotEmpty()
    derivedPublicKey: string;

    @IsString()
    @IsNotEmpty()
    appId: string;

    @IsString()
    @IsNotEmpty()
    yggdrasilIp: string;
}
