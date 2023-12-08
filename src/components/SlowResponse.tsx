import { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from "./styles/markdown.module.css";
interface Props {
  speed: number;
  text: string;
}

function SlowResponse({ speed, text }: Props) {
  const [placeholder, setPlaceholder] = useState(text[0]);
  const [isTyping, setIsTyping] = useState(true);
  const index = useRef(0);

  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder((prev: string) => prev + text[index.current]);
    }
    if (index.current < text.length - 1) {
      setIsTyping(true);
      let addChar = setInterval(tick, speed);
      return () => {
        setIsTyping(false);
        clearInterval(addChar);
      };
    }
  }, [placeholder, speed, text]);
  return (
    <span>
      <Markdown remarkPlugins={[remarkGfm]} className={style.reactMarkDown}>
          {placeholder + (isTyping ? "|" : "")}
      </Markdown>
    </span>
  );
}

export default SlowResponse;
