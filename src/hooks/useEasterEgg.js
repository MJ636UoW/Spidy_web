import { useEffect, useRef } from 'react';

/**
 * Listens for a secret keystroke sequence and fires `onTrigger` when matched.
 *
 * @param {string}   targetWord  The word to detect (case-insensitive).
 * @param {function} onTrigger   Callback invoked when the sequence is typed.
 */
export function useEasterEgg(targetWord, onTrigger) {
  const bufferRef = useRef('');
  const timerRef = useRef(null);

  useEffect(() => {
    if (!targetWord || typeof onTrigger !== 'function') return;

    const target = targetWord.toLowerCase();

    function handleKeyDown(e) {
      // Ignore modifier-only keys and non-character keys
      if (e.key.length !== 1) return;

      // Reset the inactivity timer
      if (timerRef.current) clearTimeout(timerRef.current);

      bufferRef.current += e.key.toLowerCase();

      // Keep the buffer trimmed to avoid unbounded growth
      if (bufferRef.current.length > target.length * 2) {
        bufferRef.current = bufferRef.current.slice(-target.length);
      }

      // Check for match
      if (bufferRef.current.endsWith(target)) {
        bufferRef.current = '';
        onTrigger();
      }

      // Reset buffer after 2 seconds of no typing
      timerRef.current = setTimeout(() => {
        bufferRef.current = '';
      }, 2000);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [targetWord, onTrigger]);
}
