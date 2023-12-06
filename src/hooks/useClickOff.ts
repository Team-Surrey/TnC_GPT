import { useEffect } from "react";

function useClickOff(ref: any | any[], callback: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (Array.isArray(ref)) {
        console.log("ref is array", ref);
        let left = true;
        for (let i = 0; i < ref.length; i++) {
            console.log("ref[i]", ref[i])
          if (ref[i].current && ref[i].current.contains(event.target)) {
            console.log("clicked on ref", ref[i]);
            left = false;
          }
        }
        left ? callback() : null;
      } else if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useClickOff;
