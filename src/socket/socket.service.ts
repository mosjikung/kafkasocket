import { Injectable } from '@nestjs/common';
import { WebSocketGateway, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@Injectable()
export class SocketService {}
