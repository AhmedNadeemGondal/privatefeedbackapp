"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { useOverlay } from "@/app/(app)/contexts/OverlayContext";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const { setShowOverlay } = useOverlay();
  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
          Feedback Message
        </Link>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email}
            </span>
            <Button
              className="w-full md:w-auto"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <div className="">
            {" "}
            <Button
              className="w-full md:w-auto md:mr-1 mb-2 md:mb-0 "
              onClick={() => {
                setShowOverlay(true);
              }}
            >
              Help
            </Button>
            <Link href="/sign-in">
              <Button className="w-full md:w-auto">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
