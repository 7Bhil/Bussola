import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Essayer de scroller le container window
    window.scrollTo(0, 0);
    // Essayer de scroller le document principal (html / body)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Essayer de scroller le container root (si c'est lui qui gère le scroll)
    const root = document.getElementById('root');
    if (root) {
      root.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
