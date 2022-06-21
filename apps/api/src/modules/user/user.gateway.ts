import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// @ts-ignore
import { ISocketCheckName, SocketTypes } from 'custom-types';
import { UserService } from './user.service';

@WebSocketGateway({ cors: true })
export class UserGateway {
    constructor(private _userService: UserService) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage(SocketTypes.CHECK_NAME)
    async checkName(@MessageBody() data: ISocketCheckName) {
        const r = await this._userService.getByUsername(data.username);

        if (r != null) {
            return this.server.emit(SocketTypes.NAME_KNOWN);
        }

        return this.server.emit(SocketTypes.NAME_UNKNOWN);
    }

    @SubscribeMessage(SocketTypes.JOIN)
    async handleJoinRoom(client: Socket, room: string) {
        client.join(room);
    }

    @SubscribeMessage(SocketTypes.LEAVE)
    async handleLeaveRoom(client: Socket, room: string) {
        client.leave(room);
    }
}
