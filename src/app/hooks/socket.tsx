"use client";

import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";

export function useSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET;

    if (!socketUrl || !authToken) {
      return;
    }

    const separator = socketUrl.includes("?") ? "&" : "?";
    const nextSocket = new WebSocket(
      `${socketUrl}${separator}token=${encodeURIComponent(authToken)}`
    );

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

    nextSocket.addEventListener("open", handleOpen);
    nextSocket.addEventListener("close", handleClose);
    nextSocket.addEventListener("error", handleError);

    return () => {
      nextSocket.removeEventListener("open", handleOpen);
      nextSocket.removeEventListener("close", handleClose);
      nextSocket.removeEventListener("error", handleError);
      nextSocket.close();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, []);

  const send = useCallback((payload: unknown) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    socketRef.current.send(JSON.stringify(payload));
  }, []);

  return { send, isConnected };
}