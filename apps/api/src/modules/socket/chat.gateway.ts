import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

// @ts-ignore
import { SocketTypes } from 'custom-types';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage(SocketTypes.CHECK_NAME)
    test(@MessageBody() data: string) {
        console.log(SocketTypes.CHECK_NAME);
    }
}
