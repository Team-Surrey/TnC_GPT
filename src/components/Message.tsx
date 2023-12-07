import { MessageAuthor } from "@/types/enums";
import SlowResponse from "./SlowResponse";

interface Props {
  message: Partial<Message>;
  loading?: boolean;
  slow?: boolean;
}

export default function Message({ message, loading, slow=false }: Props) {
  return (
    <div
      className={
        " flex flex-row justify-start p-2 space-x-2 rounded-lg w-[inherit] " +
        (message.author == MessageAuthor.user ? "bg-theme-secondary" : "")
      }
    >
      <h1 className="bg-[#454545] text-xl rounded-lg p-1 h-fit">
        {message.author == MessageAuthor.user ? "🧒" : "🤖"}
      </h1>
      <p className="m-auto break-words overflow-hidden break-all">
        {loading ? (
          <span className="animate-pulse">Thinking...</span>
        ) : message.author == MessageAuthor.user ? (
          message.content
        ) : (
          slow ? <SlowResponse speed={100} text={message.content!} /> : 
          <span>{message.content}</span>
        )}
      </p>
    </div>
  );
}
