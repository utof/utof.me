import { useEffect } from "react";

const useKeyActions = (keyActionsConfig) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const action = keyActionsConfig[event.key];
      if (action) {
        event.preventDefault();
        action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyActionsConfig]);
};

export default useKeyActions;
