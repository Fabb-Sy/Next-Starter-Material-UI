type DebouncedFunction<F extends (...args: any[]) => any> = {
  debounced: (...args: Parameters<F>) => void;
  cancel: () => void;
};

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): DebouncedFunction<F> {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  const cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  };

  return { debounced, cancel };
}
