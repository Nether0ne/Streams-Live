import { useCallback, useEffect, useState } from "react";

export default function useContextMenu(id: string) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  // Recursive function which matches parent and passed id
  const matchParent = (e: HTMLElement, id: string): boolean => {
    if (e.id === id) {
      return true;
    } else if (e.parentElement) {
      return matchParent(e.parentElement, id);
    }
    return false;
  };

  const handleContextMenu = useCallback(
    (e: any) => {
      // Hide menu on any click
      // since context menu is being used only for links it's fine
      setShowMenu(false);

      // If clicked element or its parent has id which matches passed id
      if (matchParent(e.target, id)) {
        e.preventDefault();

        // Set menu position
        setX(e.pageX);
        setY(e.pageY);
        // Show menu
        setShowMenu(true);
      }
    },
    [setX, setY]
  );

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.addEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { x, y, showMenu, setShowMenu };
}
