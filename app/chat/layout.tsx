import SidebarPlaceholder from "@/components/Placeholders/SidebarPlaceholder";
import Sidebar from "@/components/UI/Sidebar";

import { authOption } from "@/lib/authOptions";
import { useAppStore } from "@/store";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React, { ReactNode, Suspense } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOption);

  if (!session) return <div>No session</div>;

  return (
    <div className="fixed flex inset-0">
      <Sidebar session={session} />
      {/* </Suspense> */}
      <div className={`-z-10 w-full min-h-full flex flex-col overflow-x-auto`}>
        {children}
      </div>
    </div>
  );
}
