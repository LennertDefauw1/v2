import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// @ts-ignore
import { ISocketCheckName, ISocketJoin, ISocketLeave, ISocketLogin, SocketEvents, SocketTypes } from 'custom-types';
import { UserService } from './user.service';

@WebSocketGateway({ cors: true })
export class UserGateway {
    constructor(private _userService: UserService) {}

    private _messageQueue = {};
    private _socketRoom = {};

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

    @SubscribeMessage(SocketTypes.LOGIN)
    async handleLogin(@MessageBody() data: ISocketLogin) {
        this._emitOrQueue([SocketEvents.LOGIN, data.encryptedLoginAttempt], data.doubleName);
    }

    @SubscribeMessage(SocketTypes.JOIN)
    async handleJoinRoom(client: Socket, data: ISocketJoin) {
        if (client.id == null) return;
        if (data.room == null) return;

        const socketId = client.id;

        const room = data.room.toLowerCase();
        client.join(room);

        this._socketRoom[socketId] = room;
        if (room in Object.keys(this._messageQueue)) {
            this._sendQueuedMessages(room);
        }
    }

    @SubscribeMessage(SocketTypes.LEAVE)
    async handleLeaveRoom(client: Socket, data: ISocketLeave) {
        if (client.id == null) return;
        if (data.room == null) return;

        const socketId = client.id;

        if (Object.keys(this._socketRoom).includes(socketId)) {
            const room = this._socketRoom[socketId];
            this._socketRoom[socketId] = null;

            client.leave(room);
        }
    }

    private _sendQueuedMessages(room: string) {
        for (let message in this._messageQueue[room]) {
            this.server.to(room).emit(message[0], message[1]);
        }

        this._messageQueue[room] = [];
    }

    // Message: { "event" : "SIGN", "data": "sample"}
    private _emitOrQueue(message: any, room: string) {
        if (Object.values(this._socketRoom).includes(room)) {
            return this.server.to(room).emit(message[0], message[1]);
        }

        // Not connected
        const q = this._messageQueue[room];

        if (q && q.length != 0) {
            q.push(message);
        }

        return (this._messageQueue[room] = q);
    }
}
