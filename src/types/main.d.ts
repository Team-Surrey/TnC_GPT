type EnumType = { [s: any]: any }

declare type Message = {
  author: EnumType;
  content: string;
  timestamp: Date;
  slow?: boolean
};

declare type Chat = {
  messages: Message[];
  userId: string;
  id: string;
};
