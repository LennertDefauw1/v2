import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { SocketTypes } from 'custom-types';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('checkname')
    test(@MessageBody() data: string) {
        console.log(SocketTypes.SOCKET_CHECK_NAME);
    }
}
