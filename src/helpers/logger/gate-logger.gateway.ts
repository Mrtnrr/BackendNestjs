import {
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayDisconnect,
    OnGatewayConnection,
    WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Client } from 'socket.io';

@WebSocketGateway()
export class GateLoggerGateway
    implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
    @WebSocketServer() server: Server;
    private logger = new Logger('GatewayLogger');

    handleConnection(client: Client, ...args: any[]) {
        this.logger.log(
            'Se conecto el usuario ' + client.id + ' ' + JSON.stringify(args),
        );
    }
    handleDisconnect(client: any) {
        this.logger.log('Se desconecto el usuario ' + client.id);
    }
    afterInit(server: any) {}

    // @SubscribeMessage('message')
    // handleMessage(client: any, payload: any): Observable<WsResponse<any>> {
    //     return { event: 'testing', data: '' };
    // }
    sendLog(newLog: string) {
        this.server.emit('private/log', newLog);
    }
}
