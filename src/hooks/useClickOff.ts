import { useEffect } from "react";

function useClickOff(ref: any | any[], callback: () => void) {
  useEffect(() => {

    function handleClickOutside(event: any) {
      if (Array.isArray(ref)) {
        let left = true;
        for (let i = 0; i < ref.length; i++) {
            console.log("ref[i]", ref[i])
          if (ref[i].current && ref[i].current.contains(event.target)) {
            left = false;
          }
        }
        left ? callback() : null;
      } else if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useClickOff;
