import { cl, s } from 'utils/dev/console-logger';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useAccount } from 'contexts/account/AccountProvider';

const WebsocketContext = createContext();

const handshakeEndpoint = '/ouroom';
const reconnectDelayInS = 5;
const reconnectDelayInMs = reconnectDelayInS * 1000;

const WebsocketProvider = ({ children }) => {
    const account = useAccount();
    const [stompClient, setStompClient] = useState();
    const [isConnected, setIsConnected] = useState(false)

    const onStompConnect = (client) => {
        cl('Stomp connection has been established.', s.stomp);
        setStompClient(client)
        setIsConnected(true);
    }

    const onStompError = (error) => {
        cl(`Stomp connection error: ${error.message}.`, s.stomp);
        setIsConnected(false);
    }

    const onWebsocketClose = () => {
        cl(`Stomp connection has been closed.`, s.stomp);
        setIsConnected(false);
    }

    const connectStomp = useCallback(() => {
        const client = Stomp.over(() => new SockJS(handshakeEndpoint));
        client.activate();

        client.debug = () => { }
        client.reconnectDelay = reconnectDelayInMs;

        client.onStompError = onStompError;
        client.onWebSocketClose = onWebsocketClose;
        client.onConnect = () => onStompConnect(client);

        return client;
    }, [])

    const disconnectStomp = useCallback((stompClient) => {
        stompClient.deactivate();
        stompClient = undefined;
        setStompClient(stompClient);
        setIsConnected(false);
    }, [])

    useEffect(() => {
        const cl = connectStomp();
        return () => {
            disconnectStomp(cl);
        }
    }, [account.id, connectStomp, disconnectStomp]);

    return (
        <WebsocketContext.Provider value={{ isConnected, stompClient }} >
            {children}
        </WebsocketContext.Provider>
    )
}

export const useWebsocket = () => {
    return useContext(WebsocketContext);
}

export default WebsocketProvider;