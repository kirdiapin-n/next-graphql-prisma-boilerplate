import "@/styles/index.css";
import { AppProviders } from "@/app/providers";
import { UserProvider } from "@/context/UserContext";
import { getUserFromServer } from "@/lib/auth";
import { ReactNode } from "react";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getUserFromServer();

  return (
    <html lang="en">
      <body>
        <UserProvider user={user}>
          <AppProviders>{children}</AppProviders>
        </UserProvider>
      </body>
    </html>
  );
}
