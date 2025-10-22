'use client';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <h1>클라이언트 레이아웃</h1>
      <div className="content">
        {children} {/* <- 여기에 "slot" */}
      </div>
    </div>
  );
}