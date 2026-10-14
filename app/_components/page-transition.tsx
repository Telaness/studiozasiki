"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

// パスごとに key を変え、旧ページは exit・新ページは enter として個別にフェードさせる。
// 1 つの境界を使い回すと「update」扱いになり、ページ全体が伸縮モーフしてしまう。
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      <div className="flex flex-1 flex-col">{children}</div>
    </ViewTransition>
  );
}
