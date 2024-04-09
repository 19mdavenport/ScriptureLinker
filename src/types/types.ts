enum MessageType {
  ADD,
  REMOVE
}
interface ChromeMessage {
  message: MessageType;
}
export type { ChromeMessage };
export { MessageType };