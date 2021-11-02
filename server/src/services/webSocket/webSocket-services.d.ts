declare namespace webSocketService {
  type sendUserIdentity = {
    email: string,
    name: string,
    DoB: string,
  }
  interface WebSocketService {
    verifyUser: (
      id: string,
      identityData: sendUserIdentity,
    ) => void;
  }
}
