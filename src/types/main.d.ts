type EnumType = { [s: any]: any }

declare type Message = {
  author: EnumType;
  content: string;
  timestamp: Date;
};

declare type Chat = {
  messages: Message[];
  userId: string;
  id: string;
};
