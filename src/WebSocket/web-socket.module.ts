import { Module } from '@nestjs/common';
import { ChatGatewayGateway } from './Chat/chat-gateway.gateway';

@Module({
    providers:[
        ChatGatewayGateway
    ],
    exports:[
        ChatGatewayGateway
    ]
})
export class WebSocketModule {}
