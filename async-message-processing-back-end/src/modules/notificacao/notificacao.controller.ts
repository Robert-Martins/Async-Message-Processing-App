import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { NotificacaoService } from "./notificacao.service";
import { NotificacaoDto } from "./dtos/notificacao.dto";

@ApiTags('Notificações')
@Controller('notificacoes')
export class NotificacaoController {

    constructor(
        private readonly notificacaoService: NotificacaoService
    ) { }

    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Notificação aceita e encaminhada para processamento' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Informações da notificação são inválidas' })
    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    public create(@Body() notificacao: NotificacaoDto): Promise<NotificacaoDto> {
        return this.notificacaoService.save(notificacao);
    }

    @ApiResponse({ status: HttpStatus.OK, description: 'Solicitação processada com sucesso' })
    @Get()
    @HttpCode(HttpStatus.OK)
    public findAll(): Promise<NotificacaoDto[]> {
        return this.notificacaoService.findAll();
    }


}