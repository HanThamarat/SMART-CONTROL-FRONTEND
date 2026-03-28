"use client";

import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";

function resolveSocketUrl(rawSocketUrl: string) {
  const url = new URL(rawSocketUrl, window.location.origin);
  const requiresSecureSocket = window.location.protocol === "https:";

  if (url.protocol === "http:" || url.protocol === "https:") {
    url.protocol = requiresSecureSocket ? "wss:" : "ws:";
    return url.toString();
  }

  if (url.protocol === "ws:") {
    url.protocol = requiresSecureSocket ? "wss:" : "ws:";
    return url.toString();
  }

  if (url.protocol === "wss:") {
    return url.toString();
  }

  throw new Error(`Unsupported websocket protocol: ${url.protocol}`);
}

export function useSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET;

    if (!socketUrl || !authToken) {
      return;
    }

    const resolvedSocketUrl = resolveSocketUrl(socketUrl);
    const separator = resolvedSocketUrl.includes("?") ? "&" : "?";
    const nextSocket = new WebSocket(
      `${resolvedSocketUrl}${separator}token=${encodeURIComponent(authToken)}`
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
