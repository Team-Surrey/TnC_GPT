import React from 'react'

interface Props {

  speed: number,
  text: string
  
}

function SlowResponse({speed, text}: Props) {
  const [placeholder, setPlaceholder] = React.useState(text[0]);
  const [isTyping, setIsTyping] = React.useState(true);
  const index = React.useRef(0);

  React.useEffect(() => {
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
      }
    }
  }, [placeholder, speed, text]);
  return <span>{placeholder}{isTyping?`|`:""}</span>
}

export default SlowResponse