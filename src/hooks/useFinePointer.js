import { useEffect, useState } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

// True on devices with a mouse/trackpad. Touch-only devices get false, so
// cursor- and hover-driven effects (custom cursor, tilt, magnetic) stay off there.
export function useFinePointer() {
  const [fine, setFine] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = () => setFine(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return fine;
}
