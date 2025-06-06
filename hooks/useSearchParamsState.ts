"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export enum SearchParamsNameEnum {
  search = "search",
}

function useDebouncedCallback(callback: (...args: any[]) => void, delay: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const debounced = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Optional: cancel on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debounced;
}

export function useSearchParamsState(
  name: SearchParamsNameEnum,
  defaultValue: string = "",
  debounceDelay = 500
): [string, (value: string) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = searchParams.get(name) ?? defaultValue;
  const [state, setState] = useState(initial);

  const prevValueRef = useRef<string | null>(null);

  useEffect(() => {
    const current = searchParams.get(name);
    if (current !== prevValueRef.current) {
      prevValueRef.current = current;
      setState(current ?? "");
    }
  }, [searchParams, name]);

  const debouncedUpdateParam = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`?${params.toString()}`);
  }, debounceDelay);

  const setValue = useCallback(
    (value: string) => {
      setState(value);
      debouncedUpdateParam(value);
    },
    [debouncedUpdateParam]
  );

  return [state, setValue];
}
