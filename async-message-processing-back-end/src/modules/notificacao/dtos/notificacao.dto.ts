import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { provideIsNotEmptyStringValidationMessage, provideIsNotEmptyValidationMessage, provideIsStringValidationMessage, provideIsUUIDValidationMessage } from "src/core/vo/consts/validation-messages";
import { StatusNotificacao } from "src/core/vo/enums/status-notificacao.enum";
import { IsNotEmptyString } from "src/core/vo/validators/is-not-empty-string.validator";

export class NotificacaoDto {

    @IsUUID(4, { message: provideIsUUIDValidationMessage('ID da mensagem')})
    @ApiProperty({
        description: 'ID único da mensagem',
        example: '2f8fb7f9-95ed-44da-89e0-db08881719a3',
        type: String,
        format: 'uuid'
    })
    public mensagemId: string;

    @IsNotEmpty({
        message: provideIsNotEmptyValidationMessage('Conteúdo da mensagem')
    })
    @IsString({
        message: provideIsStringValidationMessage('Conteúdo da mensagem')
    })
    @IsNotEmptyString({
        message: provideIsNotEmptyStringValidationMessage('Conteúdo da mensagem')
    })
    @ApiProperty({
        description: 'Conteúdo da mensagem',
        example: 'Esta é uma notificação de teste',
        type: String
    })
    public conteudoMensagem: string;

    @IsOptional()
    @ApiProperty({
        description: 'Status da notificação',
        example: StatusNotificacao.AGUARDANDO_PROCESSAMENTO,
        enum: StatusNotificacao,
        required: false,
    })
    public status: StatusNotificacao;

}