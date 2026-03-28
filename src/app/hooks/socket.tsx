"use client";

import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

type SocketPayload = {
  event?: string;
  data?: unknown;
};

function resolveSocketConfig(rawSocketUrl: string) {
  const url = new URL(rawSocketUrl, window.location.origin);
  const requiresSecureHttp = window.location.protocol === "https:";

  if (url.protocol === "ws:") {
    url.protocol = requiresSecureHttp ? "https:" : "http:";
  } else if (url.protocol === "wss:") {
    url.protocol = "https:";
  } else if (url.protocol === "http:" || url.protocol === "https:") {
    url.protocol = requiresSecureHttp ? "https:" : "http:";
  } else {
    throw new Error(`Unsupported socket protocol: ${url.protocol}`);
  }

  return {
    origin: url.origin,
    path: url.pathname || "/socket.io",
  };
}

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET;

    if (!socketUrl || !authToken) {
      return;
    }

    const { origin, path } = resolveSocketConfig(socketUrl);
    const nextSocket = io(origin, {
      path,
      transports: ["websocket"],
      query: {
        token: authToken,
      },
    });

    socketRef.current = nextSocket;

    const handleOpen = () => {
      setIsConnected(true);
    };

    const handleClose = () => {
      setIsConnected(false);
    };

    const handleError = () => {
      setIsConnected(false);
    };

    nextSocket.on("connect", handleOpen);
    nextSocket.on("disconnect", handleClose);
    nextSocket.on("connect_error", handleError);

    return () => {
      nextSocket.off("connect", handleOpen);
      nextSocket.off("disconnect", handleClose);
      nextSocket.off("connect_error", handleError);
      nextSocket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, []);

  const send = useCallback((payload: unknown) => {
    if (!socketRef.current || !socketRef.current.connected) {
      return;
    }

    const socketPayload = payload as SocketPayload;
    const event = socketPayload.event ?? "message";

    socketRef.current.emit(event, socketPayload.data ?? payload);
  }, []);

  return { send, isConnected };
}
